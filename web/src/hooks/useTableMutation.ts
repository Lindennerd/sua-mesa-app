import { toast } from 'react-toastify'
import { FindRestaurantBySlug } from 'types/graphql'

import { useMutation } from '@redwoodjs/web'

import { useRestaurantAtom } from 'src/atom/restaurant'
import { QUERY_RESTAURANT_BY_SLUG } from 'src/graphql/restaurant'
import { CREATE_TABLE_MUTATION, DELETE_TABLE_MUTATION } from 'src/graphql/table'

export default function useTableMutation() {
  const [restaurant] = useRestaurantAtom()

  return {
    create({ onCompleted }: { onCompleted: () => void }) {
      const [createTable, { loading }] = useMutation(CREATE_TABLE_MUTATION, {
        onCompleted() {
          onCompleted()
        },
        onError(error) {
          toast.error(error.message)
          console.error(error)
        },
        update(cache, { data: createdTable }) {
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
                Table: data.restaurantBySlug.Table.concat([
                  createdTable.createTable,
                ]),
              },
            },
          })
        },
      })

      return { createTable, loading }
    },

    remove({ onCompleted }: { onCompleted: () => void }) {
      const [deleteMutation, { loading }] = useMutation(DELETE_TABLE_MUTATION, {
        onCompleted() {
          onCompleted()
        },
        onError(error) {
          toast.error(error.message)
          console.error(error)
        },
        update(cache, { data: deletedTable }) {
          console.log('deletedTable', deletedTable)

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
                Table: data.restaurantBySlug.Table.filter(
                  (table) => table.id !== deletedTable.id
                ),
              },
            },
          })
        },
      })

      return { deleteMutation, loading }
    },
  }
}
