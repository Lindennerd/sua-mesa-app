import { useState } from 'react'

import { Navbar, NavLink, ScrollArea } from '@mantine/core'
import {
  IconChevronRight,
  IconReceipt,
  IconSettings,
  IconToolsKitchen,
  IconUsers
} from '@tabler/icons'

interface Props {
  opened: boolean
  setMenuOpened: (menu: AdminMenus) => void
}

export enum AdminMenus {
  ORDERS,
  MENU,
  EMPLOYEES,
}

const AdminNavbar = ({ opened, setMenuOpened }: Props) => {
  const [menuSelected, setMenuSelected] = useState<AdminMenus>(
    AdminMenus.ORDERS
  )

  const openMenu = (selected: AdminMenus) => {
    setMenuSelected(selected)
    setMenuOpened(selected)
  }

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        <NavLink
          label="Pedidos"
          icon={<IconReceipt size={20} stroke={1.5} />}
          rightSection={<IconChevronRight size={12} stroke={1.5} />}
          variant="light"
          color="red"
          active={menuSelected === AdminMenus.ORDERS}
          onClick={() => openMenu(AdminMenus.ORDERS)}
        />
        <NavLink
          label="Menu"
          icon={<IconToolsKitchen size={20} stroke={1.5} />}
          variant="light"
          rightSection={<IconChevronRight size={12} stroke={1.5} />}
          color="red"
          active={menuSelected === AdminMenus.MENU}
          onClick={() => openMenu(AdminMenus.MENU)}
        />
        <NavLink
          label="Funcionários"
          icon={<IconUsers size={20} stroke={1.5} />}
          variant="light"
          rightSection={<IconChevronRight size={12} stroke={1.5} />}
          color="red"
          active={menuSelected === AdminMenus.EMPLOYEES}
          onClick={() => openMenu(AdminMenus.EMPLOYEES)}
        />
      </Navbar.Section>

      <Navbar.Section>
        <NavLink
          label="Configurações"
          icon={<IconSettings size={20} stroke={1.5} />}
          variant="light"
          rightSection={<IconChevronRight size={12} stroke={1.5} />}
        />
      </Navbar.Section>
    </Navbar>
  )
}

export default AdminNavbar
