import { useEffect, useState } from 'react'

import {
  ActionIcon,
  Button,
  Container,
  createStyles,
  Flex,
  Group,
  LoadingOverlay,
  Text,
  TextInput
} from '@mantine/core'
import { IconEdit, IconSearch } from '@tabler/icons'
import { Category, CreateOrderInput, MenuItem, OrderItem } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { toast } from '@redwoodjs/web/dist/toast'

import { useCreateOrderMutation } from 'src/hooks/useOrderMutation'

import OrderDetailsModal from '../Order/OrderDetailsModal'
import OrderMenuItems from '../Order/OrderMenuItems'
import { OrdersPageHeader } from '../Order/OrdersPageHeader'

interface Props {
  name: string
  menuItems: MenuItem[]
  categories: Category[]
}

const RestaurantOrders = ({ menuItems, categories, name }: Props) => {
  const { theme, classes } = useStyles()
  const { currentUser } = useAuth()
  const [menuItemsDisplay, setMenuItemsDisplay] = useState<MenuItem[]>()
  const [search, setSearch] = useState('')
  const [order, setOrder] = useState<OrderItem[]>([] as OrderItem[])
  const [total, setTotal] = useState(0.0)
  const [orderDetailsModal, setOrderDetailsModal] = useState(false)
  const { createOrder, loading } = useCreateOrderMutation({
    onCompleted() {
      toast.success('Pedido feito!')
    },
  })

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

  async function handleCreateOrder(order: CreateOrderInput) {
    console.log(order)
    await createOrder({
      variables: {
        input: order,
      },
    })
  }

  return (
    <>
      <LoadingOverlay visible={loading} />
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
        <Flex align="center" justify="center" gap="sm" wrap="nowrap">
          <Text>R$ {total.toPrecision(4)}</Text>
          <ActionIcon
            color="red"
            className={classes.editOrderAction}
            onClick={() => setOrderDetailsModal(true)}
          >
            <IconEdit color="white" size={25} stroke={1.5} />
          </ActionIcon>
        </Flex>
        <Button onClick={() => setOrderDetailsModal(true)} color="green">
          Concluir Pedido
        </Button>
      </Group>

      <OrderDetailsModal
        orderItems={order}
        opened={orderDetailsModal}
        onClose={() => setOrderDetailsModal(false)}
        onDoneOrder={(order) => handleCreateOrder(order)}
      />
    </>
  )
}

const useStyles = createStyles((theme) => ({
  editOrderAction: {
    '&:hover': {
      backgroundColor: theme.colors.red[8],
    },
  },
}))

export default RestaurantOrders
