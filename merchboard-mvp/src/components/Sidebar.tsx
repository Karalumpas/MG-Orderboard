import React, { useEffect, useState } from 'react';
import { Product } from '../types/product';

const Sidebar: React.FC<{ onAddProduct: (product: Product) => void }> = ({ onAddProduct }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [colorFilter, setColorFilter] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('/data/products.json');
            const data = await response.json();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
        const matchesColor = colorFilter ? product.color === colorFilter : true;
        return matchesSearch && matchesCategory && matchesColor;
    });

    return (
        <div className="sidebar">
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <select onChange={(e) => setCategoryFilter(e.target.value)} className="filter-select">
                <option value="">All Categories</option>
                {/* Add category options here */}
            </select>
            <select onChange={(e) => setColorFilter(e.target.value)} className="filter-select">
                <option value="">All Colors</option>
                {/* Add color options here */}
            </select>
            <ul className="product-list">
                {filteredProducts.map(product => (
                    <li key={product.id} className="product-item" onClick={() => onAddProduct(product)}>
                        <img src={product.image} alt={product.name} className="product-image" />
                        <div className="product-info">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price">${product.price.toFixed(2)}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;