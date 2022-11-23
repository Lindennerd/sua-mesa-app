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
import { Order } from 'types/graphql'

import AdminOrderItemStatus from './AdminOrderItemStatus'

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
            <UnstyledButton>
              <Badge>{order.payed ? 'Pago' : 'Pagamento Pendente'}</Badge>
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
              <Menu.Item icon={<IconCheck size={14} />}>
                Encerrar Pedido
              </Menu.Item>
              <Menu.Item
                // onClick={() => setModalDeleteMenuItemOpen(true)}
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
