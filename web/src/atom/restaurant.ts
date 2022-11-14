import { atom, useAtom } from "jotai";
const restaurantAtom = atom({
  id: 0,
  slug: ""
});

export const useRestaurantAtom = () => {
  return useAtom(restaurantAtom);
}
