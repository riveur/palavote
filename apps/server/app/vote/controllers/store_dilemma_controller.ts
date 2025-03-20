import stringHelpers from '@adonisjs/core/helpers/string'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

import Dilemma from '#vote/models/dilemma'
import Proposition from '#vote/models/proposition'
import { DilemmaViewModel } from '#vote/view_models/dilemma_view_model'
import db from '@adonisjs/lucid/services/db'

export default class StoreDilemmaController {
  static #validator = vine.compile(
    vine.object({
      title: vine.string(),
      propositions: vine
        .array(
          vine.object({
            name: vine.string(),
            image_url: vine.string().url(),
          })
        )
        .fixedLength(2),
    })
  )
  async execute({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const payload = await request.validateUsing(StoreDilemmaController.#validator)

    const dilemma = await db.transaction(async () => {
      const result = await Dilemma.create({
        title: payload.title,
        authorId: user.id,
      })

      for (const prop of payload.propositions) {
        await Proposition.create({
          name: prop.name,
          slug: stringHelpers.slug(`${prop.name}-${result.id}`),
          imageUrl: prop.image_url,
          dilemmaId: result.id,
        })
      }

      return result
    })

    await dilemma.load('author')
    await dilemma.load('propositions')

    return response.created(DilemmaViewModel.fromModel(dilemma).serialize())
  }
}
