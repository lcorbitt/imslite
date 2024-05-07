import React from 'react';
import { useQuery } from 'react-query';

interface Product {
  id: number;
  serial: string;
  name: string;
  description: string;
  quantity: number;
  created_at: string;
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('/api/products');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const ProductsPage: React.FC = () => {
  const { data, isLoading, isError } = useQuery<Product[]>('products', fetchProducts);

  if (isLoading) return <div className=''>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  // Check if data is empty
  if (data && data.length === 0) {
    return <div className="bg-blue-500 text-red p-4">No products available</div>;
  }

  return (
    <div>
      <h2>Products</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Serial</th>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((product: Product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.serial}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.quantity}</td>
              <td>{product.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
