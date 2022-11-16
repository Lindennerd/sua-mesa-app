export const CREATE_RESTAURANT_MUTATION = gql`
  mutation CreateRestautant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      slug
    }
  }
`
export const QUERY_RESTAURANT_BY_SLUG = gql`
  query FindRestaurantBySlug($slug: String!) {
    restaurantBySlug: restaurantBySlug(slug: $slug) {
      id
      name
      slug
      MenuItem {
        id
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
      Category {
        id
        name
      }
    }
  }
`
