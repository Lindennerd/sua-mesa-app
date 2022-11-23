import { toast } from 'react-toastify'
import {
  RestaurantOrdersQuery,
  UpdateOrderItemStatus,
  UpdateOrderItemStatusVariables
} from 'types/graphql'

import { useMutation } from '@redwoodjs/web'

import { useRestaurantAtom } from 'src/atom/restaurant'
import { RESTAURANT_ORDERS_QUERY } from 'src/graphql/order'
import { UPDATE_ORDERITEMSTATUS_MUTATION } from 'src/graphql/orderItem'

import { MutationParams } from './mutation'

export const useOrderItemUpdateStatus = ({ onCompleted }: MutationParams) => {
  const [restaurant] = useRestaurantAtom()

  const [updateOrderItem, { loading }] = useMutation<
    UpdateOrderItemStatus,
    UpdateOrderItemStatusVariables
  >(UPDATE_ORDERITEMSTATUS_MUTATION, {
    onCompleted: onCompleted,
    onError(error) {
      console.error(error)
      toast.error(error.message)
    },
    update(cache, { data: updateOrderItem }) {
      const data = cache.readQuery<RestaurantOrdersQuery>({
        query: RESTAURANT_ORDERS_QUERY,
        variables: {
          restaurantId: restaurant.id,
        },
      })
      cache.writeQuery({
        query: RESTAURANT_ORDERS_QUERY,
        data: {
          restaurantOrders: data.restaurantOrders.map((order) => {
            if (order.id === updateOrderItem.updateOrderItem.orderId) {
              return {
                ...order,
                orderItems: order.orderItems.map((item) => {
                  if (item.id === updateOrderItem.updateOrderItem.id) {
                    return {
                      ...item,
                      status: updateOrderItem.updateOrderItem.status,
                    }
                  }

                  return item
                }),
              }
            }

            return order
          }),
        },
      })
    },
  })

  return { updateOrderItem, loading }
}
