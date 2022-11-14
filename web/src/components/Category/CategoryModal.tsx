import { Modal } from '@mantine/core'
import { useRestaurantAtom } from 'src/atom/restaurant'
import CategoryForm from './CategoryForm'

interface Props {
  open: boolean
  onClose: () => void
}

const CategoryModal = ({ open, onClose }: Props) => {
  const [restaurant] = useRestaurantAtom();

  function saveCategory(category: string) {

  }

  return (
    <Modal opened={open} onClose={onClose} title="Categoria">
      <CategoryForm onSubmit={saveCategory}/>
    </Modal>
  )
}

export default CategoryModal
