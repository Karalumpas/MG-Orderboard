import React from 'react';
import Board from './components/Board';
import Sidebar from './components/Sidebar';
import SummaryBar from './components/SummaryBar';
import useBoardStore from './store/board';
import { Node } from 'react-flow-renderer';

const App: React.FC = () => {
  const addNode = useBoardStore((state) => state.addNode);

  // Handler to add a product as a node to the board
  const handleAddProduct = (product: any) => {
    const newNode: Node = {
      id: `${product.id}-${Date.now()}`,
      type: 'default',
      position: { x: 100, y: 100 },
      data: { ...product },
    };
    addNode(newNode);
  };

  return (
    <div className="flex h-screen">
      <Sidebar onAddProduct={handleAddProduct} />
      <Board />
      <SummaryBar />
    </div>
  );
};

export default App;