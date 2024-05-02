import Image from 'next/image'
import { Button } from './ui/button'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  return (
    <div className="flex justify-between px-5 pt-6">
      <div className="relative h-[30px] w-[100px]">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="FSW Foods"
            fill
            className="object-cover"
          />
        </Link>
      </div>
      <Button
        className="border-none bg-transparent"
        variant="outline"
        size="icon"
      >
        <MenuIcon />
      </Button>
    </div>
  )
}
