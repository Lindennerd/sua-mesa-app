import { useState } from 'react'

import { AppShell } from '@mantine/core'

import AdminContent from '../Admin/AdminContent'
import AdminEmployees from '../Admin/AdminEmployees'
import AdminHeader from '../Admin/AdminHeader'
import AdminMenuItems from '../Admin/AdminMenuItems'
import AdminNavbar, { AdminMenus } from '../Admin/AdminNavbar'
import AdminTables from '../Admin/AdminTables'

interface RestaurantAdminProps {
  name: string
  menuItems: any[]
  employees: any[]
  categories: any[]
  tables: any[]
}

const RestaurantAdmin = ({
  name,
  menuItems,
  employees,
  categories,
  tables,
}: RestaurantAdminProps) => {
  const [opened, setOpened] = useState(false)
  const [menu, setMenu] = useState<AdminMenus>(AdminMenus.ORDERS)

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      padding={1}
      navbar={
        <AdminNavbar
          opened={opened}
          setMenuOpened={(menu) => {
            setMenu(menu)
            setOpened(false)
          }}
        />
      }
      header={<AdminHeader opened={opened} setOpened={setOpened} name={name} />}
    >
      <AdminContent
        menu={menu}
        employees={<AdminEmployees employees={employees} />}
        tables={<AdminTables tables={tables} />}
        menuItems={
          <AdminMenuItems menuItems={menuItems} categories={categories} />
        }
      />
    </AppShell>
  )
}

export default RestaurantAdmin
