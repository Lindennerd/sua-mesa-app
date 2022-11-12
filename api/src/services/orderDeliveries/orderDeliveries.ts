import type {
  QueryResolvers,
  MutationResolvers,
  OrderDeliveryRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const orderDeliveries: QueryResolvers['orderDeliveries'] = () => {
  return db.orderDelivery.findMany()
}

export const orderDelivery: QueryResolvers['orderDelivery'] = ({ id }) => {
  return db.orderDelivery.findUnique({
    where: { id },
  })
}

export const createOrderDelivery: MutationResolvers['createOrderDelivery'] = ({
  input,
}) => {
  return db.orderDelivery.create({
    data: input,
  })
}

export const updateOrderDelivery: MutationResolvers['updateOrderDelivery'] = ({
  id,
  input,
}) => {
  return db.orderDelivery.update({
    data: input,
    where: { id },
  })
}

export const deleteOrderDelivery: MutationResolvers['deleteOrderDelivery'] = ({
  id,
}) => {
  return db.orderDelivery.delete({
    where: { id },
  })
}

export const OrderDelivery: OrderDeliveryRelationResolvers = {
  order: (_obj, { root }) => {
    return db.orderDelivery.findUnique({ where: { id: root?.id } }).order()
  },
  customer: (_obj, { root }) => {
    return db.orderDelivery.findUnique({ where: { id: root?.id } }).customer()
  },
}
