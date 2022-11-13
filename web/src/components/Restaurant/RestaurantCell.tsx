import { Loader } from "@mantine/core";
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web';
import type { FindRestaurantBySlug, FindRestaurantBySlugVariables } from 'types/graphql';
import RestaurantAdmin from './RestaurantAdmin';

export const QUERY = gql`
  query FindRestaurantBySlug($slug: String!) {
    restaurantBySlug: restaurantBySlug(slug: $slug) {
      id
      name
      MenuItem {
        image
        name
        price
        description
        createdAt
        category {
          id
          createdAt
          name
        }
      }
      RestaurantUser {
        roles
        user {
          name
          id
        }
      }
    }
  }
`

export const Loading = () => <div style={{
  display: "flex",
  flexDirection:"column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
}}>
  <Loader />
</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindRestaurantBySlugVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  restaurantBySlug,
}: CellSuccessProps<FindRestaurantBySlug, FindRestaurantBySlugVariables>) => {
  return <RestaurantAdmin
    menuItems={restaurantBySlug.MenuItem}
    employees={restaurantBySlug.RestaurantUser.filter(user => user.roles === "EMPLOYEE") ?? []}
    name={restaurantBySlug.name}
  />
}
