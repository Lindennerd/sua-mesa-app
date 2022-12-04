import { Container, createStyles, Flex, Group, Text } from '@mantine/core'

import { useAuth } from '@redwoodjs/auth'

const HomePage = () => {
  const { logOut, currentUser } = useAuth()
  const { classes } = useStyles()

  return (
    <>
      <div className={classes.hero}>
        <Container>
          <Group>
            <img src="sua-mesa-logo.png" alt="logo" height="150" />
          </Group>
        </Container>

        <Flex className={classes.heroSection}>
          <Text className={classes.heroTitle}>SUA MESA</Text>
          <Text size="xl" align="center">
            O jeito mais fácil de trazer agilidade no atendimento dos seus
            clientes
          </Text>
        </Flex>
      </div>
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

export default HomePage
