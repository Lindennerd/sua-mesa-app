import { Button, TextInput } from '@mantine/core'
import { useEffect, useRef, useState } from 'react'

const CategoryForm = ({
  onSubmit,
}: {
  onSubmit: (category: string) => void

}) => {
  const [category, setCategory] = useState('')
  const categoryRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    categoryRef.current.focus()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(category)
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}
    >
      <TextInput
        label="Nome da Categoria"
        ref={categoryRef}
        value={category ?? ''}
        onChange={(e) => setCategory(e.target.value)}
        tabIndex={0}
      />
      <Button variant="outline" color="red" type="submit">
        Salvar
      </Button>
    </form>
  )
}

export default CategoryForm
