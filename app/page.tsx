import Header from './_components/header'
import Search from './_components/search'

export default function Home() {
  return (
    <>
      <Header />
      <div className="py-5 pt-6">
        <Search />
      </div>
    </>
  )
}
