import {
  Button,
  Container,
  createStyles,
  Flex,
  Group,
  Text,
} from '@mantine/core'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'

import RestaurantsCell from 'src/components/RestaurantsCell/RestaurantsCell'

const HomePage = () => {
  const { classes } = useStyles()

  return (
    <>
      <div className={classes.hero}>
        <Group p="sm" align="start" style={{ justifyContent: 'space-between' }}>
          <Group>
            <img src="sua-mesa-logo.png" alt="logo" height="80" />
          </Group>
          <Group>
            <AccountControls />
          </Group>
        </Group>

        <Flex className={classes.heroSection}>
          <Text className={classes.heroTitle}>SUA MESA</Text>
          <Text size="xl" align="center">
            O jeito mais fácil de trazer agilidade no atendimento dos seus
            clientes
          </Text>
        </Flex>
      </div>

      <Container>
        <RestaurantsCell />
      </Container>
    </>
  )
}

const useStyles = createStyles((theme) => ({
  hero: {
    backgroundColor: theme.colors.red[7],
    color: 'white',
  },
  heroTitle: {
    fontSize: '5em',
    textAlign: 'center',
  },
  heroSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    justifyItems: 'center',
    padding: 'lg',
  },
}))

const AccountControls = () => {
  const { currentUser, logOut } = useAuth()

  return currentUser ? (
    <Button
      variant="subtle"
      style={{ color: 'white' }}
      onClick={() => logOut()}
    >
      Sair
    </Button>
  ) : (
    <>
      <Button
        variant="subtle"
        style={{ color: 'white' }}
        onClick={() => navigate(routes.login())}
      >
        Login
      </Button>
      <Button
        variant="outline"
        color="yellow"
        style={{ color: 'yellow' }}
        onClick={() => navigate(routes.signup())}
      >
        Registre-se
      </Button>
    </>
  )
}

export default HomePage
