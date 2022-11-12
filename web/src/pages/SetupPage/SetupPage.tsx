import { createStyles } from '@mantine/core'
import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'
import RestaurantForm from 'src/components/RestaurantForm/RestaurantForm'

const SetupPage = () => {
  const { currentUser } = useAuth()
  const { classes } = useStyles()

  function saveRestaurantInfo(info) {
    console.log(info)
  }

  return (
    <main className={classes.layout}>
      <MetaTags title="Setup" description="Setup page" />
      <header className={classes.header}>
        <h1>Bem vindo {currentUser?.name}</h1>
        <p>
          Para iniciar, precisamos de algumas informações sobre o seu
          estabelecimento
        </p>
      </header>
      <section className={classes.content}>
        <RestaurantForm onSubmit={saveRestaurantInfo} />
      </section>
    </main>
  )
}

const useStyles = createStyles(() => ({
  layout: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: "3em"
  },
  content: {
    width: "100%",
    maxWidth: "30em"
  },
  header: {
    alignContent: "center"
  }
}))

export default SetupPage
