import type { CustomerOrdersQuery } from 'types/graphql'

import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'

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
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  customerOrders,
}: CellSuccessProps<CustomerOrdersQuery>) => {
  return (
    <ul>
      {customerOrders.map((item) => {
        return <li key={item.id}>{JSON.stringify(item)}</li>
      })}
    </ul>
  )
}
