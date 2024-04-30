import { SearchIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function Search() {
  return (
    <div className="mx-5 flex gap-2">
      <Input
        placeholder="Buscar Restaurantes"
        className="border-none"
        maxLength={40}
      />
      <Button size="icon">
        <SearchIcon size={20} />
      </Button>
    </div>
  )
}
