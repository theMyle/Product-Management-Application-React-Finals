import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface productProps {
  id: number;
  image: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  quantitySelected: number;
  quantityOnChange?: (prodIdx: number, newQuantity: number) => void;
  addToCart?(): () => void;
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
                }}>-</Button>

              <p>{quantity}</p>

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  if (quantityOnChange) {
                    if (quantity < stock)
                      quantityOnChange(id, quantity + 1)
                  }
                }}>+</Button>
            </div>
            <Button
              onClick={(e) => {
                e.stopPropagation();
              }}
            >Cart</Button>
          </div>

          <div>
            <p></p>
          </div>
        </CardContent>
      </Card>

      {quantity > 0 &&
        <div className="flex justify-between px-4 py-2 bg-green-400 rounded-xl mt-2">
          <p>Value Total:</p>
          <p>{moneyFormat.format(quantity * price)}</p>
        </div>
      }

    </div>
  )
}

export default Product;
