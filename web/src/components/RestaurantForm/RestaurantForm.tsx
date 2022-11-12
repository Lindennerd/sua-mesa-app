import { Button, InputBase, TextInput } from '@mantine/core'
import { useState } from 'react'
import { InputMask } from 'react-input-mask'

interface Restaurant {
  name: string
  address: string
  phone: string
}

interface RestaurantFormProps {
  restaurant?: Restaurant
  onSubmit: (form: Restaurant) => void
}

const RestaurantForm = ({ restaurant, onSubmit }: RestaurantFormProps) => {
  const [restaurantForm, setRestaurantForm] = useState<Restaurant>(restaurant)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(restaurantForm)
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
      }}
    >
      <TextInput
        withAsterisk
        label="Nome do Estabelecimento"
        placeholder="O nome do seu estabelecimento"
        value={restaurantForm?.name}
        onChange={(e) =>
          setRestaurantForm((form) => ({ ...form, name: e.target.value }))
        }
      />
      <TextInput
        withAsterisk
        label="Endereço"
        placeholder="O Endereço do seu estabelecimento"
        value={restaurantForm?.address}
        onChange={(e) =>
          setRestaurantForm((form) => ({ ...form, address: e.target.value }))
        }
      />
      <InputBase
        withAsterisk
        label="Telefone"
        placeholder="O Telefone do seu estabelecimento"
        component={InputMask}
        mask="+55 (99) 9999-99999"
        value={restaurantForm?.phone}
        onChange={(e) =>
          setRestaurantForm((form) => ({ ...form, phone: e.target.value }))
        }
      />

      <Button variant="subtle" color="green">
        Salvar
      </Button>
    </form>
  )
}

export default RestaurantForm
