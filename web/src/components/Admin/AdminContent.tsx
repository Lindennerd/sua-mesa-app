import { AdminMenus } from "./AdminNavbar";
import AdminOrders from "./AdminOrders";

interface Props {
  menuItems: React.ReactNode
  employees: React.ReactNode
  menu: AdminMenus
}

const AdminContent = ({menu, menuItems, employees}: Props) => {
  switch (menu) {
    case AdminMenus.EMPLOYEES:
      return <>{employees}</>
    case AdminMenus.MENU:
      return <>{menuItems}</>
    case AdminMenus.ORDERS:
      return  <AdminOrders />
  }
}

export default AdminContent;
