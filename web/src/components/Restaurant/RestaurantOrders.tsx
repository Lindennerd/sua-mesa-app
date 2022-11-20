import { useEffect, useState } from 'react'

import {
  Button,
  Container,
  createStyles,
  Group,
  Text,
  TextInput,
  UnstyledButton
} from '@mantine/core'
import { IconSearch } from '@tabler/icons'
import { Category, MenuItem, OrderItem } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'

import OrderMenuItems from '../Order/OrderMenuItems'
import { OrdersPageHeader } from '../Order/OrdersPageHeader'

interface Props {
  name: string
  menuItems: MenuItem[]
  categories: Category[]
}

const RestaurantOrders = ({ menuItems, categories, name }: Props) => {
  const { theme } = useStyles()
  const { currentUser } = useAuth()
  const [menuItemsDisplay, setMenuItemsDisplay] = useState<MenuItem[]>()
  const [search, setSearch] = useState('')
  const [order, setOrder] = useState<OrderItem[]>([] as OrderItem[])
  const [total, setTotal] = useState(0.0)

  useEffect(() => {
    setMenuItemsDisplay(
      menuItems.filter((m) => m.category.id === categories[0].id)
    )
  }, [categories, menuItems])

  useEffect(() => {
    setMenuItemsDisplay(menuItems.filter((menu) => menu.name.includes(search)))
  }, [menuItems, search])

  useEffect(() => {
    setTotal(
      order.reduce((prev, curr) => prev + curr.item.price * curr.quantity, 0)
    )
  }, [order])

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
      <Container
        pt="md"
        style={{
          backgroundColor: 'white',
          position: 'sticky',
          top: '6.4rem',
          zIndex: 25,
        }}
      >
        <TextInput
          placeholder="Pesquisar"
          icon={<IconSearch />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Container>

      <OrderMenuItems onOrderItem={setOrder} menuItems={menuItemsDisplay} />

      <Group
        position="apart"
        p="md"
        style={{
          position: 'fixed',
          bottom: 0,
          color: 'white',
          backgroundColor: theme.colors.red[7],
          width: '100%',
          borderTopRightRadius: '0.5em',
          borderTopLeftRadius: '0.5em',
          flexWrap: 'nowrap',
        }}
      >
        <UnstyledButton>
          <Text>R$ {total.toPrecision(3)}</Text>
        </UnstyledButton>
        <Button color="green">Concluir Pedido</Button>
      </Group>
    </>
  )
}

const useStyles = createStyles({})

export default RestaurantOrders
