import { createStyles } from '@mantine/core';
import { useAuth } from '@redwoodjs/auth';
import { MetaTags } from '@redwoodjs/web';

const SetupPage = () => {
  const { currentUser } = useAuth();
  const { classes } = useStyles();

  return (
    <main className={classes.layout}>
      <MetaTags title="Setup" description="Setup page" />
      <h1>Bem vindo {currentUser?.name}</h1>
      <p>Para iniciar, precisamos de algumas informações sobre o seu estabelecimento</p>

    </main>
  )
}

const useStyles = createStyles(() => ({
  layout: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
}))

export default SetupPage
