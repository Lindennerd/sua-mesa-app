import { toast } from 'react-toastify'
import { FindRestaurantBySlug } from 'types/graphql'

import { useMutation } from '@redwoodjs/web'

import { useRestaurantAtom } from 'src/atom/restaurant'
import { DELETE_EMPLOYEE_MUTATION } from 'src/graphql/employee'
import { QUERY_RESTAURANT_BY_SLUG } from 'src/graphql/restaurant'

interface MutationParameters {
  onCompleted: () => void
}

export const useEmployeeMutation = () => {
  const [restaurant] = useRestaurantAtom()

  return {
    remove({ onCompleted }: MutationParameters) {
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
            const data = cache.readQuery<FindRestaurantBySlug>({
              query: QUERY_RESTAURANT_BY_SLUG,
              variables: {
                slug: restaurant.slug,
              },
            })
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
