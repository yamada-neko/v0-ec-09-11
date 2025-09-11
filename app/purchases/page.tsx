"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { getPurchasesByUser, type Purchase } from "@/lib/purchases"
import { ArrowLeft, Package } from "lucide-react"

export default function PurchasesPage() {
  const { user } = useAuth()
  const [purchases, setPurchases] = useState<Purchase[]>([])

  useEffect(() => {
    if (user) {
      setPurchases(getPurchasesByUser(user.email))
    }
  }, [user])

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>アクセス拒否</CardTitle>
            <CardDescription>購入履歴を見るにはログインが必要です</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/login">
              <Button className="bg-indigo-600 hover:bg-indigo-700">ログイン</Button>
            </Link>
          </CardContent>
        </Card>
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

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">購入履歴</h1>
            <p className="text-gray-600">これまでに購入された商品の履歴です</p>
          </div>

          {purchases.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg text-gray-500 mb-4">まだ購入履歴がありません</p>
                <Link href="/products">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">商品を見る</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {purchases.map((purchase) => (
                <Card key={purchase.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{purchase.productName}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">数量:</span> {purchase.quantity}個
                          </div>
                          <div>
                            <span className="font-medium">単価:</span> ¥{purchase.price.toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">合計:</span> ¥{purchase.total.toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">購入日:</span>{" "}
                            {new Date(purchase.purchaseDate).toLocaleDateString("ja-JP")}
                          </div>
                        </div>
                      </div>
                      <Link href={`/products/${purchase.productId}`}>
                        <Button variant="outline" size="sm">
                          商品を見る
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-indigo-50 border-indigo-200">
                <CardContent className="p-6">
                  <div className="text-center">
                    <span className="text-lg font-semibold text-indigo-800">
                      総購入金額: ¥{purchases.reduce((sum, p) => sum + p.total, 0).toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
