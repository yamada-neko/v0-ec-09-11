"use client"

import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, Package, Settings, ShoppingBag, Home } from "lucide-react"

export function Navigation() {
  const { user, logout } = useAuth()

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
          ECショップ
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-600 hover:text-indigo-600 transition-colors">
            ホーム
          </Link>
          <Link href="/products" className="text-gray-600 hover:text-indigo-600 transition-colors">
            商品一覧
          </Link>
          {user && (
            <Link href="/purchases" className="text-gray-600 hover:text-indigo-600 transition-colors">
              購入履歴
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user.name || user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5 text-sm font-medium">{user.name || user.email}</div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/" className="flex items-center gap-2 cursor-pointer">
                    <Home className="w-4 h-4" />
                    ホーム
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products" className="flex items-center gap-2 cursor-pointer">
                    <ShoppingBag className="w-4 h-4" />
                    商品一覧
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/purchases" className="flex items-center gap-2 cursor-pointer">
                    <Package className="w-4 h-4" />
                    購入履歴
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="w-4 h-4" />
                    商品管理
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="flex items-center gap-2 cursor-pointer text-red-600">
                  <LogOut className="w-4 h-4" />
                  ログアウト
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Link href="/login">
                <Button variant="outline">ログイン</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-indigo-600 hover:bg-indigo-700">新規登録</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
