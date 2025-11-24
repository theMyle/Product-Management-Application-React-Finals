import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { toast } from "sonner";

interface productProps {
  id: number;
  image: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  quantitySelected: number;
  quantityOnChange?: (prodId: number, newQuantity: number) => void;
  addToCart?: (prodId: number, qty: number) => void;
};

function Product({ id, image, name, category, stock, price, quantitySelected: quantity, quantityOnChange, addToCart }: productProps) {
  const moneyFormat = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <div>
      <Card
        className="pt-0 shadow-xl"
        onClick={() => {

        }}
      >

        <div className="h-55 flex justify-center items-center rounded-t-xl w-65 overflow-hidden">
          <img
            src={image}
            className="w-full h-auto bg-cover rounded-t-xl"
          />
        </div>

        <CardContent className="w-65 px-4">
          <div className="flex justify-between text-sm">
            <p>{category}</p>
            <p>Stocks: {stock}</p>
          </div>

          <div className="flex justify-between font-bold h-10">
            <p className="text-wrap">{name}</p>
            <p>{moneyFormat.format(price)}</p>
          </div>

          {/* starts/rating */}
          <div className="pt-8">
            <p>Stars</p>
          </div>

          {/* quantity & add to cart */}
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-center gap-5">

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  if (quantityOnChange) {
                    if (quantity > 0)
                      quantityOnChange(id, quantity - 1)
                  }
                }}>
                <Minus />
              </Button>

              <p>{quantity}</p>

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  if (quantityOnChange) {
                    if (quantity < stock)
                      quantityOnChange(id, quantity + 1)
                  }
                }}>
                <Plus />
              </Button>
            </div>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                if (addToCart) {
                  if (quantity > 0) {
                    addToCart(id, quantity);
                    if (quantityOnChange) quantityOnChange(id, 0);
                    toast.success(`${quantity} - ${name} added to cart`);
                  }
                }
              }}
            >
              <ShoppingCart />
            </Button>
          </div>

          <div>
            <p></p>
          </div>
        </CardContent>
      </Card>

      {quantity > 0
        ?
        (<div className="flex justify-between px-4 py-2 bg-gray-200 rounded-md mt-2">
          <p>Value Total:</p>
          <p>{moneyFormat.format(quantity * price)}</p>
        </div>)
        :
        (<div className="bg-transparent h-12"></div>)
      }


    </div>
  )
}

export default Product;
