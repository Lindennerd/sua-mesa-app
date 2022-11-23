export const UPDATE_ORDERITEMSTATUS_MUTATION = gql`
  mutation UpdateOrderItemStatus($input: UpdateOrderItemInput!, $id: Int!) {
    updateOrderItem(id: $id, input: $input) {
      status
      id
      orderId
    }
  }
`
