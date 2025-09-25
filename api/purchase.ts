const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export type PurchaseItemDTO = {
  product_id: number;
  quantity: number;
};

export type PurchaseDTO = {
  items: PurchaseItemDTO[];
  address: string;
};

export type MessageResponse = {
  message: string;
};

// Purchase history interface (for frontend display)
export interface Purchase {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  purchaseDate: string;
}

export const purchaseApi = {
  createPurchase: async (
    data: PurchaseDTO,
    token: string
  ): Promise<MessageResponse> => {
    const response = await fetch(`${API_URL}/api/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create purchase');
    }
    return response.json();
  },
};

// Note: The Go backend doesn't provide endpoints to retrieve purchase history
// This would need to be implemented in the backend if needed
export function getPurchases(): Purchase[] {
  console.warn(
    'getPurchases is not implemented - backend API does not provide order retrieval endpoints'
  );
  return [];
}

export function getPurchasesByUser(): Purchase[] {
  console.warn(
    'getPurchasesByUser is not implemented - backend API does not provide order retrieval endpoints'
  );
  return [];
}
