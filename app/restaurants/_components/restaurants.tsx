'use client'

import { Restaurant, UserFavoriteRestaurant } from '@prisma/client'
import { notFound, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { searchForRestaurants } from '../_actions/search'
import Header from '@/app/_components/header'
import RestaurantItem from '@/app/_components/restaurant-item'
import Link from 'next/link'
import Search from '@/app/_components/search'

interface RestaurantProps {
  userFavoriteRestaurants: UserFavoriteRestaurant[]
}

export default function Restaurants({
  userFavoriteRestaurants,
}: RestaurantProps) {
  const searchParams = useSearchParams()
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  const searchFor = searchParams.get('search')

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return
      const foundRestaurants = await searchForRestaurants(searchFor)
      setRestaurants(foundRestaurants)
    }

    fetchRestaurants()
  }, [searchFor])

  if (!searchFor) {
    return notFound()
  }

  return (
    <>
      <Header />
      <div className="py-5 pt-6">
        <Search />
      </div>

      <div className="px-5 py-2">
        {restaurants.length > 0 ? (
          <>
            <h2 className="mb-6 text-lg font-semibold">
              Restaurantes Encontrados
            </h2>
            <div className="flex w-full flex-col gap-6">
              {restaurants.map((restaurant) => (
                <RestaurantItem
                  key={restaurant.id}
                  restaurant={restaurant}
                  className="min-w-full max-w-full"
                  userFavoriteRestaurants={[]}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <h2 className="mb-4 text-center font-semibold">
              Não foi encontrado nenhum restaurante com o nome buscado.
            </h2>
            <p className="mb-6">
              <Link
                href="/"
                className="text-center text-sm font-semibold text-primary hover:underline"
              >
                Voltar à página inicial
              </Link>
            </p>
          </div>
        )}
      </div>
    </>
  )
}
