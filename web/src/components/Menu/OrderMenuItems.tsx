import { Container } from '@mantine/core'
import { MenuItem } from 'types/graphql'

interface Props {
  menuItems: MenuItem[]
}

const OrderMenuItems = ({ menuItems }: Props) => {
  return (
    <Container mt="md">
      {menuItems && menuItems.map((m) => <div key={m.id}>{m.name}</div>)}
    </Container>
  )
}

export default OrderMenuItems
