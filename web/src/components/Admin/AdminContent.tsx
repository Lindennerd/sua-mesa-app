import { AdminMenus } from './AdminNavbar'
import AdminOrders from './AdminOrders'

interface Props {
  menuItems: React.ReactNode
  employees: React.ReactNode
  tables: React.ReactNode
  menu: AdminMenus
}

const AdminContent = ({ menu, menuItems, employees, tables }: Props) => {
  switch (menu) {
    case AdminMenus.EMPLOYEES:
      return <>{employees}</>
    case AdminMenus.MENU:
      return <>{menuItems}</>
    case AdminMenus.ORDERS:
      return <AdminOrders />
    case AdminMenus.TABLES:
      return <>{tables}</>
  }
}

export default AdminContent
