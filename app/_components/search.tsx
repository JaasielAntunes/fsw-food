'use client'

import { SearchIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { FormEventHandler, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function Search() {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if (!search) {
      toast.error('Informe um nome de restaurante para a busca!', {
        position: 'top-center',
        closeButton: true,
        duration: 5000,
        style: {
          width: '230px',
        },
      })
      return
    }

    router.push(`/restaurants?search=${search}`)
  }

  return (
    <form className="mx-5 flex gap-2" onSubmit={handleSearchSubmit}>
      <Input
        placeholder="Busque por restaurantes"
        className="border-none"
        onChange={handleChange}
        value={search}
        maxLength={30}
      />
      <Button size="icon" type="submit">
        <SearchIcon size={20} />
      </Button>
    </form>
  )
}
