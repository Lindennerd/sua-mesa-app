export const CREATE_MENUITEM_MUTATION = gql`
  mutation CreateMenuItem($input: CreateMenuItemInput!) {
    createMenuItem(input: $input) {
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
  }
`
