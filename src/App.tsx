
import { useState } from "react"
import Product from "./components/product"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./components/ui/select";
import { productCategories, productDb, type IProduct } from "./db/productDb";

function App() {
  const [products, setProducts] = useState<IProduct[]>(productDb);
  const [cart, setCart] = useState();
  const [categories, setCategories] = useState(productCategories);
  const [filter, setFilter] = useState("all");

  const [searchField, setSearchField] = useState("");
  const [searchBar, setSearchBar] = useState("");

  function quantityOnChange(productIdx: number, value: number) {
    setProducts((prev) => {
      const newProducts = [...prev];
      newProducts[productIdx].quantitySelected = value;
      return newProducts;
    });
  }

  function searchOnClick(searcInput: string) {
    setSearchBar(searcInput);
  }

  function addToCart(productIdx: number) { }

  return (
    <div className="flex flex-col items-center h-screen gap-5">

      {/* nav bar on top */}
      <div className="sticky top-0 flex justify-between w-full p-4 px-6 shadow-sm items-center bg-white">
        <h1>P.M.A</h1>
        <div className="text-sm flex items-center">
          <Input
            type="search"
            placeholder="Search"
            className="w-60 rounded-r-none border-r-0"
            onChange={(e) => {
              e.target.value === "" ? setSearchBar("") : setSearchField(e.target.value)
            }}
          />
          <Button
            className="rounded-l-none"
            onClick={() => searchOnClick(`${searchField}`)}
          >Search</Button>
        </div>
        <Button>View Cart (0)</Button>
      </div>

      {/* product list component/container */}
      <div className="flex flex-col gap-2 w-full px-30 pb-5">

        <div className="flex justify-between w-full">
          <Select
            onValueChange={
              (value) => {
                setFilter(value);
              }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Product Category</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                {[...categories].map(c => (
                  <SelectItem value={c}>{c.charAt(0).toLocaleUpperCase() + c.slice(1)}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button>Add New Product</Button>
        </div>

        <div className="border border-gray-300 px-4 py-6 rounded-xl flex flex-col gap-4">
          <h1 className="font-bold">Product List</h1>
          <div className="flex  justify-center gap-4 flex-wrap gap-y-10">

            {products
              .filter(p => filter === "all" ? true : p.category === filter)
              .filter(p => searchBar === "" ? true : p.name.toLowerCase().includes(searchBar.toLocaleLowerCase()))
              .filter(p => p.stock > 0)
              .map((p, idx) => (
                <Product
                  id={idx}
                  key={idx}
                  image={p.image}
                  name={p.name}
                  category={p.category}
                  stock={p.stock}
                  price={p.price}
                  quantitySelected={p.quantitySelected}
                  quantityOnChange={quantityOnChange}
                />
              ))}

          </div>
        </div>
      </div>
    </div>
  )
}

export default App
