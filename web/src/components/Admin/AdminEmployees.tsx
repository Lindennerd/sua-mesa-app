import { useEffect, useState } from 'react'

import { ActionIcon, Flex, Tooltip } from '@mantine/core'
import { IconPlus } from '@tabler/icons'
import { RestaurantUser } from 'types/graphql'

import AdminEmployeeView from '../Employee/AdminEmployeeView'
import { EmployeeModal } from '../Employee/EmployeeModal'
import AdminTopNav from './AdminTopNav'

const AdminEmployees = ({ employees }: { employees: RestaurantUser[] }) => {
  const [employeesDisplay, setEmployeesDisplay] = useState(employees)
  const [registerModal, setRegisterModal] = useState(false)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    setEmployeesDisplay(employees)
  }, [employees])

  useEffect(() => {
    setEmployeesDisplay((_) =>
      employees.filter((employee) =>
        employee.user.name
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase())
      )
    )
  }, [filter, employees])

  function onSignUp(user: RestaurantUser) {
    setEmployeesDisplay((employees) => employees.concat(user))
  }

  return (
    <>
      <AdminTopNav
        title="Administração de Funcionários"
        filter={filter}
        onFilter={(filter) => setFilter(filter)}
        navMenu={
          <Tooltip label="Adicionar Funcionário">
            <ActionIcon onClick={() => setRegisterModal(true)}>
              <IconPlus stroke={2} />
            </ActionIcon>
          </Tooltip>
        }
      />

      <Flex direction="column" mt="sm">
        {employeesDisplay &&
          employeesDisplay.map((user, index) => (
            <AdminEmployeeView key={index} restaurantUser={user} />
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

export default AdminEmployees
