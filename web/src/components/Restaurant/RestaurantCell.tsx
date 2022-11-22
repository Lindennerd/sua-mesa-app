import { useEffect } from 'react'

import { LoadingOverlay } from '@mantine/core'
import type {
  Category,
  FindRestaurantBySlug,
  FindRestaurantBySlugVariables,
  MenuItem
} from 'types/graphql'

import { useLocation } from '@redwoodjs/router'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'

import { useRestaurantAtom } from 'src/atom/restaurant'
import { QUERY_RESTAURANT_BY_SLUG } from 'src/graphql/restaurant'

import RestaurantAdmin from './RestaurantAdmin'
import RestaurantOrder from './RestaurantOrder'

export const QUERY = QUERY_RESTAURANT_BY_SLUG

export const beforeQuery = (props) => {
  return {
    variables: props,
    fetchPolicy: 'cache-and-network',
  }
}

export const Loading = () => (
  <>
    <LoadingOverlay visible={true} />
  </>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindRestaurantBySlugVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  restaurantBySlug,
}: CellSuccessProps<FindRestaurantBySlug, FindRestaurantBySlugVariables>) => {
  const [_, setRestaurant] = useRestaurantAtom()
  useEffect(() => {
    setRestaurant({
      id: restaurantBySlug.id,
      slug: restaurantBySlug.slug,
    })
  }, [restaurantBySlug, setRestaurant])

  const { pathname } = useLocation()

  if (pathname.includes('pedidos'))
    return (
      <RestaurantOrder
        name={restaurantBySlug.name}
        menuItems={restaurantBySlug.MenuItem as MenuItem[]}
        categories={restaurantBySlug.Category as Category[]}
        tables={restaurantBySlug.Table}
      />
    )

  return (
    <RestaurantAdmin
      menuItems={restaurantBySlug.MenuItem}
      categories={restaurantBySlug.Category}
      tables={restaurantBySlug.Table}
      employees={
        restaurantBySlug.RestaurantUser.filter(
          (user) => user.roles === 'EMPLOYEE'
        ) ?? []
      }
      name={restaurantBySlug.name}
    />
  )
}
