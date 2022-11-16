import { LoadingOverlay, Modal } from '@mantine/core'
import { useMutation } from '@redwoodjs/web'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRestaurantAtom } from 'src/atom/restaurant'
import { CREATE_MENUITEM_MUTATION } from 'src/graphql/menuItem'
import { QUERY_RESTAURANT_BY_SLUG } from 'src/graphql/restaurant'
import { bucketBase, supabase } from 'src/lib/supabase'
import {
  Category,
  CreateMenuItem,
  FindRestaurantBySlug,
  MenuItem
} from 'types/graphql'
import MenuItemForm from './MenuItemForm'

interface Props {
  open: boolean
  categories: Category[]
  onClose: () => void
  item?: MenuItem
}

const MenuItemModal = ({ open, onClose, categories, item }: Props) => {
  const [restaurant] = useRestaurantAtom()
  const [isLoading, setIsLoading] = useState(false)
  const [createMenuItem, { loading, error }] = useMutation<CreateMenuItem>(
    CREATE_MENUITEM_MUTATION ,
    {
      onCompleted() {
        onClose()
      },
      onError(error) {
        toast.error(error.message);
        console.error(error);
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

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  async function save(menuItem: MenuItem, file: FileList) {
    setIsLoading(true)
    let imageUrl = 'https://via.placeholder.com/300'

    if (file.length) {
      const { data, error } = await supabase.storage
        .from(restaurant.slug)
        .upload(
          menuItem.name.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
          file[0],
          { cacheControl: '3600', upsert: true }
        )

      if (error) {
        toast.error('Ops... Ocorreu um erro!')
        console.error(error)
        return
      }

      imageUrl = `${bucketBase}/${restaurant.slug}/${data.path}`
    }

    await createMenuItem({
      variables: {
        input: {
          categoryId: menuItem.categoryId,
          restaurantId: restaurant.id,
          description: menuItem.description,
          name: menuItem.name,
          price: menuItem.price,
          image: imageUrl,
        },
      },
      optimisticResponse(vars) {
        return {
          createMenuItem: {
            ...menuItem,
            image: imageUrl,
            category: {} as Category,
            createdAt: new Date().toLocaleDateString()
          },
        }
      },
    })
  }

  return (
    <Modal opened={open} onClose={onClose} title="Novo Item">
      <LoadingOverlay visible={isLoading} />
      <MenuItemForm categories={categories} onSubmit={save} item={item} />
    </Modal>
  )
}

export default MenuItemModal
