import { useState } from 'react'

import { Button, Flex, TextInput } from '@mantine/core'

interface Props {
  onSubmit: (tableName: string) => void
}

const TableForm = ({ onSubmit }: Props) => {
  const [tableName, setTableName] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(tableName)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap="md">
        <TextInput
          placeholder="Nome da Mesa"
          label="Nome"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
        />
        <Button type="submit">Salvar</Button>
      </Flex>
    </form>
  )
}

export default TableForm
