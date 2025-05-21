import create from 'zustand';
import { Node, Edge } from 'react-flow-renderer';
import { Product } from '../types/product';

interface ProductNodeData {
  product: Product;
  quantity: number;
  customizations: string[];
}

interface BoardState {
  nodes: Node<ProductNodeData>[];
  edges: Edge[];
  setNodes: (nodes: Node<ProductNodeData>[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: Node<ProductNodeData>) => void;
  updateNode: (id: string, data: Partial<ProductNodeData>) => void;
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
  updateNode: (id, data) => set((state) => ({
    nodes: state.nodes.map((node) =>
      node.id === id ? { ...node, data: { ...node.data, ...data } } : node
    ),
  })),
  get totalItems() {
    return get().nodes.reduce((sum, node) => sum + (node.data?.quantity || 1), 0);
  },
  get totalPrice() {
    return get().nodes.reduce((sum, node) =>
      sum + (node.data?.product.price || 0) * (node.data?.quantity || 1), 0);
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