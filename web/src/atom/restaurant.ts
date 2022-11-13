import { atom, useAtom } from "jotai";
const restaurantAtom = atom(0);

export const useRestaurantAtom = () => {
  return useAtom(restaurantAtom);
}
