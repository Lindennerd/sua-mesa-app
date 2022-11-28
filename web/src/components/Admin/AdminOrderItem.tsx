import { ActionIcon, createStyles, Flex, Menu } from '@mantine/core'
import { IconCheck, IconDotsVertical, IconTrash } from '@tabler/icons'
import { Order, UpdateOrderInput } from 'types/graphql'

import { useUpdateOrder } from 'src/hooks/useOrderMutation'

import OrderDisplay from '../Order/OrderDisplay'

interface Props {
  order: Order
}

const AdminOrderItem = ({ order }: Props) => {
  const { classes } = useStyles()
  const { updateOrder } = useUpdateOrder({ onCompleted() {} })
  const updateOrderVars = {
    payed: order.payed,
    restaurantId: order.restaurantId,
    status: order.status,
    tableId: order.tableId,
    userId: order.userId,
  } as UpdateOrderInput

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
          <OrderDisplay
            order={order}
            handlePayOrder={handlePayOrder}
            enableStatusChange={true}
          />
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
}))

export default AdminOrderItem
