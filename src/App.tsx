
import { useState } from "react"
import Product from "./components/product"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./components/ui/select";

function App() {
  const [products, setProducts] = useState();
  const [cart, setCart] = useState();
  const [cetegories, setCategories] = useState();
  const [filter, setFilter] = useState();
  const [search, setSearch] = useState("");

  function quantityChange(productIdx: number, value: number) { }
  function addToCart(productIdx: number) { }

  return (
    <div className="flex flex-col items-center h-screen gap-5">

      {/* nav bar on top */}
      <div className="flex justify-between w-full p-4 px-6 shadow-sm items-center static">
        <h1>P.M.A</h1>
        <div className="text-sm flex items-center">
          <Input type="search" placeholder="Search" className="w-60 rounded-r-none border-r-0" />
          <Button className="rounded-l-none">Search</Button>
        </div>
        <Button>View Cart (0)</Button>
      </div>

      {/* product list component/container */}
      <div className="mx-20 flex flex-col gap-2">

        <div className="flex justify-between w-full">
          <Select onValueChange={(value) => { alert("Value changed to: " + value) }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Product Category</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="laptops">Laptops</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="phones">Phones</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button>Add New Product</Button>
        </div>

        <div className="border border-gray-300 px-4 py-6 rounded-xl flex flex-col gap-4">
          <h1 className="font-bold">Product List</h1>
          <div className="flex  justify-center gap-4 flex-wrap gap-y-10">
            <Product image="none" name="Wireless Earbuds" category="Electronics" stock={32} price={70.99} quantitySelected={0} />
            <Product image="none" name="Wireless Phone" category="Electronics" stock={32} price={70.99} quantitySelected={2} />
            <Product image="none" name="Wireless Charger" category="Electronics" stock={32} price={70.99} quantitySelected={0} />
            <Product image="none" name="Wireless Thing" category="Electronics" stock={32} price={70.99} quantitySelected={0} />
            <Product image="none" name="Wireless Soup" category="Electronics" stock={32} price={70.99} quantitySelected={0} />
            <Product image="none" name="Wireless Earbuds" category="Electronics" stock={32} price={70.99} quantitySelected={0} />
          </div>
        </div>

        <footer className="py-2">
          2025
        </footer>

      </div>
    </div>
  )
}

export default App
