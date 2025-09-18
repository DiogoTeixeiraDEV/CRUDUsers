const API_URL = 'http://localhost:3000/products';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export async function getProducts(token: string): Promise<Product[]> {
  const response = await fetch(API_URL,
    { headers:
      {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  if (!response.ok) {
    throw new Error('Failed to get products');
  }
  return response.json();
}

export async function getProductById(id: number) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to get product');
  }
  return response.json();
}

