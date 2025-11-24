export interface IProduct {
    image: string;
    name: string;
    category: string;
    stock: number;
    price: number;
    quantitySelected: number;
}

export const productDb: IProduct[] = [

    // {
    //     image: "none",
    //     name: "Wireless Earbuds",
    //     category: "electronics",
    //     stock: 0,
    //     price: 60.50,
    //     quantitySelected: 0
    // },

    {
        image: "/AppleMacMiniM4.jpg",
        name: "Apple Mac Mini M4",
        category: "desktop",
        stock: 100,
        price: 36990,
        quantitySelected: 0
    },
    {
        image: "/AppleWatchSE.webp",
        name: "Apple Watch SE",
        category: "wearables",
        stock: 90,
        price: 9900,
        quantitySelected: 0
    },
    {
        image: "/AppleIphone16.webp",
        name: "Apple Iphone 16",
        category: "phones",
        stock: 80,
        price: 49990,
        quantitySelected: 0
    },
    {
        image: "none",
        name: "Smart Phone",
        category: "phones",
        stock: 20,
        price: 200.78,
        quantitySelected: 0
    },
    {
        image: "none",
        name: "Smart Phone",
        category: "phones",
        stock: 20,
        price: 200.78,
        quantitySelected: 0
    },
];

export let productCategories = new Set<string>();
productDb.forEach(p => productCategories.add(p.category.toLocaleLowerCase()));