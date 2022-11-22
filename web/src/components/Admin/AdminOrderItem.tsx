import { useMemo } from 'react'

import { Badge, createStyles, Flex, Group, Text } from '@mantine/core'
import { Order } from 'types/graphql'

interface Props {
  order: Order
}

const AdminOrderItem = ({ order }: Props) => {
  const { classes } = useStyles()

  const orderTotal = useMemo(() => {
    return order.orderItems.reduce(
      (prev, curr) => prev + curr.item.price * curr.quantity,
      0
    )
  }, [order])

  function formatDate(date: string) {
    const dateParsed = new Date(date)
    return `${dateParsed.toLocaleString()}`
  }

  return (
    <Flex className={classes.bottomBordered} direction="column" p="sm">
      <Group className={classes.orderTitle}>
        <Text weight="bolder">
          Pedido #{order.id} - Mesa {order.table.name}
        </Text>
        <Text variant="text" size="sm">
          {formatDate(order.createdAt)}
        </Text>
      </Group>
      <Flex direction="column" p="sm">
        {order.orderItems &&
          order.orderItems.map((orderItem) => (
            <Group key={orderItem.id} className={classes.orderItem}>
              <Text>
                {orderItem.quantity} x {orderItem.item.name.toLocaleUpperCase()}{' '}
                - R$ {orderItem.item.price.toFixed(2)}
              </Text>
              <Badge>{orderItem.status}</Badge>
            </Group>
          ))}
      </Flex>
      <Group p="sm">
        <Badge>{order.payed ? 'Pago' : 'Pagamento Pendente'}</Badge>
        <Text weight="bolder" color="green">
          R$ {orderTotal}
        </Text>
      </Group>
    </Flex>
  )
}

const useStyles = createStyles((theme) => ({
  bottomBordered: {
    borderBottom: '1px solid #eee',
  },
  orderTitle: {
    color: theme.colors.red[7],
    padding: '.5em',
    borderRadius: theme.radius.lg,
  },
  orderItem: {
    padding: '.5em',
    border: '1px solid #eee',
  },
}))

export default AdminOrderItem
