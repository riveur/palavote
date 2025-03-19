import type { client } from '@/lib/client'
import type { InferResponseType } from '@repo/rpc/types'

export type Dilemma = InferResponseType<typeof client.api.dilemmas.$get>[number]
