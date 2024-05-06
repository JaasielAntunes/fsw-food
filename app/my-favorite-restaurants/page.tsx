import { getServerSession } from 'next-auth'
import { db } from '../_lib/prisma'
import { authOptions } from '../_lib/auth'
import { notFound } from 'next/navigation'
import Header from '../_components/header'
import RestaurantItem from '../_components/restaurant-item'
import Link from 'next/link'
import Search from '../_components/search'

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return notFound()
  }

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: { userId: session.user.id },
    include: { restaurant: true },
  })

  return (
    <>
      <Header />
      <div className="py-5 pt-6">
        <Search />
      </div>

      <div className="px-5 py-2">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Favoritos</h2>
        <div className="flex w-full flex-col gap-6 text-center text-sm">
          {userFavoriteRestaurants.length > 0 ? (
            userFavoriteRestaurants.map(({ restaurant }) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                className="min-w-full max-w-full"
                userFavoriteRestaurants={userFavoriteRestaurants}
              />
            ))
          ) : (
            <div className="flex flex-col items-center">
              <h3 className="mb-4 font-medium">
                Você ainda não marcou nenhum restaurante como favorito!
              </h3>
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
      </div>
    </>
  )
}
