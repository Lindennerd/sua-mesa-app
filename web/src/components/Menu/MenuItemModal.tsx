import { useEffect, useState } from 'react'

import { LoadingOverlay, Modal } from '@mantine/core'
import { toast } from 'react-toastify'
import { Category, MenuItem } from 'types/graphql'

import { useRestaurantAtom } from 'src/atom/restaurant'
import { useMenuItemMutation } from 'src/hooks/useMenuItemMutation'
import { bucketBase, supabase } from 'src/lib/supabase'

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
  const { create, update } = useMenuItemMutation()

  const createMutation = create({
    onCompleted() {
      onClose()
    },
  })

  const updateMutation = update({
    onCompleted() {
      onClose()
    },
  })

  useEffect(() => {
    setIsLoading(createMutation.loading || updateMutation.loading)
  }, [createMutation.loading, updateMutation.loading])

  async function imageUpload(name: string, file: FileList) {
    let imageUrl = item?.image ?? 'https://via.placeholder.com/300'

    if (file.length) {
      const { data, error } = await supabase.storage
        .from(restaurant.slug)
        .upload(
          name.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
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

    return imageUrl
  }

  async function edit(menuItem: MenuItem, file: FileList) {
    setIsLoading(true)
    const imageUrl = await imageUpload(menuItem.name, file)

    await updateMutation.updateMenuItem({
      variables: {
        updateMenuItemId: item.id,
        input: {
          categoryId: menuItem.categoryId,
          restaurantId: restaurant.id,
          description: menuItem.description,
          name: menuItem.name,
          price: menuItem.price,
          image: imageUrl,
        },
      },
      optimisticResponse() {
        return {
          updateMenuItem: {
            ...menuItem,
            id: 0,
            image: imageUrl,
            category: {} as Category,
            createdAt: new Date().toLocaleDateString(),
          },
        }
      },
    })
  }

  async function save(menuItem: MenuItem, file: FileList) {
    setIsLoading(true)
    const imageUrl = await imageUpload(menuItem.name, file)

    await createMutation.createMenuItem({
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
      optimisticResponse() {
        return {
          createMenuItem: {
            ...menuItem,
            image: imageUrl,
            category: {} as Category,
            createdAt: new Date().toLocaleDateString(),
          },
        }
      },
    })
  }

  return (
    <Modal
      size="auto"
      opened={open}
      onClose={onClose}
      title={item ? `Editando ${item.name}` : 'Novo Item'}
    >
      <LoadingOverlay visible={isLoading} />
      <MenuItemForm
        categories={categories}
        onSubmit={item ? edit : save}
        item={item}
      />
    </Modal>
  )
}

export default MenuItemModal
