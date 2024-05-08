import React from 'react';
import { useQuery } from 'react-query';

import moment from 'moment';

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

const ProductsList: React.FC = () => {
  const { data, isLoading, isError } = useQuery<Product[]>('products', fetchProducts);

  if (isLoading) return <p className='section-padding text-center'>Loading...</p>;
  if (isError) return <p className='section-padding text-center'>Error fetching data</p>;

  // Check if data is empty
  if (data && data.length === 0) {
    return <p className='section-padding text-center'>No products available</p>;
  }

  return (
    <div className='section-padding'>
      <h3 className="text-center text-[1.5rem] mb-8">Products</h3>
      
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-white">
          <thead className="text-xs uppercase bg-green-500">
            <tr className="text-center">
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Serial No.
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Date Created
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data && data.map((product: Product) => (
              <tr className="bg-white border-b bg-gray-200 text-black" key={product.id}>
                <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">{product.id}</th>
                <td>{product.serial}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.quantity}</td>
                <td>{moment(product.created_at).format("MM/DD/YYYY")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsList;
