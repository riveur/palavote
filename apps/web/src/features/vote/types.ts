import type { InferResponseType } from '@repo/rpc/types'
import type { client } from '@/lib/client'

export type Dilemma = NonNullable<InferResponseType<typeof client.api.dilemmas.pick.$get>['dilemma']>

export type VoteResult = NonNullable<InferResponseType<typeof client.api.dilemmas.pick.$get>['result']>
