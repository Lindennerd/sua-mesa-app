import { Modal } from '@mantine/core'
import { RestaurantUser } from 'types/graphql'

import RegisterForm from '../User/RegisterForm'

interface Props {
  openned: boolean
  onClose: () => void
  onSignUp: (user: RestaurantUser) => void
}

export const EmployeeModal = ({ openned, onClose, onSignUp }: Props) => {
  function handleSignUp(user: RestaurantUser) {
    onSignUp(user)
    onClose()
  }

  return (
    <Modal
      size="auto"
      opened={openned}
      onClose={onClose}
      title="Registro de Funcionário"
    >
      <RegisterForm onSignUp={handleSignUp} />
    </Modal>
  )
}
