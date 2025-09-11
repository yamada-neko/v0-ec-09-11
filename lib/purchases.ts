export interface Purchase {
  id: string
  productId: string
  productName: string
  quantity: number
  price: number
  total: number
  purchaseDate: string
  userEmail: string
}

export function getPurchases(): Purchase[] {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("purchases")
    if (stored) {
      return JSON.parse(stored)
    }
  }
  return []
}

export function getPurchasesByUser(userEmail: string): Purchase[] {
  const purchases = getPurchases()
  return purchases.filter((purchase) => purchase.userEmail === userEmail)
}

export function addPurchase(purchase: Omit<Purchase, "id">): Purchase {
  const purchases = getPurchases()
  const newPurchase: Purchase = {
    ...purchase,
    id: Date.now().toString(),
  }
  const updatedPurchases = [...purchases, newPurchase]

  if (typeof window !== "undefined") {
    localStorage.setItem("purchases", JSON.stringify(updatedPurchases))
  }

  return newPurchase
}
