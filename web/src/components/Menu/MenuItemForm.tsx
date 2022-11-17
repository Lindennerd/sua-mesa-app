import { ChangeEvent, useRef, useState } from 'react'

import {
  Button,
  createStyles,
  Flex,
  NumberInput,
  Select,
  Textarea,
  TextInput,
  Tooltip
} from '@mantine/core'
import { IconCoin } from '@tabler/icons'
import { Category, MenuItem } from 'types/graphql'

interface Props {
  categories: Category[]
  item?: MenuItem
  onSubmit: (item: MenuItem, file: FileList) => void
}

const MenuItemForm = ({ categories, item, onSubmit }: Props) => {
  const { classes } = useStyles()
  const [menuItemForm, setMenuItemForm] = useState<MenuItem | undefined>(item)
  const [image, setImage] = useState<string>(
    item?.image ?? 'https://api.lorem.space/image/burger?w=300&h=300'
  )
  const imageInput = useRef<HTMLInputElement>()

  function handleClickImage() {
    if (imageInput) {
      imageInput.current.click()
    }
  }

  function handleSelectImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files.length) {
      const imageUrl = URL.createObjectURL(e.target.files[0])
      setImage(imageUrl)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit(menuItemForm, imageInput.current.files)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap="md">
        <Flex align={'center'} justify={'center'}>
          <Tooltip label="Alterar imagem">
            <a
              className={classes.uploadImage}
              onClick={() => handleClickImage()}
            >
              <img
                width="auto"
                height={160}
                className={classes.image}
                src={image}
                alt=""
              />
            </a>
          </Tooltip>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={imageInput}
            onChange={handleSelectImage}
          />
        </Flex>
        <TextInput
          tabIndex={0}
          required
          placeholder="Nome"
          value={menuItemForm?.name ?? ''}
          onChange={(e) =>
            setMenuItemForm((form) => ({ ...form, name: e.target.value }))
          }
        />
        <Select
          required
          searchable
          nothingFound="Nenhuma categoria encontrada"
          placeholder="Categoria"
          value={menuItemForm?.categoryId?.toString() ?? ''}
          onChange={(value) =>
            setMenuItemForm((form) => ({
              ...form,
              categoryId: parseInt(value),
            }))
          }
          data={categories.map((c) => {
            return {
              value: c.id.toString(),
              label: c.name,
            }
          })}
        />
        <Textarea
          required
          placeholder="Descrição"
          value={menuItemForm?.description ?? ''}
          onChange={(e) =>
            setMenuItemForm((form) => ({
              ...form,
              description: e.target.value,
            }))
          }
        />
        <NumberInput
          required
          icon={<IconCoin />}
          decimalSeparator=","
          precision={2}
          step={0.5}
          min={0}
          placeholder="Preço"
          value={menuItemForm?.price}
          onChange={(value) =>
            setMenuItemForm((form) => ({ ...form, price: value }))
          }
        />
        <Button variant="outline" color="red" type="submit">
          Salvar
        </Button>
      </Flex>
    </form>
  )
}

const useStyles = createStyles({
  uploadImage: {
    cursor: 'pointer',
  },
  image: {
    borderRadius: '15%',
    ':hover': {
      filter: 'brightness(70%)',
    },
  },
})

export default MenuItemForm
