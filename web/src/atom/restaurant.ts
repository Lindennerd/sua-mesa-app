import { atom, useAtom } from "jotai";
const restaurantAtom = atom({
  id: 0,
  slug: ""
});

// atom to store restaurant info
export const useRestaurantAtom = () => {
  return useAtom(restaurantAtom);
}
