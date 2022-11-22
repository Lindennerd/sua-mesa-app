import { atom, useAtom } from 'jotai'

const tableAtom = atom(0)

export const useTableAtom = () => {
  return useAtom(tableAtom)
}
