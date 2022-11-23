import { Flex, Skeleton } from '@mantine/core'
import type { RestaurantOrdersQuery } from 'types/graphql'

import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'

import { RESTAURANT_ORDERS_QUERY } from 'src/graphql/order'

import AdminOrdersList from '../Admin/AdminOrdersList'

export const QUERY = RESTAURANT_ORDERS_QUERY

export const beforeQuery = (props) => {
  return {
    variables: props,
    fetchPolicy: 'cache-and-network',
    pollInterval: 2500,
  }
}

export const Loading = () => (
  <Flex direction="column" p="lg">
    <Skeleton height={50} circle mb="xl" />
    <Skeleton height={8} radius="xl" />
    <Skeleton height={8} mt={6} radius="xl" />
    <Skeleton height={8} mt={6} width="70%" radius="xl" />
  </Flex>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  restaurantOrders,
}: CellSuccessProps<RestaurantOrdersQuery>) => {
  return <AdminOrdersList orders={restaurantOrders} />
}
