import { createStyles, Loader, Title } from '@mantine/core'
import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import RestaurantForm from 'src/components/Restaurant/RestaurantForm'
import { CREATE_RESTAURANT_MUTATION } from 'src/graphql/restaurant'
import { supabase } from 'src/lib/supabase'
import { CreateRestaurantInput, CreateRestautant } from 'types/graphql'

const SetupPage = () => {
  const { currentUser } = useAuth()
  const { classes } = useStyles()
  const [createRestaurant, { loading, error }] = useMutation<CreateRestautant>(
    CREATE_RESTAURANT_MUTATION
  )

  async function saveRestaurantInfo(info: CreateRestaurantInput) {
    const restaurantData = await createRestaurant({
      variables: {
        input: {
          name: info.name,
          address: info.address,
          phone: info.phone,
        },
      },
    })

    await supabase.storage.createBucket(
      restaurantData.data.createRestaurant.slug,
      { public: true }
    )

    navigate(routes.admin({ slug: restaurantData.data.createRestaurant.slug }))
  }

  if (loading)
    return (
      <main className={classes.layout}>
        <p className={classes.subtitle}>Salvando ...</p>
        <Loader />
      </main>
    )

  return (
    <main className={classes.layout}>
      <MetaTags title="Setup" description="Setup page" />
      <header className={classes.header}>
        <Title style={{ textAlign: 'center' }}>
          Bem vindo {currentUser?.name}! 👋
        </Title>
        <p className={classes.subtitle}>
          Antes de começar, precisamos de algumas informações sobre o seu
          estabelecimento.
        </p>
      </header>
      <section className={classes.content}>
        <div style={{ padding: '2em' }}>
          <RestaurantForm onSubmit={saveRestaurantInfo} />
        </div>
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
    gap: '3em',
    backgroundColor: '#e72020',
  },
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  header: {
    alignContent: 'center',
    color: 'white',
    padding: '4em',
    textJustify: 'auto',
  },
  subtitle: {
    fontSize: '1.5em',
    textAlign: 'center',
    color: 'white',
    textJustify: 'inter-word',
  },
}))

export default SetupPage
