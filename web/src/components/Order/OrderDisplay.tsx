import { useMemo } from 'react'

import {
  Badge,
  createStyles,
  Flex,
  Group,
  Text,
  UnstyledButton,
} from '@mantine/core'
import { Order } from 'types/graphql'

import { useFormatDate } from 'src/hooks/useFormatDate'

import AdminOrderItemStatus from '../Admin/AdminOrderItemStatus'

interface Props {
  order: Order
  enableStatusChange: boolean
  handlePayOrder?: () => void
}

const OrderDisplay = ({ order, enableStatusChange, handlePayOrder }: Props) => {
  const { formatDate } = useFormatDate()
  const { classes } = useStyles()

  const orderTotal = useMemo(() => {
    return order.orderItems.reduce(
      (prev, curr) => prev + curr.item.price * curr.quantity,
      0
    )
  }, [order])

  return (
    <>
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
              <AdminOrderItemStatus
                orderItem={orderItem}
                orderId={order.id}
                enabled={enableStatusChange}
              />
            </Group>
          ))}
      </Flex>
      <Group p="sm">
        <UnstyledButton
          disabled={!handlePayOrder}
          onClick={() => handlePayOrder()}
        >
          <Badge color={order.payed ? 'green' : 'blue'}>
            {order.payed ? 'Pago' : 'Pagamento Pendente'}
          </Badge>
        </UnstyledButton>
        <Text weight="bolder" color="green">
          R$ {orderTotal}
        </Text>
      </Group>
    </>
  )
}

const useStyles = createStyles((theme) => ({
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

export default OrderDisplay
