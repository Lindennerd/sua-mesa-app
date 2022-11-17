import { Modal } from "@mantine/core"
import { User } from "types/graphql"
import { RegisterForm } from "../User/RegisterForm"

interface Props {
  openned: boolean,
  onClose: () => void
}

export const EmployeeModal = ({openned, onClose} : Props) => {

  function handleSubmit(user: User) {

  }

  return <Modal opened={openned} onClose={onClose} title="Registro de Funcionário">
    <RegisterForm onSubmit={handleSubmit} />
  </Modal>
}
