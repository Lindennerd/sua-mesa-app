import { Box, Button, Select } from '@mantine/core'
import { useState } from 'react'
import { Category, MenuItem } from 'types/graphql'
import CategoryModal from '../Category/CategoryModal'

interface Props {
  menuItems: MenuItem[]
  categories: Category[]
}

const AdminMenuItems = ({ menuItems, categories }: Props) => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Box style={{ display: 'flex', gap: '1em', width: '100%' }}>
        <Select
          style={{ flex: '1' }}
          searchable
          nothingFound="Nenhuma categoria encontrada"
          placeholder="Categorias nas quais estão divididos os itens"
          data={
            categories.map((it) => ({
              value: it.id.toString(),
              label: it.name,
            })) ?? []
          }
        />
        <Button
          variant="outline"
          color="red"
          onClick={(e) => setModalOpen(true)}
        >
          Adicionar
        </Button>
      </Box>

      <CategoryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}

export default AdminMenuItems
