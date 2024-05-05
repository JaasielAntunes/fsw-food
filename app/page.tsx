import CategoryList from './_components/category-list'
import Header from './_components/header'
import Search from './_components/search'
import ProductList from './_components/product-list'
import { db } from './_lib/prisma'
import PromoBanner from './_components/promo-banner'
import { Button } from './_components/ui/button'
import { ChevronRightIcon, Linkedin, Github } from 'lucide-react'
import Link from 'next/link'
import RestaurantList from './_components/restaurant-list'

const fetch = async () => {
  const getProducts = db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  })

  const getBurguersCategory = db.category.findFirst({
    where: {
      name: 'Hambúrgueres',
    },
  })

  const getPizzasCategory = db.category.findFirst({
    where: {
      name: 'Pizzas',
    },
  })

  const [products, burguersCategory, pizzasCategory] = await Promise.all([
    getProducts,
    getBurguersCategory,
    getPizzasCategory,
  ])

  return { products, burguersCategory, pizzasCategory }
}

export default async function Home() {
  const { products, burguersCategory, pizzasCategory } = await fetch()

  return (
    <>
      <Header />
      <div className="py-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pb-5 pt-5">
        <Link href={`/categories/${pizzasCategory?.id}/products`}>
          <PromoBanner
            src="/promo-banner-01.png"
            alt="Até 30% de desconto em pizzas!"
          />
        </Link>
      </div>

      <div className="space-y-4 pb-5 pt-5">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/products/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <ProductList products={products} />
      </div>

      <div className="px-5 pb-5 pt-5">
        <Link href={`/categories/${burguersCategory?.id}/products`}>
          <PromoBanner
            src="/promo-banner-02.png"
            alt="A partir de R$17,90 em lanches"
          />
        </Link>
      </div>

      <div className="space-y-4 py-5">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>

          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/restaurants/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <RestaurantList />
      </div>

      <footer className="bg-neutral-100 p-1 text-center text-white">
        <div className="mt-4 bg-neutral-100 text-sm text-muted-foreground dark:bg-neutral-700 dark:text-neutral-200">
          <span>Feito com ❤️ por </span>
          <a href="https://www.linkedin.com/in/jaasiel" target="blank">
            Jaasiel Antunes
          </a>

          <div className="mb-4 mt-3 flex justify-center">
            <a
              href="https://www.linkedin.com/in/jaasiel"
              target="blank"
              className="mr-3 text-neutral-800 dark:text-neutral-200"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/JaasielAntunes"
              target="blank"
              className="text-neutral-800 dark:text-neutral-200"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
