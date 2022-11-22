import { useRestaurantAtom } from 'src/atom/restaurant'
//@ts-expect-error cell cant be found
import RestaurantOrdersCell from 'src/components/Restaurant/RestaurantOrdersCell'

const AdminOrders = () => {
  const [restaurant] = useRestaurantAtom()
  return (
    <>
      <RestaurantOrdersCell restaurantId={restaurant.id} />
    </>
  )
}

export default AdminOrders
