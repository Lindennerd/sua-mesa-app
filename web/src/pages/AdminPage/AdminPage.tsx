import { MetaTags } from '@redwoodjs/web'

const AdminPage = ({ slug }: { slug: String }) => {
  return (
    <>
      <MetaTags title="Admin" description="Admin page" />

      {slug}
    </>
  )
}

export default AdminPage
