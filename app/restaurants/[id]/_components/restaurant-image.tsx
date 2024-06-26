'use client'

import { Button } from '@/app/_components/ui/button'
import { Restaurant, UserFavoriteRestaurant } from '@prisma/client'
import { isRestaurantFavorited } from '@/app/_helpers/restaurant'
import useToggleFavoriteRestaurant from '@/app/_hooks/use-toggle-favorite-restaurant'

import { ChevronLeftIcon, HeartIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, 'id' | 'name' | 'imageUrl'>
  userFavoriteRestaurants: UserFavoriteRestaurant[]
}

export default function RestaurantImage({
  restaurant,
  userFavoriteRestaurants,
}: RestaurantImageProps) {
  const router = useRouter()
  const handleBackClick = () => router.back()

  const { data } = useSession()

  const isFavorite = isRestaurantFavorited(
    restaurant.id,
    userFavoriteRestaurants,
  )

  const { handleFavoriteClick } = useToggleFavoriteRestaurant({
    restaurantId: restaurant.id,
    userId: data?.user.id,
    restaurantIsFavorited: isFavorite,
  })

  return (
    <div className="relative h-[250px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        sizes="100%"
        className="object-cover"
      />

      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        size="icon"
        className={`absolute right-4 top-4 rounded-full bg-gray-700 ${isFavorite && 'bg-primary hover:bg-gray-700'}`}
        onClick={handleFavoriteClick}
      >
        <HeartIcon size={20} className="fill-white" />
      </Button>
    </div>
  )
}
