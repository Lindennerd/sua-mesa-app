import { Modal } from '@mantine/core'

import RegisterForm from '../User/RegisterForm'

interface Props {
  openned: boolean
  onClose: () => void
}

export const EmployeeModal = ({ openned, onClose }: Props) => {
  return (
    <Modal opened={openned} onClose={onClose} title="Registro de Funcionário">
      <RegisterForm />
    </Modal>
  )
}
