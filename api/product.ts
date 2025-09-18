const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateProductDto = {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
};

export type UpdateProductDto = Partial<CreateProductDto>;

export const productApi = {
  // 商品一覧を取得
  getProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  // 商品詳細を取得
  getProduct: async (id: number): Promise<Product> => {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return response.json();
  },

  // 商品を新規作成
  createProduct: async (data: CreateProductDto): Promise<Product> => {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    return response.json();
  },

  // 商品情報を更新
  updateProduct: async (
    id: number,
    data: UpdateProductDto
  ): Promise<Product> => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    return response.json();
  },

  // 商品を削除
  deleteProduct: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  },
};
