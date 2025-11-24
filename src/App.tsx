
import Product from "./components/product"
import { Button } from "./components/ui/button"
import { Card, CardContent } from "./components/ui/card"

function App() {
  return (
    <div className="flex flex-col items-center h-screen gap-5">

      {/* nav bar on top */}
      <div className="flex justify-between w-full p-4 px-6 shadow-sm items-center static">
        <h1>P.M.A</h1>
        <div className="text-sm flex items-center">
          <input type="text" placeholder="Search" className="border border-black rounded-l-sm px-4 py-2 w-100"></input>
          <Button className="rounded-l-none h-9.5">Search</Button>
        </div>
        <Button>View Cart (0)</Button>
      </div>

      {/* product list component/container */}
      <div className="mx-20 flex flex-col gap-2">

        <div className="flex justify-between w-full">
          <Button>Drop Down</Button>
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
