import { MetaTags } from '@redwoodjs/web';
import { useState } from 'react';
import RestaurantCell from "src/components/Restaurant/RestaurantCell";

const AdminPage = ({ slug }: { slug: string }) => {
    const [opened, setOpened] = useState(false)
  return (
    <>
      <MetaTags title="Admin" description="Admin page" />
      <RestaurantCell slug={slug} />
    </>
  )
}

export default AdminPage
