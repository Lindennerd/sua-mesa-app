import { toast } from 'react-toastify'
import { CreateMenuItem, DeleteMenuItem, UpdateMenuItem } from 'types/graphql'

import { useMutation } from '@redwoodjs/web'

import { useRestaurantAtom } from 'src/atom/restaurant'
import {
  CREATE_MENUITEM_MUTATION,
  DELETE_MENUITEM_MUTATION,
  UPDATE_MENUITEM_MUTATION
} from 'src/graphql/menuItem'
import { QUERY_RESTAURANT_BY_SLUG } from 'src/graphql/restaurant'

import { MutationParams } from './mutation'
import { readRestaurantQuery } from './utils'

export const useMenuItemMutation = () => {
  const [restaurant] = useRestaurantAtom()

  return {
    create({ onCompleted }: MutationParams) {
      const [createMenuItem, { loading }] = useMutation<CreateMenuItem>(
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
            const data = readRestaurantQuery(cache, restaurant)
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

    update({ onCompleted }: MutationParams) {
      const [updateMenuItem, { loading }] = useMutation<UpdateMenuItem>(
        UPDATE_MENUITEM_MUTATION,
        {
          onCompleted() {
            onCompleted()
          },
          onError(error) {
            toast.error(error.message)
            console.error(error)
          },
          update(cache, { data: updateMenuItem }) {
            const data = readRestaurantQuery(cache, restaurant)
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

    remove({ onCompleted }: MutationParams) {
      const [deleteMenuItem, { loading }] = useMutation<DeleteMenuItem>(
        DELETE_MENUITEM_MUTATION,
        {
          onCompleted() {
            onCompleted()
          },
          onError(error) {
            toast.error(error.message)
            console.error(error)
          },
          update(cache, { data: deleteMenuItem }) {
            const data = readRestaurantQuery(cache, restaurant)
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

      return { deleteMenuItem, loading }
    },
  }
}
