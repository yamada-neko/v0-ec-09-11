"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { useToast } from "@/hooks/use-toast"
import { productApi, type Product, type CreateProductDto } from "@/api/product"
import { Trash2, Plus } from "lucide-react"

export default function AdminPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const fetchedProducts = await productApi.getProducts()
        setProducts(fetchedProducts)
      } catch (error) {
        toast({
          title: "エラー",
          description: "商品の取得に失敗しました",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.price) {
      toast({
        title: "エラー",
        description: "必須項目を入力してください",
        variant: "destructive",
      })
      return
    }

    if (!user?.token) {
      toast({
        title: "エラー",
        description: "認証が必要です",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)
      const productData: CreateProductDto = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        stock: Number(formData.stock) || 0,
      }

      const newProduct = await productApi.createProduct(productData, user.token)

      // Refresh products list
      const fetchedProducts = await productApi.getProducts()
      setProducts(fetchedProducts)

      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
      })
      setShowAddForm(false)

      toast({
        title: "商品追加完了",
        description: `${newProduct.name}を追加しました`,
      })
    } catch (error) {
      toast({
        title: "エラー",
        description: "商品の追加に失敗しました",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (id: number, name: string) => {
    toast({
      title: "機能無効",
      description: "商品削除はバックエンドAPIでサポートされていません",
      variant: "destructive",
    })
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>アクセス拒否</CardTitle>
            <CardDescription>管理者ページにアクセスするにはログインが必要です</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">商品管理</h1>
            <p className="text-gray-600">商品の追加・削除を行えます</p>
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="w-4 h-4 mr-2" />
            商品追加
          </Button>
        </div>

        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>新商品追加</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">商品名 *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="商品名を入力"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">価格 *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="価格を入力"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">在庫数</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      placeholder="在庫数を入力"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">商品説明</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="商品の説明を入力"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                    追加
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    キャンセル
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>商品ID: {product.id}</CardDescription>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id, product.name)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="w-full h-32 bg-gray-200 rounded mb-3 flex items-center justify-center">
                  <span className="text-gray-500">画像なし</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">¥{product.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-500">在庫: {product.stock}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
