import { LoadingOverlay } from '@mantine/core'
import type { CustomerOrdersQuery } from 'types/graphql'

import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'

import CustomerOrders from './CustomerOrders'
import { useRestaurantAtom } from 'src/atom/restaurant'
import { useEffect } from 'react'

export const QUERY = gql`
  query CustomerOrdersQuery($restaurantSlug: String!) {
    customerOrders(restaurantSlug: $restaurantSlug) {
      payed
      status
      table {
        id
        name
      }
      createdAt
      customer {
        name
        id
        email
      }
      id
      orderItems {
        id
        quantity
        status
        item {
          name
          image
          price
          description
          id
          category {
            name
            id
          }
        }
      }
      restaurant {
        name
        slug
        id
      }
    }
  }
`
export const beforeQuery = (props) => {
  return {
    variables: props,
    fetchPolicy: 'cache-and-network',
  }
}

export const Loading = () => (
  <>
    <LoadingOverlay visible={true} />
  </>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  customerOrders,
}: CellSuccessProps<CustomerOrdersQuery>) => {
  const [_, setRestaurant] = useRestaurantAtom()
  useEffect(() => {
    setRestaurant({
      id: customerOrders[0].restaurant.id,
      slug: customerOrders[0].restaurant.slug,
    })
  }, [customerOrders, setRestaurant])

  return <CustomerOrders orders={customerOrders} />
}
