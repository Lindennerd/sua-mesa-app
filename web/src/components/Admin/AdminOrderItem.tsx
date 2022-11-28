import { useMemo } from 'react'

import {
  ActionIcon,
  Badge,
  createStyles,
  Flex,
  Group,
  Menu,
  Text,
  UnstyledButton
} from '@mantine/core'
import { IconCheck, IconDotsVertical, IconTrash } from '@tabler/icons'
import { Order, UpdateOrderInput } from 'types/graphql'

import { useFormatDate } from 'src/hooks/useFormatDate'
import { useUpdateOrder } from 'src/hooks/useOrderMutation'

import AdminOrderItemStatus from './AdminOrderItemStatus'

interface Props {
  order: Order
}

const AdminOrderItem = ({ order }: Props) => {
  const { classes } = useStyles()
  const { formatDate } = useFormatDate()
  const { updateOrder } = useUpdateOrder({ onCompleted() {} })
  const updateOrderVars = {
    payed: order.payed,
    restaurantId: order.restaurantId,
    status: order.status,
    tableId: order.tableId,
    userId: order.userId,
  } as UpdateOrderInput

  const orderTotal = useMemo(() => {
    return order.orderItems.reduce(
      (prev, curr) => prev + curr.item.price * curr.quantity,
      0
    )
  }, [order])

  async function handlePayOrder() {
    await updateOrder({
      variables: {
        id: order.id,
        input: { ...updateOrderVars, payed: !order.payed },
      },
      optimisticResponse() {
        return {
          updateOrder: {
            ...order,
            payed: !order.payed,
          },
        }
      },
    })
  }

  async function handleCloseOrder() {
    await updateOrder({
      variables: {
        id: order.id,
        input: { ...updateOrderVars, status: 'CLOSED' },
      },
      optimisticResponse() {
        return {
          updateOrder: {
            ...order,
            status: 'CLOSED',
          },
        }
      },
    })
  }

  return (
    <Flex className={classes.bottomBordered} direction="column" p="sm">
      <Flex justify="space-between" gap="md">
        <div style={{ flex: '1' }}>
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
                    {orderItem.quantity} x{' '}
                    {orderItem.item.name.toLocaleUpperCase()} - R${' '}
                    {orderItem.item.price.toFixed(2)}
                  </Text>
                  <AdminOrderItemStatus
                    orderItem={orderItem}
                    orderId={order.id}
                  />
                </Group>
              ))}
          </Flex>
          <Group p="sm">
            <UnstyledButton onClick={() => handlePayOrder()}>
              <Badge color={order.payed ? 'green' : 'blue'}>
                {order.payed ? 'Pago' : 'Pagamento Pendente'}
              </Badge>
            </UnstyledButton>
            <Text weight="bolder" color="green">
              R$ {orderTotal}
            </Text>
          </Group>
        </div>
        <div>
          <Menu transition="slide-down" transitionDuration={150}>
            <Menu.Target>
              <ActionIcon>
                <IconDotsVertical />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={() => handleCloseOrder()}
                icon={<IconCheck size={14} />}
              >
                Encerrar Pedido
              </Menu.Item>
              <Menu.Item
                onClick={() => handleCloseOrder()}
                color="red"
                icon={<IconTrash size={14} />}
              >
                Cancelar
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </Flex>
    </Flex>
  )
}

const useStyles = createStyles((theme) => ({
  bottomBordered: {
    border: '1px solid #eee',
    borderRadius: theme.radius.sm,
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
