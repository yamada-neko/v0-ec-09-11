"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { getProducts, type Product } from "@/lib/products"
import { ShoppingCart } from "lucide-react"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    setProducts(getProducts())
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">商品一覧</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            厳選された高品質な商品をご覧ください。お気に入りの商品を見つけて、詳細をチェックしてみてください。
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">商品がまだ登録されていません。</p>
            <Link href="/admin" className="mt-4 inline-block">
              <Button className="bg-indigo-600 hover:bg-indigo-700">商品を追加する</Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <Badge className="absolute top-2 right-2 bg-indigo-600 hover:bg-indigo-700">
                      {product.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2 line-clamp-1">{product.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </CardDescription>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-indigo-600">¥{product.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500">在庫: {product.stock}</span>
                  </div>

                  <Link href={`/products/${product.id}`} className="w-full">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      詳細を見る
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
