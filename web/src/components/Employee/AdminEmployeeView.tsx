import { useState } from 'react'

import {
  ActionIcon,
  Button,
  createStyles,
  Flex,
  LoadingOverlay,
  Menu,
  Modal,
  Text
} from '@mantine/core'
import { IconDotsVertical, IconTrash } from '@tabler/icons'
import { RestaurantUser } from 'types/graphql'

import { useEmployeeMutation } from 'src/hooks/useEmployeeMutation'

interface Props {
  restaurantUser: RestaurantUser
}

const AdminEmployeeView = ({ restaurantUser }: Props) => {
  const { classes } = useClasses()
  const [modalEmployeeOpen, setModalDeleteEmployeeOpen] = useState(false)

  const { remove } = useEmployeeMutation()
  const deleteMutation = remove({
    onCompleted() {
      setModalDeleteEmployeeOpen(false)
    },
  })

  function removeEmployee() {}

  return (
    <>
      <Flex className={classes.employeeItem} p="sm" justify="space-between">
        <Text>Funcionário: {restaurantUser.user.name}</Text>
        <Menu transition="slide-down" transitionDuration={150}>
          <Menu.Target>
            <ActionIcon>
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={() => setModalDeleteEmployeeOpen(true)}
              icon={<IconTrash size={14} />}
              color="red"
            >
              Excluir
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>

      <Modal
        opened={modalEmployeeOpen}
        onClose={() => setModalDeleteEmployeeOpen(false)}
        title={`Deletar ${restaurantUser.user.name}`}
        size="lg"
      >
        <LoadingOverlay visible={deleteMutation.loading} />
        <Text align="center">
          Tem certeza que deseja remover o funcionário
          {restaurantUser.user.name} ?
        </Text>
        <Flex gap="md" justify="space-between" mt="lg">
          <Button onClick={() => removeEmployee()} color="red">
            Sim, eu tenho certeza
          </Button>
          <Button onClick={() => setModalDeleteEmployeeOpen(false)}>
            Não, eu quero cancelar essa ação
          </Button>
        </Flex>
      </Modal>
    </>
  )
}

const useClasses = createStyles({
  employeeItem: {
    borderBottom: '1px solid #eee',
  },
})

export default AdminEmployeeView
