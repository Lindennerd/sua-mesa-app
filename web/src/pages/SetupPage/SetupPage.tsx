import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const SetupPage = () => {
  return (
    <>
      <MetaTags title="Setup" description="Setup page" />

      <h1>SetupPage</h1>
      <p>
        Find me in <code>./web/src/pages/SetupPage/SetupPage.tsx</code>
      </p>
      <p>
        My default route is named <code>setup</code>, link to me with `
        <Link to={routes.setup()}>Setup</Link>`
      </p>
    </>
  )
}

export default SetupPage
