export const CREATE_MENUITEM_MUTATION = gql`
  mutation CreateMenuItem($input: CreateMenuItemInput!) {
    createMenuItem(input: $input) {
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
  }
`
export const UPDATE_MENUITEM_MUTATION = gql`
  mutation UpdateMenuItem(
    $updateMenuItemId: Int!
    $input: UpdateMenuItemInput!
  ) {
    updateMenuItem(id: $updateMenuItemId, input: $input) {
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
  }
`
export const DELETE_MENUITEM_MUTATION = gql`
  mutation DeleteMenuItem($deleteMenuItemId: Int!) {
    deleteMenuItem(id: $deleteMenuItemId) {
      id
    }
  }
`
