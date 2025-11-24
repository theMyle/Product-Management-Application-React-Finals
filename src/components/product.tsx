import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface productProps {
  image: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  quantitySelected: number;
  quantityOnChange?: (newQuantity: number) => void;
  addToCart?(): () => void;
};

function Product({ image, name, category, stock, price, quantitySelected: quantity, quantityOnChange, addToCart }: productProps) {
  return (
    <div>
      <Card className="pt-0 shadow-xl">

        <div className="bg-gray-300 h-50 w-full flex justify-center items-center rounded-t-xl">
          <p>Product Image: {image}</p>
        </div>

        <CardContent className="w-65 px-4">
          <div className="flex justify-between text-sm">
            <p>{category}</p>
            <p>Stocks: {stock}</p>
          </div>

          <div className="flex justify-between font-bold">
            <p className="text-wrap">{name}</p>
            <p>P{price}</p>
          </div>

          {/* starts/rating */}
          <div className="pt-8">
            <p>Stars</p>
          </div>

          {/* quantity & add to cart */}
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-center gap-5">
              <Button onClick={() => { if (quantityOnChange) { quantityOnChange(quantity - 1) } }}>-</Button>
              <p>{quantity}</p>
              <Button onClick={() => { if (quantityOnChange) { quantityOnChange(quantity + 1) } }}>+</Button>
            </div>
            <Button>Cart</Button>
          </div>

          <div>
            <p></p>
          </div>
        </CardContent>
      </Card>

      {quantity > 0 &&
        <div className="flex justify-between px-4 py-2 bg-green-400 rounded-xl mt-2">
          <p>Value Total:</p>
          <p>P{quantity * price}</p>
        </div>
      }

    </div>
  )
}

export default Product;
