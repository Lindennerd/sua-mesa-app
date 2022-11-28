import { useState } from 'react'

import {
  Avatar,
  Burger,
  Container,
  createStyles,
  Group,
  Menu,
  Navbar,
  NavLink,
  ScrollArea,
  Tabs,
  Text,
  UnstyledButton
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  IconChevronDown,
  IconChevronRight,
  IconInfoCircle,
  IconLogout,
  IconToolsKitchen2
} from '@tabler/icons'

import { navigate, routes } from '@redwoodjs/router'

import { useRestaurantAtom } from 'src/atom/restaurant'

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.colors.red[7],
    color: 'white',
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
    }`,
    position: 'sticky',
    top: 0,
    zIndex: 50,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: 'white',
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.colors.red[8],
    },

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  navbar: {
    position: 'fixed',
    top: '6em',
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: theme.colors.red[8],
  },

  tabsList: {
    borderBottom: '0 !important',
  },

  tab: {
    fontWeight: 600,
    height: 38,
    backgroundColor: 'transparent',
    color: 'white',

    '&:hover': {
      backgroundColor: theme.colors.red[8],
    },

    '&[data-active]': {
      color: theme.black,
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      borderColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[2],
    },
  },
}))

interface HeaderTabsProps {
  user: { name: string; image: string }
  tabs?: {
    label: string
    id: number
  }[]
  name: string
  onSelectcategory?: (category: number) => void
}

export function OrdersPageHeader({
  user,
  tabs,
  name,
  onSelectcategory,
}: HeaderTabsProps) {
  const { classes, cx } = useStyles()
  const [opened, { toggle }] = useDisclosure(false)
  const [userMenuOpened, setUserMenuOpened] = useState(false)
  const [restaurant] = useRestaurantAtom()

  const items =
    tabs &&
    tabs.map((tab) => (
      <Tabs.Tab
        value={tab.label}
        key={tab.id}
        onClick={() => onSelectcategory(tab.id)}
      >
        {tab.label}
      </Tabs.Tab>
    ))

  function gotoCustomerOdersPage() {
    navigate(routes.customerOrders({ slug: restaurant.slug }))
  }

  return (
    <>
      <div className={classes.header}>
        <Container className={classes.mainSection}>
          <Group position="apart">
            <Text size="lg" weight="bolder">
              {name?.toUpperCase()}
            </Text>
            <Burger
              opened={opened}
              onClick={toggle}
              className={classes.burger}
              size="sm"
              color="white"
            />
            <Menu
              width={260}
              position="bottom-end"
              transition="pop-top-right"
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, {
                    [classes.userActive]: userMenuOpened,
                  })}
                >
                  <Group spacing={7}>
                    <Avatar
                      src={user.image}
                      alt={user.name}
                      radius="xl"
                      size={20}
                    />
                    <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                      {user.name}
                    </Text>
                    <IconChevronDown size={12} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item icon={<IconInfoCircle size={15} stroke={1.5} />}>
                  Informações de usuário
                </Menu.Item>
                <Menu.Item
                  onClick={() => gotoCustomerOdersPage()}
                  icon={<IconToolsKitchen2 size={15} stroke={1.5} />}
                >
                  Meus Pedidos
                </Menu.Item>
                <Menu.Item
                  color="red"
                  icon={<IconLogout size={15} stroke={1.5} />}
                >
                  Sair
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Container>
        {tabs && (
          <Container>
            <Tabs
              defaultValue={tabs[0].label}
              variant="outline"
              classNames={{
                tabsList: classes.tabsList,
                tab: classes.tab,
              }}
            >
              <Tabs.List>{items}</Tabs.List>
            </Tabs>
          </Container>
        )}
      </div>

      <Navbar
        className={classes.navbar}
        p="md"
        hiddenBreakpoint="lg"
        hidden={!opened}
        width={{ sm: 200, lg: 300 }}
      >
        <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
          <NavLink
            label="Informações do Usuário"
            icon={<IconInfoCircle size={20} stroke={1.5} />}
            variant="light"
            rightSection={<IconChevronRight size={12} stroke={1.5} />}
            color="red"
          />
          <NavLink
            label="Meus Pedidos"
            icon={<IconToolsKitchen2 size={20} stroke={1.5} />}
            variant="light"
            rightSection={<IconChevronRight size={12} stroke={1.5} />}
            color="red"
          />
          <NavLink
            label="Sair"
            icon={<IconLogout size={20} stroke={1.5} />}
            variant="light"
            rightSection={<IconChevronRight size={12} stroke={1.5} />}
            color="red"
          />
        </Navbar.Section>
      </Navbar>
    </>
  )
}
