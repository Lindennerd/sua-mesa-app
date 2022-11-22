import { useState } from 'react'

import { Button, Flex, Modal, Select, Text } from '@mantine/core'
import { toast } from 'react-toastify'
import {
  CreateOrderInput,
  CreateOrderItemInput,
  OrderItem,
  Table
} from 'types/graphql'

import { useRestaurantAtom } from 'src/atom/restaurant'
import { useTableAtom } from 'src/atom/table'

interface Props {
  opened: boolean
  tables: Table[]
  orderItems: OrderItem[]
  onClose: () => void
  onDoneOrder: (order: CreateOrderInput) => void
}

const OrderDetailsModal = ({
  opened,
  orderItems,
  tables,
  onClose,
  onDoneOrder,
}: Props) => {
  const [restaurant] = useRestaurantAtom()
  const [table] = useTableAtom()
  const [chosenTable, setChosenTable] = useState(table?.toString())

  function handleDoneOrder() {
    if (parseInt(chosenTable) === 0) {
      toast.warn('Por Favor, escolha uma mesa')
      return
    }

    onDoneOrder({
      restaurantId: restaurant.id,
      status: 'ACTIVE',
      tableId: parseInt(chosenTable),
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
        {table === 0 && (
          <Flex direction="column">
            <Select
              data={tables.map((t) => ({
                value: t.id.toString(),
                label: t.name,
              }))}
              searchable
              placeholder="Mesa"
              value={chosenTable}
              onChange={(value) => setChosenTable(value)}
            ></Select>
          </Flex>
        )}
        <Button color="green" onClick={(_) => handleDoneOrder()}>
          Concluir Pedido
        </Button>
      </Flex>
    </Modal>
  )
}

export default OrderDetailsModal
