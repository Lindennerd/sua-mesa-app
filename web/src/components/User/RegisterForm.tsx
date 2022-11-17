import { useState } from 'react'

import { Button, TextInput } from '@mantine/core'
import { toast } from 'react-toastify'

import { useAuth } from '@redwoodjs/auth'

type RegisterForm = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

const RegisterForm = () => {
  const [registerForm, setRegisterForm] = useState<RegisterForm>()
  const { signUp } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

    if (registerForm.password !== registerForm.passwordConfirmation) {
      toast.warn('Confirmação de senha inválida')
    }

    await signUp(registerForm)
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
        value={registerForm?.name}
        label="Nome"
        required
      />
      <TextInput
        onChange={(e) =>
          setRegisterForm((form) => ({ ...form, email: e.target.value }))
        }
        value={registerForm?.email}
        label="Email"
        type="email"
        required
      />
      <TextInput
        onChange={(e) =>
          setRegisterForm((form) => ({ ...form, password: e.target.value }))
        }
        value={registerForm?.password}
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
        value={registerForm?.passwordConfirmation}
        label="Confirmação de Senha"
        type="password"
        required
      />
      <Button type="submit">Registrar</Button>
    </form>
  )
}

export default RegisterForm
