import type {
  MutationResolvers,
  OrderRelationResolvers,
  QueryResolvers
} from 'types/graphql'

import { db } from 'src/lib/db'

export const orders: QueryResolvers['orders'] = () => {
  return db.order.findMany()
}

export const order: QueryResolvers['order'] = ({ id }) => {
  return db.order.findUnique({
    where: { id },
  })
}

export const createOrder: MutationResolvers['createOrder'] = ({ input }) => {
  return db.order.create({
    data: {
      status: input.status,
      userId: context.currentUser.id,
      payed: false,
      tableId: input.tableId,
      restaurantId: input.restaurantId,
      orderItems: {
        createMany: {
          skipDuplicates: true,
          data: input.orderItems,
        },
      },
    },
  })
}

export const updateOrder: MutationResolvers['updateOrder'] = ({
  id,
  input,
}) => {
  return db.order.update({
    data: input,
    where: { id },
  })
}

export const deleteOrder: MutationResolvers['deleteOrder'] = ({ id }) => {
  return db.order.delete({
    where: { id },
  })
}

export const Order: OrderRelationResolvers = {
  customer: (_obj, { root }) => {
    return db.order.findUnique({ where: { id: root?.id } }).customer()
  },
  restaurant: (_obj, { root }) => {
    return db.order.findUnique({ where: { id: root?.id } }).restaurant()
  },
  orderItems: (_obj, { root }) => {
    return db.order.findUnique({ where: { id: root?.id } }).orderItems()
  },
  table: (_obj, { root }) => {
    return db.order.findUnique({ where: { id: root?.id } }).table()
  },
  OrderDelivery: (_obj, { root }) => {
    return db.order.findUnique({ where: { id: root?.id } }).OrderDelivery()
  },
}
