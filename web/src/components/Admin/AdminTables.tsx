import { Table } from "types/graphql"

interface Props {
  tables: Table[]
}

const AdminTables = ({tables}: Props) => {
  return <div>{JSON.stringify(tables)}</div>
}

export default AdminTables