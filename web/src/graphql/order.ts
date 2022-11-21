export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      status
      id
      tableId
      orderItems {
        quantity
        status
        id
        item {
          name
          price
          id
          description
          image
          category {
            name
            id
          }
        }
      }
    }
  }
`
