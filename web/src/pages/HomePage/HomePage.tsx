import { useAuth } from '@redwoodjs/auth';
import { navigate, routes } from '@redwoodjs/router';
import { MetaTags } from '@redwoodjs/web';


const HomePage = () => {

  const { logOut, currentUser } = useAuth();

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      Landing Page
      <p>{ JSON.stringify(currentUser) }</p>
      <button onClick={(e) => navigate(routes.login())}>Sign In</button>
      <button onClick={(e) => logOut()}>Sign Out</button>
    </>
  )
}

export default HomePage
