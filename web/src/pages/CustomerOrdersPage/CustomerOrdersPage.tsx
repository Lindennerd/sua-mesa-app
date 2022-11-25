import { MetaTags } from '@redwoodjs/web'

import CustomerOrdersCell from 'src/components/CustomerOrdersCell'

const CustomerOrdersPage = ({ slug }: { slug: string }) => {
  return (
    <>
      <MetaTags title="Meus Pedidos" description="Pedidos do cliente" />

      <h1>CustomerOrdersPage</h1>
      <CustomerOrdersCell restaurantSlug={slug} />
    </>
  )
}

export default CustomerOrdersPage
