import {
  ActionIcon,
  createStyles,
  Flex,
  Group,
  Menu,
  Text
} from '@mantine/core'
import { IconCategory, IconPlus, IconToolsKitchen } from '@tabler/icons'
import { useState } from 'react'
import { Category, MenuItem } from 'types/graphql'
import CategoryModal from '../Category/CategoryModal'
import { AdminMenuItem } from '../Menu/AdminMenuItem'
import MenuItemModal from '../Menu/MenuItemModal'

interface Props {
  menuItems: MenuItem[]
  categories: Category[]
}

const AdminMenuItems = ({ menuItems, categories }: Props) => {
  const { classes, theme } = useClasses()

  const [modalCategoriesOpen, setModalCategoriesOpen] = useState(false)
  const [modalMenuItemOpen, setModalMenuItemOpen] = useState(false)

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
            <Menu.Item
              icon={<IconToolsKitchen size={14} />}
              onClick={(e) => setModalMenuItemOpen(true)}
            >
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

      <Flex direction="column">
        {menuItems &&
          menuItems.map((item, index) => (
            <AdminMenuItem
              menuItem={item}
              categories={categories}
              key={index}
            />
          ))}
      </Flex>

      <CategoryModal
        open={modalCategoriesOpen}
        onClose={() => setModalCategoriesOpen(false)}
      />

      <MenuItemModal
        categories={categories}
        open={modalMenuItemOpen}
        onClose={() => setModalMenuItemOpen(false)}
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
    padding: '1em',
  },
})

export default AdminMenuItems
