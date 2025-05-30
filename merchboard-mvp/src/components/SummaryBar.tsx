import React from 'react';
import useBoardStore from '../store/board';

const SummaryBar: React.FC = () => {
    const totalItems = useBoardStore((state) => state.totalItems);
    const totalPrice = useBoardStore((state) => state.totalPrice);
    const downloadCart = useBoardStore((state) => state.downloadCart);

    return (
        <div className="flex justify-between items-center p-4 bg-gray-200">
            <div>
                <span className="font-bold">Total Items: </span>
                {totalItems}
            </div>
            <div>
                <span className="font-bold">Total Price: </span>
                {totalPrice.toFixed(2)} DKK
            </div>
            <button 
                onClick={downloadCart} 
                className="bg-blue-500 text-white px-4 py-2 rounded"
                aria-label="Download cart"
            >
                Download cart
            </button>
        </div>
    );
};

export default SummaryBar;