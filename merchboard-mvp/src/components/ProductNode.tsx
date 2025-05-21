import React, { useState } from 'react';
import { Product } from '../types/product';
import useBoardStore from '../store/board';
import { Handle, Position } from 'react-flow-renderer';

const ProductNode: React.FC<any> = ({ data, id }) => {
  const [quantity, setQuantity] = useState(data.quantity || 1);
  const [customizations, setCustomizations] = useState<string[]>(data.customizations || []);
  const updateNode = useBoardStore((state) => state.updateNode);
  const product = data.product;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, Number(e.target.value));
    setQuantity(newQuantity);
    updateNode(id, { quantity: newQuantity });
  };

  const handleCustomizationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newCustomizations = [...customizations];
    if (e.target.checked) {
      newCustomizations.push(e.target.value);
    } else {
      newCustomizations = newCustomizations.filter((c) => c !== e.target.value);
    }
    setCustomizations(newCustomizations);
    updateNode(id, { customizations: newCustomizations });
  };

  return (
    <div className="border p-4 rounded shadow-md bg-white">
      <Handle type="target" position={Position.Top} />
      <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-2" />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-700">{product.price.toFixed(2)} DKK</p>
      <div className="mt-2">
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className="ml-2 border rounded p-1 w-16"
            min={1}
          />
        </label>
      </div>
      <div className="mt-2">
        {product.customizations.print && (
          <label>
            <input
              type="checkbox"
              value="Tryk"
              checked={customizations.includes('Tryk')}
              onChange={handleCustomizationChange}
            />
            Tryk
          </label>
        )}
        {product.customizations.embroidery && (
          <label className="ml-4">
            <input
              type="checkbox"
              value="Broderi"
              checked={customizations.includes('Broderi')}
              onChange={handleCustomizationChange}
            />
            Broderi
          </label>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default ProductNode;