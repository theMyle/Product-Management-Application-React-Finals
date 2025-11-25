import { useState } from "react";
import { Button } from "./ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";
import type { IProduct } from "@/db/productDb";
import { toast } from "sonner";

interface NewItemDialogProps {
    addItemOnclick: (newItem: IProduct) => void;
}

export default function NewItemDialog({ addItemOnclick }: NewItemDialogProps) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [specs, setSpecs] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [stocks, setStocks] = useState<number | "">("");
    const [rating, setRating] = useState<number | "">("");
    const [category, setCategory] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleAddProduct = () => {
        if (!name || !price || !stocks || !category || !imageFile || !specs || !description) {
            alert("Please fill all required fields and select an image");
            return false;
        }

        const newProduct: IProduct = {
            image: preview || "", // use preview URL for frontend
            name,
            category,
            stock: Number(stocks),
            price: Number(price),
            quantitySelected: 0,
            rating: Number(rating),
            description,
            specs,
        };

        addItemOnclick(newProduct);

        setImageFile(null);
        setPreview(null);
        setName("");
        setDescription("");
        setSpecs("");
        setPrice("");
        setStocks("");
        setRating("");
        setCategory("");

        return true;
    };

    return (
        <DialogContent className="lg:max-w-2xl">
            <DialogHeader>
                <DialogTitle>Add New Item</DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>

            <ScrollArea className="w-full max-h-96 pr-5">
                <div className="flex gap-4 flex-col p-5">
                    <Label htmlFor="imageInput">Image:</Label>
                    <Input type="file" id="imageInput" accept="image/*" onChange={handleFileChange} />
                    {preview && <img src={preview} className="w-40 h-40 object-cover rounded-md mt-2" />}

                    <Label htmlFor="itemName">Name:</Label>
                    <Input type="text" id="itemName" value={name} onChange={(e) => setName(e.target.value)} />

                    <Label htmlFor="description">Description:</Label>
                    <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />

                    <Label htmlFor="specs">Specification:</Label>
                    <Textarea id="specs" value={specs} onChange={(e) => setSpecs(e.target.value)} />

                    <div className="grid grid-cols-3 gap-2">
                        <Label htmlFor="price">Price:</Label>
                        <Label htmlFor="stocks">Stocks:</Label>
                        <Label htmlFor="rating">Rating:</Label>

                        <Input id="price" type="number" placeholder="e.g. 79.99" value={price}
                            onChange={(e) => {
                                const val = Number(e.target.value);
                                if (val < 0) setPrice(0);
                                else setPrice(val);
                            }} />
                        <Input id="stocks" type="number" placeholder="e.g. 120" value={stocks}
                            onChange={(e) => {
                                const val = Number(e.target.value);
                                if (val < 0) setStocks(0);
                                else setStocks(val);
                            }} />
                        <Input id="rating" type="number" min={1} max={5} placeholder="1-5" value={rating}
                            onChange={(e) => {
                                const val = Number(e.target.value);
                                if (val < 1) setRating(1);
                                else if (val > 5) setRating(5);
                                else setRating(val);
                            }} />
                    </div>

                    <Label htmlFor="category">Category:</Label>
                    <Input type="text" id="category" placeholder="e.g. Wearables, Desktop, Laptop, Phone" value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
            </ScrollArea>

            <DialogFooter>
                <Button onClick={() => {
                    if (handleAddProduct())
                        toast.success("Product successfully added to the list");
                }}
                >Add Product</Button>
                <Button variant="secondary"
                    onClick={() => {
                        setImageFile(null);
                        setPreview(null);
                        setName("");
                        setDescription("");
                        setSpecs("");
                        setPrice("");
                        setStocks("");
                        setRating("");
                        setCategory("");
                    }}
                >Clear</Button>
            </DialogFooter>
        </DialogContent>
    );
}
