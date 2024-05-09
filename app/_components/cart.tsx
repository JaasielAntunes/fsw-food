import { useContext, useState } from 'react'
import { CartContext } from '../_context/cart'
import CartItem from './cart-item'
import { Card, CardContent } from './ui/card'
import { formatCurrency } from '../_helpers/price'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { createOrder } from '../_actions/order'
import { OrderStatus } from '@prisma/client'
import { signIn, useSession } from 'next-auth/react'
import { Loader2, LogInIcon } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface CartProps {
  setIsOpen: (isOpen: boolean) => void
}

export default function Cart({ setIsOpen }: CartProps) {
  const router = useRouter()
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const { data } = useSession()

  const { products, subtotalPrice, totalPrice, totalDiscounts, clearCart } =
    useContext(CartContext)

  const handleFinishOrderClick = async () => {
    if (!data?.user) return

    const restaurant = products[0].restaurant

    try {
      setIsSubmitLoading(true)

      await createOrder({
        subtotalPrice,
        totalDiscounts,
        totalPrice,
        deliveryFee: restaurant.deliveryFee,
        deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: { id: restaurant.id },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: { id: data.user.id },
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      })

      clearCart()
      setIsOpen(false)

      toast.success('Pedido finalizado com sucesso!', {
        icon: '👏',
        description: 'Você pode acompanhá-lo na tela dos seus pedidos.',
        action: {
          label: 'Meus Pedidos',
          onClick: () => router.push('/my-orders'),
        },
      })
    } catch (error) {
      toast.error(
        'Opss 😢, ocorreu um erro ao finalizar o pedido! Tente novamente.',
      )
    } finally {
      setIsSubmitLoading(false)
    }
  }

  const handleSignInClick = () => signIn()

  return (
    <>
      <div className="flex h-full flex-col py-5">
        {products.length > 0 ? (
          <>
            <div className="flex-auto space-y-4">
              {products.map((product) => (
                <CartItem key={product.id} cartProduct={product} />
              ))}
            </div>
            {/* TOTAIS */}
            <div className="mt-6">
              <Card>
                <CardContent className="space-y-2 p-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(subtotalPrice)}</span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Descontos</span>
                    <span>- {formatCurrency(totalDiscounts)}</span>
                  </div>

                  <Separator className="h-[0.5px]" />

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Entrega</span>

                    {Number(products?.[0].restaurant.deliveryFee) === 0 ? (
                      <span className="uppercase text-primary">Grátis</span>
                    ) : (
                      formatCurrency(
                        Number(products?.[0].restaurant.deliveryFee),
                      )
                    )}
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* FINALIZAR PEDIDO */}
            {data?.user ? (
              <Button
                className="mt-5 w-full"
                onClick={() => setIsConfirmDialogOpen(true)}
                disabled={isSubmitLoading}
              >
                Finalizar pedido
              </Button>
            ) : (
              <>
                <span className="mt-3 text-center text-sm">
                  Faça login para finalizar seu pedido
                  <Button
                    size="icon"
                    onClick={handleSignInClick}
                    className="ml-3 h-7 w-7"
                  >
                    <LogInIcon size={16} />
                  </Button>
                </span>
                <Button className="mt-4 w-full cursor-not-allowed opacity-50">
                  Finalizar pedido
                </Button>
              </>
            )}
          </>
        ) : (
          <h2 className="text-left font-medium">Sua sacola está vazia.</h2>
        )}
      </div>

      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja finalizar seu pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao finalizar seu pedido, você concorda com os termos e condições
              da nossa plataforma.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleFinishOrderClick}
              disabled={isSubmitLoading}
            >
              {isSubmitLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Finalizar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
