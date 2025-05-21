import React, { useState } from 'react';
import { Product } from '../types/product';

interface ProductNodeProps {
  product: Product;
  onQuantityChange: (quantity: number) => void;
  onCustomizationChange: (customization: string) => void;
}

const ProductNode: React.FC<ProductNodeProps> = ({ product, onQuantityChange, onCustomizationChange }) => {
  const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState('');

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, Number(e.target.value));
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const handleCustomizationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCustomization = e.target.checked ? customization + ' ' + e.target.value : customization.replace(e.target.value, '').trim();
    setCustomization(newCustomization);
    onCustomizationChange(newCustomization);
  };

  return (
    <div className="border p-4 rounded shadow-md">
      <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-2" />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-700">${product.price.toFixed(2)}</p>
      <div className="mt-2">
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className="ml-2 border rounded p-1 w-16"
          />
        </label>
      </div>
      <div className="mt-2">
        <label>
          <input
            type="checkbox"
            value="Tryk"
            onChange={handleCustomizationChange}
          />
          Tryk
        </label>
        <label className="ml-4">
          <input
            type="checkbox"
            value="Broderi"
            onChange={handleCustomizationChange}
          />
          Broderi
        </label>
      </div>
    </div>
  );
};

export default ProductNode;