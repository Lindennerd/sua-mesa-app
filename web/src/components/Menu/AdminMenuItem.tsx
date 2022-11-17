import { useState } from 'react'

import {
  ActionIcon,
  Badge,
  Button,
  createStyles,
  Flex,
  Image,
  LoadingOverlay,
  Menu,
  Modal,
  Text,
  Title
} from '@mantine/core'
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons'
import { Category, MenuItem } from 'types/graphql'

import { useMenuItemMutation } from 'src/hooks/useMenuItemMutation'

import MenuItemModal from './MenuItemModal'

interface Props {
  menuItem: MenuItem
  categories: Category[]
}

export const AdminMenuItem = ({ menuItem, categories }: Props) => {
  const { classes } = useClasses()
  const [modalMenuItemOpen, setModalMenuItemOpen] = useState(false)
  const [modalDeleteMenuItemOpen, setModalDeleteMenuItemOpen] = useState(false)
  const { remove } = useMenuItemMutation()

  const deleteMutation = remove({
    onCompleted() {
      setModalDeleteMenuItemOpen(false)
    },
  })

  function removeItem() {
    deleteMutation.deleteMenuItem({
      variables: {
        deleteMenuItemId: menuItem.id,
      },
    })
  }

  return (
    <>
      <Flex p="sm" justify="space-between" className={classes.menuItem}>
        <Flex p="sm" gap="sm" align="center">
          <div style={{ borderRadius: '20' }}>
            <Image
              src={menuItem.image}
              width="auto"
              height={100}
              alt={menuItem.name}
            />
          </div>
          <Flex direction="column" gap="sm">
            <div>
              <Badge variant="light" color="green">
                R$ {menuItem.price}
              </Badge>
              <Badge>{menuItem.category.name}</Badge>
            </div>
            <Title weight={100}>{menuItem.name}</Title>
            <Text weight={100}>{menuItem.description}</Text>
          </Flex>
        </Flex>
        <Menu transition="slide-down" transitionDuration={150}>
          <Menu.Target>
            <ActionIcon>
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={() => setModalMenuItemOpen(true)}
              icon={<IconEdit size={14} />}
            >
              Editar
            </Menu.Item>
            <Menu.Item
              onClick={() => setModalDeleteMenuItemOpen(true)}
              color="red"
              icon={<IconTrash size={14} />}
            >
              Excluir
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>

      <MenuItemModal
        categories={categories}
        open={modalMenuItemOpen}
        onClose={() => setModalMenuItemOpen(false)}
        item={menuItem}
      />

      <Modal
        opened={modalDeleteMenuItemOpen}
        onClose={() => setModalDeleteMenuItemOpen(false)}
        title={`Deletar ${menuItem.name}`}
        size="lg"
      >
        <LoadingOverlay visible={deleteMutation.loading} />
        <Text align="center">
          Tem certeza que deseja remover o item {menuItem.name} ?
        </Text>
        <Flex gap="md" justify="space-between" mt="lg">
          <Button onClick={() => removeItem()} color="red">
            Sim, eu tenho certeza
          </Button>
          <Button onClick={() => setModalDeleteMenuItemOpen(false)}>
            Não, eu quero cancelar essa ação
          </Button>
        </Flex>
      </Modal>
    </>
  )
}

const useClasses = createStyles({
  menuItem: {
    borderBottom: '1px solid #eee',
  },
})
