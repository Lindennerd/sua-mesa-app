import { LoadingOverlay, Modal } from "@mantine/core";
import { useMutation } from "@redwoodjs/web";
import { useRestaurantAtom } from "src/atom/restaurant";
import { CREATE_MENUITEM_MUTATION } from "src/graphql/menuItem";
import { QUERY_RESTAURANT_BY_SLUG } from "src/graphql/restaurant";
import { Category, FindRestaurantBySlug, MenuItem } from "types/graphql";
import MenuItemForm from "./MenuItemForm";

interface Props {
  open: boolean,
  categories: Category[],
  onClose: () => void,
}

const MenuItemModal = ({ open, onClose, categories }: Props) => {
  const [restaurant] = useRestaurantAtom()
  const [createMenuItem, { loading, error }] = useMutation(
    CREATE_MENUITEM_MUTATION, {
      onCompleted() {
        onClose();
      },
      update(cache, { data: createMenuItem }) {
        const data = cache.readQuery<FindRestaurantBySlug>({
          query: QUERY_RESTAURANT_BY_SLUG,
          variables: {
            slug: restaurant.slug
          },
        })
        cache.writeQuery({
          query: QUERY_RESTAURANT_BY_SLUG,
          data: {
            restaurantBySlug: {
              ...data.restaurantBySlug,
              MenuItem: data.restaurantBySlug.MenuItem.concat([createMenuItem])
            }
          }
        })
      }
    }
  );

  async function save(menuItem: MenuItem) {
    await createMenuItem({
      variables: {
        input: {
          categoryId: menuItem.categoryId,
          restaurantId: restaurant.id,
          description: menuItem.description,
          name: menuItem.name,
          price: menuItem.price,
          image: menuItem.image ?? 'https://via.placeholder.com/300',
        },
      },
    })
  }

  return <Modal opened={open} onClose={onClose} title="Novo Item">
    <LoadingOverlay visible={loading} />
    <MenuItemForm
      categories={categories}
      onSubmit={save}
    />
  </Modal>
}


export default MenuItemModal;
