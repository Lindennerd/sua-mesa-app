import { MetaTags } from '@redwoodjs/web'

//@ts-expect-error redwood cell cant be found
import RestaurantCell from 'src/components/Restaurant/RestaurantCell'

const AdminPage = ({ slug }: { slug: string }) => {
  return (
    <>
      <MetaTags title="Admin" description="Admin page" />
      <RestaurantCell slug={slug} />
    </>
  )
}

export default AdminPage
