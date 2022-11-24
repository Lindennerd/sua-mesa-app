import { Dispatch, SetStateAction } from 'react'

import {
  Badge,
  Container,
  Flex,
  Group,
  Image,
  NumberInput,
  Text
} from '@mantine/core'
import { MenuItem, OrderItem } from 'types/graphql'

interface Props {
  menuItems: MenuItem[]
  onOrderItem: Dispatch<SetStateAction<OrderItem[]>>
}

const OrderMenuItems = ({ menuItems, onOrderItem }: Props) => {
  function handleOrderChange(amount: number, item: MenuItem) {
    if (amount === undefined) amount = 0

    onOrderItem((orders) => {
      // if amount is 0, remove item
      if (amount === 0) {
        return orders.filter((o) => o.item.id !== item.id)
      }

      // if item already exists, update it
      if (orders.some((o) => o.item.id === item.id)) {
        return orders.map((o) => {
          if (o.item.id === item.id) {
            return {
              item: item,
              quantity: amount,
              id: 0,
              orderId: 0,
              status: 'WAITING',
              order: null,
              menuItemId: item.id,
            }
          }
          return o
        })
      }

      //if item doesnt exist, add it
      return orders.concat([
        {
          item: item,
          quantity: amount,
          id: 0,
          orderId: 0,
          status: 'WAITING',
          order: null,
          menuItemId: item.id,
        },
      ])
    })
  }

  return (
    <Container mt="md" style={{ marginBottom: '5em' }}>
      <Flex direction="column">
        {menuItems &&
          menuItems.map((m) => (
            <Group
              position="apart"
              key={m.id}
              p="md"
              style={{ border: '1px solid #eee' }}
            >
              <Group position="center" style={{ flexWrap: 'nowrap' }}>
                <Image src={m.image} width="auto" height={100} alt={m.name} />
                <Flex direction="column">
                  <Text weight="bolder">
                    {m.name}{' '}
                    <Badge color="green">R$ {m.price.toPrecision(2)}</Badge>
                  </Text>
                  <Text>{m.description}</Text>
                </Flex>
              </Group>

              <Group style={{ flexWrap: 'nowrap' }}>
                <NumberInput
                  min={0}
                  placeholder="Quantidade"
                  onChange={(value) => handleOrderChange(value, m)}
                />
              </Group>
            </Group>
          ))}
      </Flex>
    </Container>
  )
}

export default OrderMenuItems
