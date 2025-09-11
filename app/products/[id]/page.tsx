"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navigation } from "@/components/navigation"
import { useToast } from "@/hooks/use-toast"
import { getProductById, updateProduct, type Product } from "@/lib/products"
import { ArrowLeft, ShoppingCart, Plus, Minus } from "lucide-react"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (params.id) {
      const foundProduct = getProductById(params.id as string)
      if (foundProduct) {
        setProduct(foundProduct)
      } else {
        toast({
          title: "エラー",
          description: "商品が見つかりませんでした",
          variant: "destructive",
        })
        router.push("/products")
      }
    }
  }, [params.id, router, toast])

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 0)) {
      setQuantity(newQuantity)
    }
  }

  const handlePurchase = async () => {
    if (!product || !user) {
      toast({
        title: "エラー",
        description: "ログインが必要です",
        variant: "destructive",
      })
      return
    }

    if (quantity > product.stock) {
      toast({
        title: "エラー",
        description: "在庫が不足しています",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // 在庫を減らす
    const updatedProduct = updateProduct(product.id, {
      stock: product.stock - quantity,
    })

    if (updatedProduct) {
      setProduct(updatedProduct)

      // 購入履歴をLocalStorageに保存
      const purchases = JSON.parse(localStorage.getItem("purchases") || "[]")
      const newPurchase = {
        id: Date.now().toString(),
        productId: product.id,
        productName: product.name,
        quantity,
        price: product.price,
        total: product.price * quantity,
        purchaseDate: new Date().toISOString(),
        userEmail: user.email,
      }
      purchases.push(newPurchase)
      localStorage.setItem("purchases", JSON.stringify(purchases))

      toast({
        title: "購入完了",
        description: `${product.name} を ${quantity}個 購入しました！`,
      })

      setQuantity(1)
    } else {
      toast({
        title: "エラー",
        description: "購入処理に失敗しました",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">商品を読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/products">
            <Button variant="outline" className="mb-4 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              商品一覧に戻る
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* 商品画像 */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          </div>

          {/* 商品情報 */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2 bg-indigo-600 hover:bg-indigo-700">{product.category}</Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-indigo-600">¥{product.price.toLocaleString()}</span>
                <span className="text-lg text-gray-500">在庫: {product.stock}個</span>
              </div>

              {product.stock > 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">購入する</CardTitle>
                    <CardDescription>数量を選択して購入ボタンを押してください</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">数量</Label>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(-1)}
                          disabled={quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Input
                          id="quantity"
                          type="number"
                          value={quantity}
                          onChange={(e) => {
                            const val = Number.parseInt(e.target.value)
                            if (val >= 1 && val <= product.stock) {
                              setQuantity(val)
                            }
                          }}
                          min={1}
                          max={product.stock}
                          className="w-20 text-center"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(1)}
                          disabled={quantity >= product.stock}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">合計金額:</span>
                        <span className="text-2xl font-bold text-indigo-600">
                          ¥{(product.price * quantity).toLocaleString()}
                        </span>
                      </div>

                      {user ? (
                        <Button
                          onClick={handlePurchase}
                          disabled={isLoading || product.stock === 0}
                          className="w-full bg-indigo-600 hover:bg-indigo-700"
                          size="lg"
                        >
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          {isLoading ? "処理中..." : "購入する"}
                        </Button>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600 text-center">購入するにはログインが必要です</p>
                          <Link href="/login" className="w-full">
                            <Button className="w-full bg-indigo-600 hover:bg-indigo-700" size="lg">
                              ログインして購入
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-lg text-gray-500 mb-4">申し訳ございません</p>
                    <p className="text-red-600 font-semibold">この商品は現在在庫切れです</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
