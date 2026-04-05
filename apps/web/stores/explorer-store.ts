import { create } from 'zustand';
import type { Node, Edge } from '../components/explorer/nodes';

interface ExplorerState {
  nodes: Node[];
  edges: Edge[];
  selectedNode: string | null;
  zoomLevel: number;
  showDawnOverlay: boolean;
  dawnContext: string | null;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setSelectedNode: (id: string | null) => void;
  setZoomLevel: (level: number) => void;
  showDawn: (nodeId: string) => void;
  hideDawn: () => void;
}

export const useExplorerStore = create<ExplorerState>((set) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  zoomLevel: 1,
  showDawnOverlay: false,
  dawnContext: null,
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  setSelectedNode: (id) => set({ selectedNode: id }),
  setZoomLevel: (level) => set({ zoomLevel: level }),
  showDawn: (nodeId) => set({ showDawnOverlay: true, dawnContext: nodeId, selectedNode: nodeId }),
  hideDawn: () => set({ showDawnOverlay: false, dawnContext: null }),
}));
