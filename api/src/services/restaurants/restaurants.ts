import type {
  MutationResolvers,
  QueryResolvers,
  RestaurantRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const restaurants: QueryResolvers['restaurants'] = () => {
  return db.restaurant.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
    },
  })
}

export const restaurant: QueryResolvers['restaurant'] = ({ id }) => {
  return db.restaurant.findUnique({
    where: { id },
  })
}

export const restaurantBySlug: QueryResolvers['restaurantBySlug'] = ({
  slug,
}) => {
  return db.restaurant.findUnique({
    where: { slug },
    include: {
      MenuItem: true,
      RestaurantUser: true,
      Table: true,
      Category: true,
    },
  })
}

export const createRestaurant: MutationResolvers['createRestaurant'] = ({
  input,
}) => {
  return db.restaurant.create({
    data: {
      ...input,
      slug: input.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replaceAll(' ', '-'),
      RestaurantUser: {
        connectOrCreate: {
          where: {
            id: context.currentUser.id,
          },
          create: {
            userId: context.currentUser.id,
            roles: 'OWNER',
          },
        },
      },
    },
  })
}

export const updateRestaurant: MutationResolvers['updateRestaurant'] = ({
  id,
  input,
}) => {
  return db.restaurant.update({
    data: input,
    where: { id },
  })
}

export const deleteRestaurant: MutationResolvers['deleteRestaurant'] = ({
  id,
}) => {
  return db.restaurant.delete({
    where: { id },
  })
}

export const Restaurant: RestaurantRelationResolvers = {
  RestaurantUser: (_obj, { root }) => {
    return db.restaurant
      .findUnique({ where: { id: root?.id } })
      .RestaurantUser()
  },
  MenuItem: (_obj, { root }) => {
    return db.restaurant.findUnique({ where: { id: root?.id } }).MenuItem()
  },
  Order: (_obj, { root }) => {
    return db.restaurant.findUnique({ where: { id: root?.id } }).Order()
  },
  Table: (_obj, { root }) => {
    return db.restaurant.findUnique({ where: { id: root?.id } }).Table()
  },
}
