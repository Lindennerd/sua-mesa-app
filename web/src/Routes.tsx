// In this file, all Page components from 'src/pages` are auto-imported. Nested

import { LoadingOverlay } from '@mantine/core'

import { Route, Router, Set } from '@redwoodjs/router'

import AdminPageLayout from './layouts/AdminPageLayout/AdminPageLayout'
import LandingPageLayout from './layouts/LandingPageLayout/LandingPageLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/meus-pedidos/{slug:String}" page={CustomerOrdersPage} name="customerOrders" />
      <Route path="/pedidos/{slug:String}" page={OrdersPage} name="orders" />
      <Route path="/pedidos/{slug:String}/table/{id:int}" page={OrdersPage} name="orders" />
      <Set wrap={LandingPageLayout}>
        <Route path="/" page={HomePage} name="home" prerender />
      </Set>
      <Set private unauthenticated="home" whileLoadingAuth={() => <LoadingOverlay visible={true} />}>
        <Set wrap={AdminPageLayout} whileLoadingAuth={() => <LoadingOverlay visible={true} />}>
          <Route path="/admin/{slug:String}" page={AdminPage} name="admin" whileLoadingPage={() => <LoadingOverlay visible={true} />} />
        </Set>
        <Route path="/setup" page={SetupPage} name="setup" />
      </Set>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
