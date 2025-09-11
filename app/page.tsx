import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-balance">最高品質の商品をお届け</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
            厳選された商品を豊富に取り揃えております。お気に入りの商品を見つけてください。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-indigo-600">高品質</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>厳選された高品質な商品のみを取り扱っています</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-indigo-600">安心配送</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>迅速かつ安全な配送でお客様のもとへお届けします</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-indigo-600">サポート</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>お客様のご質問やお困りごとに丁寧にお答えします</CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
              商品を見る
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
