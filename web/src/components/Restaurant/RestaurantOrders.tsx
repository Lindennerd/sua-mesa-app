import { useEffect, useState } from 'react'

import { Container, TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons'
import { Category, MenuItem } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'

import OrderMenuItems from '../Menu/OrderMenuItems'
import { OrdersPageHeader } from '../Order/OrdersPageHeader'

interface Props {
  name: string
  menuItems: MenuItem[]
  categories: Category[]
}

const RestaurantOrders = ({ menuItems, categories, name }: Props) => {
  const { currentUser } = useAuth()
  const [menuItemsDisplay, setMenuItemsDisplay] = useState<MenuItem[]>()
  const [search, setSearch] = useState('')

  useEffect(() => {
    setMenuItemsDisplay(
      menuItems.filter((m) => m.category.id === categories[0].id)
    )
  }, [categories, menuItems])

  useEffect(() => {
    setMenuItemsDisplay(menuItems.filter((menu) => menu.name.includes(search)))
  }, [menuItems, search])

  function onSelectcategory(category: number) {
    setMenuItemsDisplay((_) =>
      menuItems.filter((m) => m.category.id === category)
    )
  }

  return (
    <>
      <OrdersPageHeader
        user={{
          image: '',
          name: currentUser?.name,
        }}
        tabs={categories.map((c) => ({ label: c.name, id: c.id }))}
        name={name}
        onSelectcategory={onSelectcategory}
      />
      <Container mt="md">
        <TextInput
          placeholder="Pesquisar"
          icon={<IconSearch />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Container>

      <OrderMenuItems menuItems={menuItemsDisplay} />
    </>
  )
}

export default RestaurantOrders
