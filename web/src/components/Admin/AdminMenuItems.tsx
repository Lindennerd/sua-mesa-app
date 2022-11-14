import { ActionIcon, createStyles, Flex, Group, Menu, Paper, Text, TextInput } from '@mantine/core'
import {
  IconCategory, IconPlus, IconSearch, IconToolsKitchen
} from '@tabler/icons'
import { useState } from 'react'
import { Category, MenuItem } from 'types/graphql'
import CategoryModal from '../Category/CategoryModal'

interface Props {
  menuItems: MenuItem[]
  categories: Category[]
}

const AdminMenuItems = ({ menuItems, categories }: Props) => {
  const { classes, theme } = useClasses()

  const [modalCategoriesOpen, setModalCategoriesOpen] = useState(false)

  return (
    <>
      <Group align={'center'} className={classes.topNav}>
        <Text>ADMINISTRAÇÃO DO MENU</Text>
        <Menu shadow="md" width={250}>
          <Menu.Target>
            <ActionIcon>
              <IconPlus stroke={2} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item icon={<IconToolsKitchen size={14} />}>
              Adicionar item ao menu
            </Menu.Item>
            <Menu.Item
              icon={<IconCategory size={14} />}
              onClick={(e) => setModalCategoriesOpen(true)}
            >
              Adicionar Categoria
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      <Flex direction={'column'} className={classes.content} gap="md">
        <Group grow={true}>
          <TextInput
            icon={<IconSearch />}
            placeholder="Filtrar items"
            width={'100%'}
          />
        </Group>
        {categories &&
          categories.map((cat) => (
            <Group key={cat.id} title={cat.name}>
              <Paper shadow={"sm"} withBorder p={"md"}>
                <Text>{cat.name}</Text>
              </Paper>
            </Group>
          ))}
      </Flex>

      <CategoryModal
        open={modalCategoriesOpen}
        onClose={() => setModalCategoriesOpen(false)}
      />
    </>
  )
}

const useClasses = createStyles({
  topNav: {
    borderBottom: '.5px solid #eee',
    width: '100%',
    padding: '1em',
    justifyContent: 'space-between',
  },
  content: {
    padding: '1em'
  }
})

export default AdminMenuItems
