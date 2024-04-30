import Image from 'next/image'
import { Button } from './ui/button'
import { MenuIcon } from 'lucide-react'

export default function Header() {
  return (
    <div className="flex justify-between px-5 pt-6">
      <Image src="/logo.png" alt="FSW Foods" width={100} height={30} />
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
