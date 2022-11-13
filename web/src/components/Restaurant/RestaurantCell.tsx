import { Loader } from "@mantine/core";
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web';
import { useEffect } from "react";
import { useRestaurantAtom } from "src/atom/restaurant";
import { QUERY_RESTAURANT_BY_SLUG } from "src/graphql/restaurant";
import type { FindRestaurantBySlug, FindRestaurantBySlugVariables } from 'types/graphql';
import RestaurantAdmin from './RestaurantAdmin';

export const QUERY = QUERY_RESTAURANT_BY_SLUG;

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
  const [restaurant, setRestaurant] = useRestaurantAtom();
  useEffect(() => {
    setRestaurant(restaurantBySlug.id);
  }, [restaurantBySlug])


  return <RestaurantAdmin
    menuItems={restaurantBySlug.MenuItem}
    categories={restaurantBySlug.Category}
    employees={restaurantBySlug.RestaurantUser.filter(user => user.roles === "EMPLOYEE") ?? []}
    name={restaurantBySlug.name}
  />
}
