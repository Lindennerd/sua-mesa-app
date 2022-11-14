export const CREATE_CATEGORY = gql`
  mutation CreateCategory($name: String!, $restaurantId: Int!) {
    createCategory(input: { name: $name, restaurantId: $restaurantId }) {
      id
      name
    }
  }
`
