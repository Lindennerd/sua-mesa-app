// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Route, Router, Set } from '@redwoodjs/router'
import AdminPageLayout from './layouts/AdminPageLayout/AdminPageLayout'
import LandingPageLayout from './layouts/LandingPageLayout/LandingPageLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={LandingPageLayout}>
        <Route path="/" page={HomePage} name="home" />
      </Set>
      <Set private unauthenticated="home">
        <Set wrap={AdminPageLayout}>
          <Route path="/admin/{slug:String}" page={AdminPage} name="admin" />
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
