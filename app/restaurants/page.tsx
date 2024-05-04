import { Suspense } from 'react'
import Restaurants from './_components/restaurants'

export default function Page() {
  return (
    <Suspense>
      <Restaurants />
    </Suspense>
  )
}
