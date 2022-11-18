import { useEffect, useState } from 'react'

import { ActionIcon, Button, Flex, Tooltip } from '@mantine/core'
import { IconPlus } from '@tabler/icons'
import { Table } from 'types/graphql'

import TableItem from '../Table/TableItem'
import TableModal from '../Table/TableModal'

import AdminTopNav from './AdminTopNav'

interface Props {
  tables: Table[]
}

const AdminTables = ({ tables }: Props) => {
  const [tablesDisplay, setTablesDisplay] = useState(tables)
  const [filter, setFilter] = useState('')
  const [tableModal, setTableModal] = useState(false)

  useEffect(() => {
    setTablesDisplay(tables)
  }, [tables])

  useEffect(() => {
    setTablesDisplay((tables) => {
      return tables.filter((t) => t.name.includes(filter))
    })
  }, [filter, tables])

  return (
    <>
      <AdminTopNav
        title="Administração de Mesas"
        filter={filter}
        onFilter={(filter) => setFilter(filter)}
        navMenu={
          <Tooltip label="Adicionar Funcionário" position="bottom">
            <ActionIcon onClick={() => setTableModal(true)}>
              <IconPlus stroke={2} />
            </ActionIcon>
          </Tooltip>
        }
      />

      <Flex direction="column">
        <Flex p="md">
          <Button color="red" variant="light">
            Imprimir todos QRCode
          </Button>
        </Flex>
        {tablesDisplay &&
          tablesDisplay.map((table) => (
            <TableItem key={table.id} table={table} />
          ))}
      </Flex>

      <TableModal openned={tableModal} onClose={() => setTableModal(false)} />
    </>
  )
}

export default AdminTables
