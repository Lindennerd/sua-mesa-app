import { MantineProvider } from '@mantine/core'
import * as theme from 'config/mantine.config'
import { ToastContainer } from 'react-toastify'

import { AuthProvider } from '@redwoodjs/auth'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import { cache } from 'src/lib/cache'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import './scaffold.css'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <MantineProvider theme={theme}>
        <AuthProvider type="dbAuth">
          <RedwoodApolloProvider graphQLClientConfig={{ cache }}>
            <ToastContainer />
            <Routes />
          </RedwoodApolloProvider>
        </AuthProvider>
      </MantineProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
