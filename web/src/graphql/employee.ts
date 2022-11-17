export const DELETE_EMPLOYEE_MUTATION = gql`
  mutation DeleteEmployee($deleteUserId: Int!) {
    deleteUser(id: $deleteUserId) {
      id
    }
  }
`
