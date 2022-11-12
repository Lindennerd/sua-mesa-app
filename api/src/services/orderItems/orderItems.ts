import type {
  QueryResolvers,
  MutationResolvers,
  OrderItemRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const orderItems: QueryResolvers['orderItems'] = () => {
  return db.orderItem.findMany()
}

export const orderItem: QueryResolvers['orderItem'] = ({ id }) => {
  return db.orderItem.findUnique({
    where: { id },
  })
}

export const createOrderItem: MutationResolvers['createOrderItem'] = ({
  input,
}) => {
  return db.orderItem.create({
    data: input,
  })
}

export const updateOrderItem: MutationResolvers['updateOrderItem'] = ({
  id,
  input,
}) => {
  return db.orderItem.update({
    data: input,
    where: { id },
  })
}

export const deleteOrderItem: MutationResolvers['deleteOrderItem'] = ({
  id,
}) => {
  return db.orderItem.delete({
    where: { id },
  })
}

export const OrderItem: OrderItemRelationResolvers = {
  item: (_obj, { root }) => {
    return db.orderItem.findUnique({ where: { id: root?.id } }).item()
  },
  order: (_obj, { root }) => {
    return db.orderItem.findUnique({ where: { id: root?.id } }).order()
  },
}
