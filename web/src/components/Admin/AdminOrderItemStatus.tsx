import { Badge, Menu, UnstyledButton } from '@mantine/core'
import { OrderItem, OrderItemStatus } from 'types/graphql'

import { useOrderItemUpdateStatus } from 'src/hooks/useOrderItemMutation'

interface Props {
  orderItem: OrderItem
  orderId: number
  enabled: boolean
}

function OrdemItemStatusBadgeFactory(status: OrderItemStatus) {
  switch (status) {
    case 'WAITING':
      return <Badge>Aguardando</Badge>
    case 'PREPARING':
      return <Badge color="yellow">Preparando</Badge>
    case 'DONE':
      return <Badge color="orange">Pronto para Entregar</Badge>
    case 'DELIVERED':
      return <Badge color="green">Entregue ao Cliente</Badge>
    default:
      return <Badge>Aguardando</Badge>
  }
}

const AdminOrderItemStatus = ({ orderItem, orderId, enabled }: Props) => {
  const { updateOrderItem } = useOrderItemUpdateStatus({ onCompleted() {} })

  async function handleUpdateStatus(status: OrderItemStatus) {
    await updateOrderItem({
      variables: {
        id: orderItem.id,
        input: {
          menuItemId: orderItem.item.id,
          orderId: orderId,
          status: status,
        },
      },
      optimisticResponse: () => {
        return {
          updateOrderItem: {
            id: orderItem.id,
            orderId: orderId,
            status: status,
          },
        }
      },
    })
  }

  return (
    <Menu>
      <Menu.Target>
        <UnstyledButton disabled={!enabled}>
          {OrdemItemStatusBadgeFactory(orderItem.status)}
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => handleUpdateStatus('WAITING')}>
          Aguardando
        </Menu.Item>
        <Menu.Item onClick={() => handleUpdateStatus('PREPARING')}>
          Preparando
        </Menu.Item>
        <Menu.Item onClick={() => handleUpdateStatus('DONE')}>
          Pronto para entregar
        </Menu.Item>
        <Menu.Item onClick={() => handleUpdateStatus('DELIVERED')}>
          Entregue ao cliente
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default AdminOrderItemStatus
