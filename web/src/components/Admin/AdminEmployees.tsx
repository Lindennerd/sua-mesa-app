import { useState } from 'react'

import {
  ActionIcon,
  createStyles,
  Group,
  Text,
  TextInput,
  Tooltip
} from '@mantine/core'
import { IconFilter, IconPlus } from '@tabler/icons'
import { RestaurantUser } from 'types/graphql'

import { EmployeeModal } from '../Employee/EmployeeModal'

const AdminEmployees = ({ employees }: { employees: RestaurantUser[] }) => {
  const { classes } = useClasses()
  const [registerModal, setRegisterModal] = useState(false)

  return (
    <>
      <Group align={'center'} className={classes.topNav}>
        <Text>ADMINISTRAÇÃO DE FUNCIONÁRIOS</Text>
        <TextInput
          placeholder="Filtrar funcionários"
          icon={<IconFilter />}
          style={{ flex: '1' }}
          // value={filter}
          // onChange={(e) => setFilter(e.target.value)}
        />
        <Tooltip label="Adicionar Funcionário">
          <ActionIcon onClick={() => setRegisterModal(true)}>
            <IconPlus stroke={2} />
          </ActionIcon>
        </Tooltip>
      </Group>

      <Group>
        {employees && employees.map((e) => <div key={e.id}>{e.user.name}</div>)}
      </Group>

      <EmployeeModal
        openned={registerModal}
        onClose={() => setRegisterModal(false)}
      />
    </>
  )
}

const useClasses = createStyles({
  topNav: {
    borderBottom: '.5px solid #eee',
    width: '100%',
    padding: '1em',
    justifyContent: 'space-between',
    position: 'sticky',
    top: '4.4em',
    backgroundColor: 'white',
    zIndex: 100,
  },
  content: {},
})

export default AdminEmployees
