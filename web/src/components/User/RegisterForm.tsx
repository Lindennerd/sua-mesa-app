import { useState } from 'react'

import { Button, TextInput } from '@mantine/core'
import { toast } from 'react-toastify'
import { RestaurantUser } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'

import { useRestaurantAtom } from 'src/atom/restaurant'

type RegisterForm = {
  name: string
  username: string
  password: string
  passwordConfirmation: string
}

interface Props {
  onSignUp: (user: RestaurantUser) => void
}

const RegisterForm = ({ onSignUp }: Props) => {
  const { signUp } = useAuth()
  const [restaurant] = useRestaurantAtom()
  const [registerForm, setRegisterForm] = useState<RegisterForm>()

  async function handleSubmit(e) {
    e.preventDefault()

    if (registerForm.password !== registerForm.passwordConfirmation) {
      toast.warn('Confirmação de senha inválida')
    }

    const created = await signUp({
      ...registerForm,
      role: 'EMPLOYEE',
      restaurant: restaurant.id,
    })

    onSignUp({
      restaurantId: restaurant.id,
      //@ts-expect-error optimistic update
      user: {
        id: created.id,
        name: registerForm.name,
        email: registerForm.username,
      },
    })
  }

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}
      onSubmit={handleSubmit}
    >
      <TextInput
        onChange={(e) =>
          setRegisterForm((form) => ({ ...form, name: e.target.value }))
        }
        value={registerForm?.name ?? ''}
        label="Nome"
        required
      />
      <TextInput
        onChange={(e) =>
          setRegisterForm((form) => ({ ...form, username: e.target.value }))
        }
        value={registerForm?.username ?? ''}
        label="Email"
        type="email"
        required
      />
      <TextInput
        onChange={(e) =>
          setRegisterForm((form) => ({ ...form, password: e.target.value }))
        }
        value={registerForm?.password ?? ''}
        label="Senha"
        type="password"
        required
      />
      <TextInput
        onChange={(e) =>
          setRegisterForm((form) => ({
            ...form,
            passwordConfirmation: e.target.value,
          }))
        }
        value={registerForm?.passwordConfirmation ?? ''}
        label="Confirmação de Senha"
        type="password"
        required
      />
      <Button type="submit">Registrar</Button>
    </form>
  )
}

export default RegisterForm
