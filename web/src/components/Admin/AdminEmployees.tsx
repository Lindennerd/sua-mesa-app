import { useEffect, useState } from 'react'

import {
  ActionIcon,
  createStyles,
  Flex,
  Group,
  Text,
  TextInput,
  Tooltip
} from '@mantine/core'
import { IconFilter, IconPlus } from '@tabler/icons'
import { RestaurantUser } from 'types/graphql'

import AdminEmployeeView from '../Employee/AdminEmployeeView'
import { EmployeeModal } from '../Employee/EmployeeModal'

const AdminEmployees = ({ employees }: { employees: RestaurantUser[] }) => {
  const { classes } = useClasses()
  const [employeesDisplay, setEmployeesDisplay] = useState(employees)
  const [registerModal, setRegisterModal] = useState(false)

  useEffect(() => {
    setEmployeesDisplay(employees)
  }, [employees])

  function onSignUp(user: RestaurantUser) {
    setEmployeesDisplay((employees) => employees.concat(user))
  }

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

      <Flex direction="column">
        {employeesDisplay &&
          employeesDisplay.map((user) => (
            <AdminEmployeeView key={user.id} restaurantUser={user} />
          ))}
      </Flex>

      <EmployeeModal
        openned={registerModal}
        onSignUp={onSignUp}
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
    zIndex: 50,
  },
  content: {},
})

export default AdminEmployees
