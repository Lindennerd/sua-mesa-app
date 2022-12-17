import { RestaurantsQuery } from 'types/graphql'

interface Props {
  restaurants: RestaurantsQuery
}

export const RestaurantList = ({restaurants}: Props) => {
  return restaurants.restaurants.map(restaurant => (
    <div key={restaurant.id}>
      {restaurant.name}
    </div>
  ))
 }
