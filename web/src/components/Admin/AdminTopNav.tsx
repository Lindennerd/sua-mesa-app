import { createStyles, Flex, Group, Text, TextInput } from '@mantine/core'
import { IconFilter } from '@tabler/icons'

interface Props {
  title: string
  filter: string
  onFilter: (filter: string) => void
  navMenu: React.ReactNode
}

const AdminTopNav = ({ title, filter, onFilter, navMenu }: Props) => {
  const { classes } = useClasses()

  return (
    <Group align={'center'} className={classes.topNav}>
      <Text>{title.toUpperCase()}</Text>
      <Flex
        align="center"
        justify="space-between"
        gap="sm"
        style={{ flex: '1' }}
      >
        <TextInput
          placeholder="Filtrar items"
          icon={<IconFilter />}
          style={{ flex: '1' }}
          value={filter}
          onChange={(e) => onFilter(e.target.value)}
        />
        {navMenu}
      </Flex>
    </Group>
  )
}

const useClasses = createStyles({
  topNav: {
    borderBottom: '.5px solid #eee',
    width: '100%',
    padding: '1em',
    justifyContent: 'space-between',
    position: 'sticky',
    top: '3em',
    backgroundColor: 'white',
    zIndex: 50,
  },
})

export default AdminTopNav
