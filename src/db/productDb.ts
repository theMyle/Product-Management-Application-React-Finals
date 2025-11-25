export interface IProduct {
    id?: number;
    image: string;
    name: string;
    category: string;
    stock: number;
    price: number;
    description: string;
    quantitySelected: number;
    specs: string;
    rating: number;
}

export const productDb: IProduct[] = [
    {
        image: "/AppleMacMiniM4.jpg",
        name: "Apple Mac Mini M4",
        category: "desktop",
        stock: 100,
        price: 36990,
        quantitySelected: 0,
        rating: 5,
        description: "Compact desktop with the M4 chip designed for productivity, media work, and everyday computing.",
        specs: `CPU: M4 Chip 8-core
RAM: 16GB
Storage: 512GB SSD
OS: macOS Sonoma`,
    },
    {
        image: "/AppleWatchSE.webp",
        name: "Apple Watch SE",
        category: "wearables",
        stock: 90,
        price: 9900,
        quantitySelected: 0,
        rating: 5,
        description: "Lightweight smartwatch offering essential fitness tracking, notifications, and safety features.",
        specs: `Display: 1.78-inch Retina
Connectivity: GPS + Cellular
Battery: 18 hours
Sensors: Heart rate, SpO2, Accelerometer`
    },
    {
        image: "/AppleIphone16.webp",
        name: "Apple iPhone 16",
        category: "phones",
        stock: 80,
        price: 49990,
        quantitySelected: 0,
        rating: 4,
        description: "Premium smartphone with a large OLED display, fast performance, and strong dual-camera system.",
        specs: `Display: 6.7-inch OLED
CPU: A18 Bionic
Storage: 256GB
Camera: 48MP + 12MP Dual`
    },
    {
        image: "/AppleIphone17Pro.webp",
        name: "Apple iPhone 17 Pro",
        category: "phones",
        stock: 55,
        price: 85990,
        quantitySelected: 0,
        rating: 4,
        description: "Flagship model featuring a ProMotion display, advanced triple-camera array, and high-end performance.",
        specs: `Display: 6.7-inch OLED ProMotion
CPU: A19 Bionic
Storage: 512GB
Camera: 48MP + 12MP + 12MP Triple`
    },


];

for (let i = 0; i < productDb.length; i++) {
    productDb[i].id = i;
}

export let productCategories = new Set<string>();
productDb.forEach(p => productCategories.add(p.category.toLocaleLowerCase()));