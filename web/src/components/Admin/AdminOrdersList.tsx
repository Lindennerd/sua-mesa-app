import { useEffect, useState } from 'react'

import { Flex } from '@mantine/core'
import { Order } from 'types/graphql'

import AdminOrderItem from './AdminOrderItem'
import AdminTopNav from './AdminTopNav'

interface Props {
  orders: Order[]
}

const AdminOrdersList = ({ orders }: Props) => {
  const [filter, setFilter] = useState('')
  const [ordersDisplay, setOrdersDisplay] = useState<Order[]>([] as Order[])

  useEffect(() => {
    setOrdersDisplay(orders)
  }, [orders])

  useEffect(() => {
    setOrdersDisplay(
      orders.filter((order) =>
        order.orderItems.some((orderItem) =>
          orderItem.item.name.includes(filter)
        )
      )
    )
  }, [filter, orders])

  return (
    <>
      <AdminTopNav
        title="Pedidos"
        navMenu={<></>}
        filter={filter}
        onFilter={(filter) => setFilter(filter)}
      />
      <Flex direction="column" gap="sm" p="sm">
        {ordersDisplay &&
          ordersDisplay.map((order) => (
            <AdminOrderItem order={order} key={order.id} />
          ))}
      </Flex>
    </>
  )
}

export default AdminOrdersList
