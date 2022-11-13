import { AppShell, useMantineTheme } from '@mantine/core'
import { useState } from 'react'
import AdminContent from '../Admin/AdminContent'
import AdminEmployees from '../Admin/AdminEmployees'
import AdminHeader from '../Admin/AdminHeader'
import AdminMenuItems from '../Admin/AdminMenuItems'
import AdminNavbar, { AdminMenus } from '../Admin/AdminNavbar'

interface RestaurantAdminProps {
  name: string,
  menuItems: any[],
  employees: any[]
}

const RestaurantAdmin = ({ name, menuItems, employees }: RestaurantAdminProps) => {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const [menu, setMenu] = useState<AdminMenus>(AdminMenus.ORDERS)

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <AdminNavbar
          opened={opened}
          setMenuOpened={(menu) => {
            setMenu(menu)
          }}
        />
      }
      header={<AdminHeader opened={opened} setOpened={setOpened} name={name} />}
    >
      <AdminContent
        menu={menu}
        employees={<AdminEmployees employees={employees} />}
        menuItems={<AdminMenuItems menuItems={menuItems} />}
      />
    </AppShell>
  )
}

export default RestaurantAdmin
