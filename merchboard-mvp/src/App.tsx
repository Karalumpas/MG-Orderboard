import React from 'react';
import { Board } from './components/Board';
import { Sidebar } from './components/Sidebar';
import { SummaryBar } from './components/SummaryBar';

const App: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Board />
      <SummaryBar />
    </div>
  );
};

export default App;