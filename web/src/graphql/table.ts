export const CREATE_TABLE_MUTATION = gql`
  mutation CreateTableMutation($input: CreateTableInput!) {
    createTable(input: $input) {
      id
      name
    }
  }
`
export const DELETE_TABLE_MUTATION = gql`
  mutation DeleteTableMutation($id: Int!) {
    deleteTable(id: $id) {
      id
    }
  }
`
