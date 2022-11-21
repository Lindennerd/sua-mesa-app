import { ApolloCache } from '@apollo/client';
import { FindRestaurantBySlug } from 'types/graphql';

import { QUERY_RESTAURANT_BY_SLUG } from 'src/graphql/restaurant';

export function readRestaurantQuery(
  cache: ApolloCache<any>,
  restaurant: { id: number; slug: string }
) {
  return cache.readQuery<FindRestaurantBySlug>({
    query: QUERY_RESTAURANT_BY_SLUG,
    variables: {
      slug: restaurant.slug,
    },
  })
}
