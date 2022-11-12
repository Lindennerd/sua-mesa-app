import type {
  QueryResolvers,
  MutationResolvers,
  RestaurantUserRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const restaurantUsers: QueryResolvers['restaurantUsers'] = () => {
  return db.restaurantUser.findMany()
}

export const restaurantUser: QueryResolvers['restaurantUser'] = ({ id }) => {
  return db.restaurantUser.findUnique({
    where: { id },
  })
}

export const createRestaurantUser: MutationResolvers['createRestaurantUser'] =
  ({ input }) => {
    return db.restaurantUser.create({
      data: input,
    })
  }

export const updateRestaurantUser: MutationResolvers['updateRestaurantUser'] =
  ({ id, input }) => {
    return db.restaurantUser.update({
      data: input,
      where: { id },
    })
  }

export const deleteRestaurantUser: MutationResolvers['deleteRestaurantUser'] =
  ({ id }) => {
    return db.restaurantUser.delete({
      where: { id },
    })
  }

export const RestaurantUser: RestaurantUserRelationResolvers = {
  restaurant: (_obj, { root }) => {
    return db.restaurantUser
      .findUnique({ where: { id: root?.id } })
      .restaurant()
  },
  user: (_obj, { root }) => {
    return db.restaurantUser.findUnique({ where: { id: root?.id } }).user()
  },
}
