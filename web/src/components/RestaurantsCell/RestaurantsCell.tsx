import type { RestaurantsQuery } from 'types/graphql'

import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'

import { RestaurantList } from '../Restaurant/RestaurantList'

export const QUERY = gql`
  query RestaurantsQuery {
    restaurants {
      id
      name
      slug
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  restaurants,
}: CellSuccessProps<RestaurantsQuery>) => {
  return <RestaurantList restaurants={restaurants} />
}
