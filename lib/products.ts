export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  createdAt: Date
}

// サンプル商品データ
export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "ワイヤレスヘッドフォン",
    description: "高音質なワイヤレスヘッドフォン。ノイズキャンセリング機能付き。",
    price: 15800,
    image: "/wireless-headphones.png",
    category: "電子機器",
    stock: 25,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "スマートウォッチ",
    description: "健康管理機能搭載のスマートウォッチ。防水仕様。",
    price: 28900,
    image: "/modern-smartwatch.png",
    category: "電子機器",
    stock: 18,
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "3",
    name: "オーガニックコーヒー豆",
    description: "厳選されたオーガニックコーヒー豆。深煎りの豊かな香り。",
    price: 2400,
    image: "/organic-coffee-beans.png",
    category: "食品",
    stock: 50,
    createdAt: new Date("2024-01-25"),
  },
  {
    id: "4",
    name: "ヨガマット",
    description: "滑り止め加工されたプレミアムヨガマット。厚さ6mm。",
    price: 4800,
    image: "/rolled-yoga-mat.png",
    category: "スポーツ",
    stock: 30,
    createdAt: new Date("2024-02-01"),
  },
  {
    id: "5",
    name: "レザーバックパック",
    description: "本革製の高級バックパック。ビジネスにもカジュアルにも。",
    price: 18500,
    image: "/brown-leather-backpack.png",
    category: "ファッション",
    stock: 12,
    createdAt: new Date("2024-02-05"),
  },
  {
    id: "6",
    name: "アロマディフューザー",
    description: "超音波式アロマディフューザー。7色LEDライト付き。",
    price: 6800,
    image: "/aroma-diffuser-zen.png",
    category: "ホーム",
    stock: 22,
    createdAt: new Date("2024-02-10"),
  },
]

// 商品管理用の関数
export function getProducts(): Product[] {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("products")
    if (stored) {
      return JSON.parse(stored)
    }
    // 初回アクセス時はサンプルデータを保存
    localStorage.setItem("products", JSON.stringify(sampleProducts))
  }
  return sampleProducts
}

export function getProductById(id: string): Product | undefined {
  const products = getProducts()
  return products.find((product) => product.id === id)
}

export function addProduct(product: Omit<Product, "id" | "createdAt">): Product {
  const products = getProducts()
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date(),
  }
  const updatedProducts = [...products, newProduct]

  if (typeof window !== "undefined") {
    localStorage.setItem("products", JSON.stringify(updatedProducts))
  }

  return newProduct
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getProducts()
  const index = products.findIndex((product) => product.id === id)

  if (index === -1) return null

  const updatedProduct = { ...products[index], ...updates }
  products[index] = updatedProduct

  if (typeof window !== "undefined") {
    localStorage.setItem("products", JSON.stringify(products))
  }

  return updatedProduct
}

export function deleteProduct(id: string): boolean {
  const products = getProducts()
  const filteredProducts = products.filter((product) => product.id !== id)

  if (filteredProducts.length === products.length) return false

  if (typeof window !== "undefined") {
    localStorage.setItem("products", JSON.stringify(filteredProducts))
  }

  return true
}
