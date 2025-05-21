import create from 'zustand';
import { Node, Edge } from 'react-flow-renderer';
import { Product } from '../types/product';

interface BoardState {
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: Node) => void;
  totalItems: number;
  totalPrice: number;
  downloadCart: () => void;
}

const useBoardStore = create<BoardState>((set, get) => ({
  nodes: [],
  edges: [],
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
  get totalItems() {
    return get().nodes.length;
  },
  get totalPrice() {
    // Sum all product prices (assumes product data is in node.data)
    return get().nodes.reduce((sum, node) => sum + (node.data?.price || 0), 0);
  },
  downloadCart: () => {
    const cart = { nodes: get().nodes, edges: get().edges };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cart, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = 'cart.json';
    a.click();
  },
}));

export default useBoardStore;