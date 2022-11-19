import { MetaTags } from '@redwoodjs/web';

//@ts-expect-error redwood cell cant be found
import RestaurantCell from 'src/components/Restaurant/RestaurantCell';

const OrdersPage = ({ slug, id }: { slug: string; id?: number }) => {
  return (
    <>
      <MetaTags title="Pedidos" description="Orders page" />

      <RestaurantCell slug={slug} />
    </>
  )
}

export default OrdersPage
