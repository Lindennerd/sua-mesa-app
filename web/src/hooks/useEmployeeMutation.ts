import { toast } from 'react-toastify'

import { useMutation } from '@redwoodjs/web'

import { useRestaurantAtom } from 'src/atom/restaurant'
import { DELETE_EMPLOYEE_MUTATION } from 'src/graphql/employee'
import { QUERY_RESTAURANT_BY_SLUG } from 'src/graphql/restaurant'

import { MutationParams } from './mutation'
import { readRestaurantQuery } from './utils'

export const useEmployeeMutation = () => {
  const [restaurant] = useRestaurantAtom()

  return {
    remove({ onCompleted }: MutationParams) {
      const [deleteEmployee, { loading }] = useMutation(
        DELETE_EMPLOYEE_MUTATION,
        {
          onCompleted() {
            onCompleted()
          },
          onError(error) {
            toast.error(error)
          },
          update(cache, { data: deleteEmployee }) {
            const data = readRestaurantQuery(cache, restaurant)
            cache.writeQuery({
              query: QUERY_RESTAURANT_BY_SLUG,
              data: {
                restaurantBySlug: {
                  ...data.restaurantBySlug,
                  RestaurantUser: data.restaurantBySlug.RestaurantUser.filter(
                    (user) => user.user.id !== deleteEmployee.id
                  ),
                },
              },
            })
          },
        }
      )

      return { deleteEmployee, loading }
    },
  }
}
