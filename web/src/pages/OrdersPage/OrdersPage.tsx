import { useEffect } from 'react'

import { MetaTags } from '@redwoodjs/web'

// eslint-disable-next-line import/order
import { useTableAtom } from 'src/atom/table'

//@ts-expect-error redwood cell cant be found
import RestaurantCell from 'src/components/Restaurant/RestaurantCell'

const OrdersPage = ({ slug, id: tableId }: { slug: string; id?: number }) => {
  const [_, setTable] = useTableAtom()

  useEffect(() => {
    if (tableId) setTable(tableId)
  }, [setTable, tableId])

  return (
    <>
      <MetaTags title="Pedidos" description="Orders page" />

      <RestaurantCell slug={slug} />
    </>
  )
}

export default OrdersPage
