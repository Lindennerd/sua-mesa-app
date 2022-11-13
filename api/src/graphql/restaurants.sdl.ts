export const schema = gql`
  """
  Representation of Restaurant.
  """
  type Restaurant {
    "Description for id."
    id: Int!

    "Description for name."
    name: String!

    "Description for slug."
    slug: String!

    "Description for address."
    address: String!

    "Description for phone."
    phone: String!

    "Description for createdAt."
    createdAt: DateTime!

    "Description for RestaurantUser."
    RestaurantUser: [RestaurantUser]!

    "Description for MenuItem."
    MenuItem: [MenuItem]!

    "Description for Order."
    Order: [Order]!

    "Description for Table."
    Table: [Table]!
  }

  """
  About queries
  """
  type Query {
    "Fetch Restaurants."
    restaurants: [Restaurant!]! @requireAuth

    "Fetch a Restaurant by id."
    restaurant(id: Int!): Restaurant @requireAuth

    "Fetch a Restaurant by slug"
    restaurantBySlug(slug: String!): Restaurant @requireAuth
  }

  """
  Autogenerated input type of InputRestaurant.
  """
  input CreateRestaurantInput {
    "Description for name."
    name: String!

    "Description for address."
    address: String!

    "Description for phone."
    phone: String!
  }

  """
  Autogenerated input type of UpdateRestaurant.
  """
  input UpdateRestaurantInput {
    "Description for name."
    name: String

    "Description for slug."
    slug: String

    "Description for address."
    address: String

    "Description for phone."
    phone: String
  }

  """
  About mutations
  """
  type Mutation {
    "Creates a new Restaurant."
    createRestaurant(input: CreateRestaurantInput!): Restaurant! @requireAuth

    "Updates an existing Restaurant."
    updateRestaurant(id: Int!, input: UpdateRestaurantInput!): Restaurant!
      @requireAuth

    "Deletes an existing Restaurant."
    deleteRestaurant(id: Int!): Restaurant! @requireAuth
  }
`
