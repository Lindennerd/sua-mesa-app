import { InMemoryCache } from '@apollo/client'

export const cache = new InMemoryCache({
  typePolicies: {
    Mutation: {
      fields: {
        restaurantBySlug: {
          merge(_, incomming, { cache }) {
            console.log(incomming)
            console.log(cache)
          },
        },
      },
    },
  },
})
