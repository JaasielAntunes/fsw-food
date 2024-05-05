import { getServerSession } from 'next-auth'
import { db } from '../_lib/prisma'
import { authOptions } from '../_lib/auth'
import { redirect } from 'next/navigation'
import Header from '../_components/header'
import OrderItem from './_components/order-item'
import Link from 'next/link'

export default async function MyOrders() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/')
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
      products: {
        include: {
          product: true,
        },
      },
    },
  })

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h2 className="pb-6 text-lg font-semibold">Meus Pedidos</h2>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center">
            <h3 className="font-medium">
              ⚠️ Você ainda não possui pedidos realizados!
            </h3>
            <p className="mb-6">
              <Link
                href="/"
                className="text-center text-sm font-semibold text-primary"
              >
                Clique aqui para voltar à página inicial.
              </Link>
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
