import { MetaTags } from '@redwoodjs/web'

import CustomerOrdersCell from 'src/components/Customer/CustomerOrdersCell'

const CustomerOrdersPage = ({ slug }: { slug: string }) => {
  return (
    <>
      <MetaTags title="Meus Pedidos" description="Pedidos do cliente" />
      <CustomerOrdersCell restaurantSlug={slug} />
    </>
  )
}

export default CustomerOrdersPage
