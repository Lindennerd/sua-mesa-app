export const CREATE_RESTAURANT_MUTATION = gql`
  mutation CreateRestautant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      slug
    }
  }
`
