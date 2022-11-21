import { Button, Flex, Modal, Select, Text } from '@mantine/core'
import {
  CreateOrderInput,
  CreateOrderItemInput,
  OrderItem
} from 'types/graphql'

import { useRestaurantAtom } from 'src/atom/restaurant'

interface Props {
  opened: boolean
  orderItems: OrderItem[]
  onClose: () => void
  onDoneOrder: (order: CreateOrderInput) => void
}

const OrderDetailsModal = ({
  opened,
  orderItems,
  onClose,
  onDoneOrder,
}: Props) => {
  const [restaurant] = useRestaurantAtom()

  function handleDoneOrder() {
    onDoneOrder({
      restaurantId: restaurant.id,
      status: 'ACTIVE',
      tableId: 1,
      orderItems: orderItems.map(
        (orderItem) =>
          ({
            menuItemId: orderItem.item.id,
            quantity: orderItem.quantity,
            status: 'WAITING',
          } as CreateOrderItemInput)
      ),
    })
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Você esta pedindo"
      size="auto"
    >
      <Flex direction="column" gap="md">
        <Flex direction="column">
          {orderItems &&
            orderItems.map((o, index) => (
              <Flex
                key={index}
                p="sm"
                style={{ border: '1px solid #eee' }}
                justify="space-between"
              >
                <Text>
                  {o.item.name} x {o.quantity}
                </Text>
                <Text>R$ {o.item.price * o.quantity}</Text>
              </Flex>
            ))}
        </Flex>
        <Flex direction="column">
          <Select
            data={[{ value: 'PIX', label: 'PIX' }]}
            searchable
            placeholder="Forma de Pagamento"
          ></Select>
        </Flex>
        <Button color="green" onClick={(_) => handleDoneOrder()}>
          Concluir Pedido
        </Button>
      </Flex>
    </Modal>
  )
}

export default OrderDetailsModal
