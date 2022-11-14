import { FocusTrap, LoadingOverlay, Modal } from '@mantine/core'
import { useMutation } from '@redwoodjs/web'
import { useRestaurantAtom } from 'src/atom/restaurant'
import { CREATE_CATEGORY } from 'src/graphql/category'
import { QUERY_RESTAURANT_BY_SLUG } from 'src/graphql/restaurant'
import { CreateCategory, FindRestaurantBySlug } from 'types/graphql'
import CategoryForm from './CategoryForm'

interface Props {
  open: boolean
  onClose: () => void
}

const CategoryModal = ({ open, onClose }: Props) => {
  const [restaurant] = useRestaurantAtom()
  const [createCategory, { loading, error }] = useMutation(CREATE_CATEGORY, {
    onCompleted(data: CreateCategory) {
      onClose()
    },
    update(cache, { data: { createCategory } }) {
      const data = cache.readQuery<FindRestaurantBySlug>({
        query: QUERY_RESTAURANT_BY_SLUG,
        variables: {
          slug: restaurant.slug,
        },
      })

      console.log(createCategory)

      cache.writeQuery({
        query: QUERY_RESTAURANT_BY_SLUG,
        data: {
          restaurantBySlug: {
            ...data.restaurantBySlug,
            Category: data.restaurantBySlug.Category.concat([createCategory])
          },
        },
      })
    },
  })

  async function saveCategory(category: string) {
    await createCategory({
      variables: {
        name: category,
        restaurantId: restaurant.id,
      },
    })
  }

  return (
    <Modal opened={open} onClose={onClose} title="Categoria">
      <LoadingOverlay visible={loading} />
      <FocusTrap active={true}>
        <CategoryForm onSubmit={saveCategory} />
      </FocusTrap>
    </Modal>
  )
}

export default CategoryModal
