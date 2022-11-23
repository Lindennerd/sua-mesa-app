import { toast } from 'react-toastify'
import {
  CreateOrderInput,
  RestaurantOrdersQuery,
  UpdateOrder,
  UpdateOrderVariables
} from 'types/graphql'

import { useMutation } from '@redwoodjs/web'

import { useRestaurantAtom } from 'src/atom/restaurant'
import {
  CREATE_ORDER_MUTATION,
  ORDER_UPDATE_MUTATION,
  RESTAURANT_ORDERS_QUERY
} from 'src/graphql/order'

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

export function useUpdateOrder({ onCompleted }: MutationParams) {
  const [restaurant] = useRestaurantAtom()

  const [updateOrder, { loading }] = useMutation<
    UpdateOrder,
    UpdateOrderVariables
  >(ORDER_UPDATE_MUTATION, {
    onCompleted() {
      onCompleted()
    },
    onError(error) {
      console.error(error)
      toast.error(error.message)
    },
    update(cache, { data: updateOrder }) {
      const data = cache.readQuery<RestaurantOrdersQuery>({
        query: RESTAURANT_ORDERS_QUERY,
        variables: {
          restaurantId: restaurant.id,
        },
      })
      cache.writeQuery({
        query: RESTAURANT_ORDERS_QUERY,
        data: {
          restaurantOrders: data.restaurantOrders
            .map((order) => {
              if (order.id === updateOrder.updateOrder.id) {
                return updateOrder.updateOrder
              }

              return order
            })
            .filter((order) => order.status === 'ACTIVE'),
        },
      })
    },
  })

  return { updateOrder, loading }
}
