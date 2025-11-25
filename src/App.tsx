
import { useState } from "react"
import Product from "./components/product"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./components/ui/select";
import { productCategories, productDb, type IProduct } from "./db/productDb";
import { Search, ShoppingCart } from "lucide-react";
import { Dialog, DialogTrigger } from "./components/ui/dialog";
import { moneyFormatter } from "./utils";
import CartDialog from "./components/cartDialog";
import NewItemDialog from "./components/newItemDialog";

function App() {
  const [products, setProducts] = useState<IProduct[]>(productDb);
  const [cart, setCart] = useState<IProduct[]>([]);
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

  function quantityOnChangeCart(productIdx: number, value: number) {
    setCart((prev) => {
      const newCart = [...prev];
      const itemIdx = newCart.findIndex(i => i.id === productIdx);
      if (itemIdx >= 0) {
        if (newCart[itemIdx].quantitySelected + value > 0) {
          newCart[itemIdx] = {
            ...newCart[itemIdx],
            quantitySelected: newCart[itemIdx].quantitySelected + value,
          }
        }
      }
      return newCart;
    });
  }

  function searchOnClick(searcInput: string) {
    setSearchBar(searcInput);
  }

  function addToCart(prodId: number, qty: number) {
    setCart(p => {
      let newCart = [...p];
      let productIndex = newCart.findIndex(p => p.id === prodId);

      if (productIndex >= 0) {
        newCart[productIndex] = {
          ...newCart[productIndex],
          quantitySelected: newCart[productIndex].quantitySelected + qty,
        }
      } else {
        const productToAdd = products.find(p => p.id === prodId);
        if (productToAdd) {
          newCart.push({ ...productToAdd, quantitySelected: qty });
        }
      }

      return newCart;
    })
  }

  function removeFromCart(prodId: number) {
    setCart(p => p.filter(item => item.id !== prodId));
  }

  function addNewItem(item: IProduct) {
    categories.add(item.category.toLowerCase());
    setProducts(p => [...p, { id: products.length, ...item }]);
  }


  return (
    <div className="flex flex-col items-center h-full gap-5">

      {/* nav bar on top */}
      <div className="sticky top-0 flex justify-between w-full p-4 px-6 shadow-sm items-center bg-white">
        <h1 className="font-bold">P.M.A</h1>
        <div className="text-sm flex items-center">
          <Input
            type="search"
            placeholder="Search"
            className="w-50 rounded-r-none border-r-0"
            onChange={(e) => {
              e.target.value === "" ?
                setSearchBar("") :
                setSearchField(e.target.value)
            }}
          />
          <Button
            className="rounded-l-none"
            onClick={() => searchOnClick(`${searchField}`)}
          >
            <Search />
            Search
          </Button>
        </div>

        <Dialog>
          <DialogTrigger>
            <Button>
              <ShoppingCart />
              View Cart
              ({cart.reduce((acc, curr) => curr.quantitySelected + acc, 0)})
            </Button>
          </DialogTrigger>
          <CartDialog
            cart={cart}
            quantityOnChange={quantityOnChangeCart}
            removeFromCart={removeFromCart}
            moneyFormatter={moneyFormatter}
          />
        </Dialog>
      </div>
      {/* nav bar on top */}

      {/* product list component/container */}
      <div className="flex flex-col gap-2 w-full px-20">

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
                  <SelectItem
                    value={c}
                  >{c.charAt(0).toLocaleUpperCase() + c.slice(1)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Dialog>
            <DialogTrigger>
              <Button>Add New Product</Button>
            </DialogTrigger>
            <NewItemDialog addItemOnclick={addNewItem} />
          </Dialog>
        </div>

        <div className="border border-gray-300 px-4 py-6 rounded-xl flex flex-col gap-4">
          <h1 className="font-bold">Product List</h1>
          <div className="flex  justify-center gap-4 flex-wrap gap-y-4">

            {products
              .filter(p => filter === "all" ? true : p.category === filter)
              .filter(p => searchBar === "" ? true : p.name.toLowerCase().includes(searchBar.toLocaleLowerCase()))
              .filter(p => p.stock > 0)
              .map((p) => (
                <Product
                  id={p.id!}
                  key={p.id}
                  image={p.image}
                  name={p.name}
                  category={p.category}
                  stock={p.stock}
                  price={p.price}
                  description={p.description}
                  specs={p.specs}
                  rating={p.rating}
                  quantitySelected={p.quantitySelected}
                  quantityOnChange={quantityOnChange}
                  addToCart={addToCart}
                />
              ))}

          </div>
        </div>
      </div>
      {/* product list component/container */}

      <footer className="flex w-full">
        <div className="flex justify-end gap-2 py-1 w-full px-4 text-xs italic">
          <p>John Kyle J. Desamparo</p>
          <p>theMyle</p>
          <p>2025</p>
        </div>
      </footer>
    </div>
  )
}

export default App
