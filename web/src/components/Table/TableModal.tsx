import { LoadingOverlay, Modal } from '@mantine/core'

import { useRestaurantAtom } from 'src/atom/restaurant'
import useTableMutation from 'src/hooks/useTableMutation'

import TableForm from './TableForm'

interface Props {
  openned: boolean
  onClose: () => void
}

const TableModal = ({ openned, onClose }: Props) => {
  const [restaurant] = useRestaurantAtom()
  const { create } = useTableMutation()

  const createTableMutation = create({
    onCompleted() {
      onClose()
    },
  })

  async function onSubmit(tableName: string) {
    await createTableMutation.createTable({
      variables: {
        input: {
          name: tableName,
          restaurantId: restaurant.id,
        },
      },
    })
  }

  return (
    <Modal opened={openned} onClose={onClose} title="Adicionar Mesa">
      <LoadingOverlay visible={createTableMutation.loading} />
      <TableForm onSubmit={onSubmit} />
    </Modal>
  )
}

export default TableModal
