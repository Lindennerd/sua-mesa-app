import { render } from '@redwoodjs/testing/web'

import SetupPage from './SetupPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SetupPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SetupPage />)
    }).not.toThrow()
  })
})
