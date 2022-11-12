import type {
  QueryResolvers,
  MutationResolvers,
  TableRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const tables: QueryResolvers['tables'] = () => {
  return db.table.findMany()
}

export const table: QueryResolvers['table'] = ({ id }) => {
  return db.table.findUnique({
    where: { id },
  })
}

export const createTable: MutationResolvers['createTable'] = ({ input }) => {
  return db.table.create({
    data: input,
  })
}

export const updateTable: MutationResolvers['updateTable'] = ({
  id,
  input,
}) => {
  return db.table.update({
    data: input,
    where: { id },
  })
}

export const deleteTable: MutationResolvers['deleteTable'] = ({ id }) => {
  return db.table.delete({
    where: { id },
  })
}

export const Table: TableRelationResolvers = {
  restaurant: (_obj, { root }) => {
    return db.table.findUnique({ where: { id: root?.id } }).restaurant()
  },
  Order: (_obj, { root }) => {
    return db.table.findUnique({ where: { id: root?.id } }).Order()
  },
}
