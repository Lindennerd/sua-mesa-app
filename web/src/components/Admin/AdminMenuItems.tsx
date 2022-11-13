import { Box, Button, Select } from '@mantine/core'
import { MenuItem } from 'types/graphql'

const AdminMenuItems = ({ menuItems }: { menuItems: MenuItem[] }) => {
  return (
    <>
      <Box style={{display: "flex", gap: "1em", width: "100%"}}>
        <Select
          style={{flex: "1"}}
          placeholder="Categorias nas quais estão divididos os itens"
          data={
            menuItems.map((it) => ({
              value: it.category.id.toString(),
              label: it.category.name,
            })) ?? []
          }
        />
        <Button>Adicionar</Button>
      </Box>
    </>
  )
}

export default AdminMenuItems
