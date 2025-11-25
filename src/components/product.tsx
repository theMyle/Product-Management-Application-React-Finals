import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { toast } from "sonner";
import { moneyFormatter } from "@/utils";
import { useState } from "react";
import { DialogHeader, Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";

interface productProps {
  id: number;
  image: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  quantitySelected: number;
  description: string;
  rating: number;
  specs: string;
  quantityOnChange?: (prodId: number, newQuantity: number) => void;
  addToCart?: (prodId: number, qty: number) => void;
};

function Product({
  id,
  image,
  name,
  category,
  stock,
  price,
  quantitySelected: quantity,
  description,
  specs,
  rating,
  quantityOnChange,
  addToCart
}: productProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="lg:min-w-2xl">
          <DialogHeader>
            <DialogTitle>{name}</DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-4">
            <img
              src={image}
              className="w-80"
            />

            <div className="flex flex-col gap-4">
              <div>
                <Label>Description</Label>
                <p>{description}</p>
              </div>

              <div>
                <Label>Specifications</Label>
                <p>{specs}</p>
              </div>

              <div className="flex gap-2 justify-between">
                <div>
                  <Label>Category:</Label>
                  <span> {category}</span>
                </div>

                <div>
                  <Label>Stocks:</Label>
                  <span> {stock}</span>
                </div>

                <div>
                  <Label>Rating:</Label>
                  <span> {rating}/5</span>
                </div>

                <div>
                  <Label>Price:</Label>
                  <span> {moneyFormatter.format(price)}</span>
                </div>
              </div>

            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Card
        className="pt-0 shadow-xl"
        onClick={() => { setOpen(p => !p) }}
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
            <p>{moneyFormatter.format(price)}</p>
          </div>

          {/* starts/rating */}
          <div className="pt-8 flex gap-1 py-2">
            {Array.from({ length: rating }).map((_, i) => (
              <Star key={i} size={20} />
            ))}
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
          <p>{moneyFormatter.format(quantity * price)}</p>
        </div>)
        :
        (<div className="bg-transparent h-12"></div>)
      }


    </div>
  )
}

export default Product;
