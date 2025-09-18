import { productApi, Product } from '@/api/product';
import Link from 'next/link';

export default async function ProductsPage() {
  const products = await productApi.getProducts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">商品一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="border p-4 rounded hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-bold mt-2">
              ¥{product.price.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              在庫: {product.stockQuantity}個
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
