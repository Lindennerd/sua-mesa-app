import { Category, MenuItem } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'

import { OrdersPageHeader } from '../Order/OrdersPageHeader'

interface Props {
  name: string
  menuItems: MenuItem[]
  categories: Category[]
}

const RestaurantOrders = ({ menuItems, categories, name }: Props) => {
  const { currentUser } = useAuth()

  return (
    <>
      <OrdersPageHeader
        user={{
          image: '',
          name: currentUser?.name,
        }}
        tabs={categories.map((c) => c.name)}
        name={name}
      />
    </>
  )
}

export default RestaurantOrders
