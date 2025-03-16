import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import drive from '@adonisjs/drive/services/main'
import vine from '@vinejs/vine'

export default class UploadPropositionImageController {
  static #validator = vine.compile(
    vine.object({
      file: vine.file({ size: '2mb', extnames: ['jpg', 'png', 'jpeg'] }),
    })
  )

  async execute({ request, response }: HttpContext) {
    const { file } = await request.validateUsing(UploadPropositionImageController.#validator)

    const key = `propositions/${cuid()}.${file.extname}`
    await file.moveToDisk(key, 'spaces')

    const url = await drive.use('spaces').getUrl(key)

    return response.ok({ url })
  }
}
