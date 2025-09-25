const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  created_at: string;
};

export type CreateProductDto = {
  name: string;
  description: string;
  price: number;
  stock: number;
};

export type UpdateProductDto = Partial<CreateProductDto>;

export const productApi = {
  // 商品一覧を取得
  getProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${API_URL}/api/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  // 商品詳細を取得
  getProduct: async (id: number): Promise<Product> => {
    const response = await fetch(`${API_URL}/api/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return response.json();
  },

  // 商品を新規作成
  createProduct: async (data: CreateProductDto, token: string): Promise<Product> => {
    const response = await fetch(`${API_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    return response.json();
  },

  // Note: The Go backend doesn't support product updates or deletes
  // These operations are not available in the current API
  updateProduct: async (
    id: number,
    data: UpdateProductDto,
    token: string
  ): Promise<Product> => {
    throw new Error('Product updates are not supported by the backend API');
  },

  deleteProduct: async (id: number, token: string): Promise<void> => {
    throw new Error('Product deletion is not supported by the backend API');
  },
};
