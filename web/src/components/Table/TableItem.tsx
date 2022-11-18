import { useEffect, useState } from 'react'

import {
  ActionIcon,
  Button,
  Flex,
  Group,
  LoadingOverlay,
  Menu,
  Modal,
  Text,
  Title
} from '@mantine/core'
import { IconDotsVertical, IconPrinter, IconTrash } from '@tabler/icons'
import QrCode from 'qrcode'
import { Table } from 'types/graphql'

import { useRestaurantAtom } from 'src/atom/restaurant'
import useTableMutation from 'src/hooks/useTableMutation'

const TableItem = ({ table }: { table: Table }) => {
  const [restaurant] = useRestaurantAtom()
  const [tableQrCode, setTableQrCode] = useState('')
  const [modalDeleteTableOpen, setModalDeleteTableOpen] = useState(false)

  const { remove } = useTableMutation()

  const deleteMutation = remove({
    onCompleted() {},
  })

  useEffect(() => {
    const url = `${location.origin}/pedidos/${restaurant.slug}/${table.id}`
    QrCode.toDataURL(url).then((image) => setTableQrCode(image))
  }, [])

  async function removeTable() {
    await deleteMutation.deleteMutation({
      variables: {
        id: table.id,
      },
    })
  }

  return (
    <>
      <Flex
        justify="space-between"
        p="sm"
        style={{ borderBottom: '1px solid #eee' }}
      >
        <Group>
          <img src={tableQrCode} alt="" />
          <Title>{table.name}</Title>
        </Group>
        <Menu transition="slide-down" transitionDuration={150}>
          <Menu.Target>
            <ActionIcon>
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              // onClick={() => setModalMenuItemOpen(true)}
              icon={<IconPrinter size={14} />}
            >
              Imprimir
            </Menu.Item>
            <Menu.Item
              onClick={() => setModalDeleteTableOpen(true)}
              color="red"
              icon={<IconTrash size={14} />}
            >
              Excluir
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>

      <Modal
        opened={modalDeleteTableOpen}
        onClose={() => setModalDeleteTableOpen(false)}
        title={`Deletar ${table.name}`}
        size="auto"
      >
        <LoadingOverlay visible={deleteMutation.loading} />
        <Text align="center">
          Tem certeza que deseja remover o item {table.name} ?
        </Text>
        <Flex gap="md" justify="space-between" direction="column" mt="lg">
          <Button onClick={() => removeTable()} color="red">
            Sim, eu tenho certeza
          </Button>
          <Button onClick={() => setModalDeleteTableOpen(false)}>
            Não, eu quero cancelar essa ação
          </Button>
        </Flex>
      </Modal>
    </>
  )
}

export default TableItem
