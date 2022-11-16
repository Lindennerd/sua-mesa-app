import { useMutation } from '@redwoodjs/web'
import { toast } from 'react-toastify'
import { useRestaurantAtom } from 'src/atom/restaurant'
import {
  CREATE_MENUITEM_MUTATION,
  DELETE_MENUITEM_MUTATION,
  UPDATE_MENUITEM_MUTATION
} from 'src/graphql/menuItem'
import { QUERY_RESTAURANT_BY_SLUG } from 'src/graphql/restaurant'
import {
  CreateMenuItem,
  DeleteMenuItem,
  FindRestaurantBySlug,
  UpdateMenuItem
} from 'types/graphql'

export const useMenuItemMutation = () => {
  const [restaurant] = useRestaurantAtom()

  return {
    create({ onCompleted }: { onCompleted?: () => void }) {
      const [createMenuItem, { loading, error }] = useMutation<CreateMenuItem>(
        CREATE_MENUITEM_MUTATION,
        {
          onCompleted() {
            onCompleted && onCompleted()
          },
          onError(error) {
            toast.error(error.message)
            console.error(error)
          },
          update(cache, { data: createMenuItem }) {
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
                  MenuItem: data.restaurantBySlug.MenuItem.concat([
                    createMenuItem.createMenuItem,
                  ]),
                },
              },
            })
          },
        }
      )

      return { createMenuItem, loading }
    },

    update({ onCompleted }: { onCompleted: () => void }) {
      const [updateMenuItem, { loading, error }] = useMutation<UpdateMenuItem>(
        UPDATE_MENUITEM_MUTATION,
        {
          onCompleted(data) {
            onCompleted()
          },
          onError(error) {
            toast.error(error.message)
            console.error(error)
          },
          update(cache, { data: updateMenuItem }) {
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
                  MenuItem: data.restaurantBySlug.MenuItem.map((item) => {
                    if (item.id === updateMenuItem.updateMenuItem.id)
                      return updateMenuItem
                    else return item
                  }),
                },
              },
            })
          },
        }
      )

      return { updateMenuItem, loading }
    },

    remove({ onCompleted }: { onCompleted: () => void }) {
      const [deleteMenuItem, { loading, error }] = useMutation<DeleteMenuItem>(
        DELETE_MENUITEM_MUTATION,
        {
          onCompleted(data) {
            onCompleted()
          },
          onError(error) {
            toast.error(error.message)
            console.error(error)
          },
          update(cache, { data: deleteMenuItem }) {
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
                  MenuItem: data.restaurantBySlug.MenuItem.filter((item) => {
                    if (item.id !== deleteMenuItem.deleteMenuItem.id)
                      return item
                  }),
                },
              },
            })
          },
        }
      )

      return { deleteMenuItem, loading };
    },
  }
}
