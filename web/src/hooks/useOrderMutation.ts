import { toast } from 'react-toastify'
import { CreateOrderInput } from 'types/graphql'

import { useMutation } from '@redwoodjs/web'

import { CREATE_ORDER_MUTATION } from 'src/graphql/order'

import { MutationParams } from './mutation'

export function useCreateOrderMutation({ onCompleted }: MutationParams) {
  const [createOrder, { loading }] = useMutation<CreateOrderInput>(
    CREATE_ORDER_MUTATION,
    {
      onCompleted() {
        onCompleted()
      },
      onError(error) {
        console.error(error)
        toast.error(error.message)
      },
    }
  )

  return { createOrder, loading }
}
