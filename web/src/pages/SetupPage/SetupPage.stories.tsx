import type { ComponentMeta } from '@storybook/react'

import SetupPage from './SetupPage'

export const generated = () => {
  return <SetupPage />
}

export default {
  title: 'Pages/SetupPage',
  component: SetupPage,
} as ComponentMeta<typeof SetupPage>
