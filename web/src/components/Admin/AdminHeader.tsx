import {
  Burger,
  Header,
  MediaQuery,
  Text,
  useMantineTheme
} from '@mantine/core'

interface Props {
  opened: boolean
  name: string
  setOpened: (opened: boolean) => void
}

const AdminHeader = ({ opened, setOpened, name }: Props) => {
  const theme = useMantineTheme()

  return (
    <Header
      height={{ base: 50, md: 70 }}
      style={{ backgroundColor: theme.colors.red[7], color: 'white' }}
      p="md"
    >
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened(!opened)}
            size="sm"
            color='white'
            mr="xl"
          />
        </MediaQuery>

        <Text>{name.toUpperCase()}</Text>
      </div>
    </Header>
  )
}

export default AdminHeader
