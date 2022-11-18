import { useEffect, useState } from 'react'

import { ActionIcon, Flex, Menu } from '@mantine/core'
import { IconCategory, IconPlus, IconToolsKitchen } from '@tabler/icons'
import { Category, MenuItem } from 'types/graphql'

import CategoryModal from '../Category/CategoryModal'
import { AdminMenuItem } from '../Menu/AdminMenuItem'
import MenuItemModal from '../Menu/MenuItemModal'
import AdminTopNav from './AdminTopNav'

interface Props {
  menuItems: MenuItem[]
  categories: Category[]
}

const AdminMenuItems = ({ menuItems, categories }: Props) => {
  const [menuItemsDisplay, setMenuItemsDisplay] = useState(menuItems)
  const [filter, setFilter] = useState('')

  const [modalCategoriesOpen, setModalCategoriesOpen] = useState(false)
  const [modalMenuItemOpen, setModalMenuItemOpen] = useState(false)

  useEffect(() => {
    setMenuItemsDisplay(menuItems)
  }, [menuItems])

  useEffect(() => {
    setMenuItemsDisplay((_) =>
      menuItems.filter(
        (i) =>
          i.name.toLowerCase().includes(filter.toLowerCase()) ||
          i.category.name.toLowerCase().includes(filter.toLowerCase())
      )
    )
  }, [filter, menuItems])

  return (
    <>
      <AdminTopNav
        filter={filter}
        onFilter={(filter) => setFilter(filter)}
        title="administração do menu"
        navMenu={
          <Menu shadow="md" width={250}>
            <Menu.Target>
              <ActionIcon>
                <IconPlus stroke={2} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                icon={<IconToolsKitchen size={14} />}
                onClick={() => setModalMenuItemOpen(true)}
              >
                Adicionar item ao menu
              </Menu.Item>
              <Menu.Item
                icon={<IconCategory size={14} />}
                onClick={() => setModalCategoriesOpen(true)}
              >
                Adicionar Categoria
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        }
      ></AdminTopNav>

      <Flex direction="column">
        {menuItemsDisplay &&
          menuItemsDisplay.map((item, index) => (
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

export default AdminMenuItems
