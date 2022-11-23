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
        order {
          id
        }
      }
    }
  }
`

export const RESTAURANT_ORDERS_QUERY = gql`
  query RestaurantOrdersQuery($restaurantId: Int!) {
    restaurantOrders(restaurantId: $restaurantId) {
      payed
      status
      table {
        id
        name
      }
      createdAt
      customer {
        name
        id
        email
      }
      id
      orderItems {
        id
        quantity
        status
        item {
          name
          image
          price
          description
          id
          category {
            name
            id
          }
        }
      }
    }
  }
`
