const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

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

export const purchaseApi = {
  createPurchase: async (
    data: PurchaseDTO,
    token: string
  ): Promise<MessageResponse> => {
    const response = await fetch(`${API_URL}/purchase`, {
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
