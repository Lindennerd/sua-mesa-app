import { LoadingOverlay } from "@mantine/core";
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web';
import { useEffect } from "react";
import { useRestaurantAtom } from "src/atom/restaurant";
import { QUERY_RESTAURANT_BY_SLUG } from "src/graphql/restaurant";
import type { FindRestaurantBySlug, FindRestaurantBySlugVariables } from 'types/graphql';
import RestaurantAdmin from './RestaurantAdmin';

export const QUERY = QUERY_RESTAURANT_BY_SLUG;

export const beforeQuery = (props) => {
  return {
    variables: props,
    fetchPolicy: 'cache-and-network',
  }
}

export const Loading = () => <>
  <LoadingOverlay visible={true} />
</>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindRestaurantBySlugVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  restaurantBySlug,
}: CellSuccessProps<FindRestaurantBySlug, FindRestaurantBySlugVariables>) => {
  const [restaurant, setRestaurant] = useRestaurantAtom();
  useEffect(() => {
    setRestaurant({
      id: restaurantBySlug.id,
      slug: restaurantBySlug.slug
    })
  }, [restaurantBySlug])


  return <RestaurantAdmin
    menuItems={restaurantBySlug.MenuItem}
    categories={restaurantBySlug.Category}
    employees={restaurantBySlug.RestaurantUser.filter(user => user.roles === "EMPLOYEE") ?? []}
    name={restaurantBySlug.name}
  />
}
