export const CREATE_CATEGORY = gql`
  mutation CreateCategory($name: String!) {
    createCategory(input: { name: $name }) {
      id
      name
    }
  }
`
