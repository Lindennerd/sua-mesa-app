import { Container, createStyles, Flex, Group, Text } from '@mantine/core'
import { Order } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'

import { useFormatDate } from 'src/hooks/useFormatDate'

import { OrdersPageHeader } from '../Order/OrdersPageHeader'

interface Props {
  orders: Order[]
}

const CustomerOrders = ({ orders }: Props) => {
  const { currentUser } = useAuth()
  const { formatDate } = useFormatDate()
  const { classes } = useStyles()

  return (
    <>
      <OrdersPageHeader
        user={{
          name: currentUser?.name,
          image: '',
        }}
        name={orders && orders[0].restaurant.name}
      />
      <Container>
        <Flex direction="column">
          {orders.map((o) => (
            <Group key={o.id} className={classes.bottomBordered} p="sm">
              <Text>
                Pedido #{o.id} - {formatDate(o.createdAt)}
              </Text>
            </Group>
          ))}
        </Flex>
      </Container>
    </>
  )
}

const useStyles = createStyles((theme) => ({
  bottomBordered: {
    border: '1px solid #eee',
    borderRadius: theme.radius.sm,
  },
}))

export default CustomerOrders
