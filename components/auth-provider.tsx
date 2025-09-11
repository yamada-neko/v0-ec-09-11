"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  name?: string
  email: string
  isLoggedIn: boolean
}

interface AuthContextType {
  user: User | null
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
