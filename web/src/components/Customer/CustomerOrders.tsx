import { Container, createStyles, Flex } from '@mantine/core'
import { Order } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'

import OrderDisplay from '../Order/OrderDisplay'
import { OrdersPageHeader } from '../Order/OrdersPageHeader'

interface Props {
  orders: Order[]
}

const CustomerOrders = ({ orders }: Props) => {
  const { currentUser } = useAuth()
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
            <div key={o.id} className={classes.bottomBordered}>
              <OrderDisplay order={o} enableStatusChange={false}/>
            </div>
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
