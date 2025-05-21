import create from 'zustand';
import { ProductNode } from '../types/product';

interface BoardState {
  nodes: ProductNode[];
  addNode: (node: ProductNode) => void;
  moveNode: (id: string, x: number, y: number) => void;
  deleteNode: (id: string) => void;
  clearBoard: () => void;
  loadBoard: (nodes: ProductNode[]) => void;
}

const useBoardStore = create<BoardState>((set) => ({
  nodes: [],
  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
  moveNode: (id, x, y) => set((state) => ({
    nodes: state.nodes.map((node) =>
      node.id === id ? { ...node, position: { x, y } } : node
    ),
  })),
  deleteNode: (id) => set((state) => ({
    nodes: state.nodes.filter((node) => node.id !== id),
  })),
  clearBoard: () => set({ nodes: [] }),
  loadBoard: (nodes) => set({ nodes }),
}));

export default useBoardStore;