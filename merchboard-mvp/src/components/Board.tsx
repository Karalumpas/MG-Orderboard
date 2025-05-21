import React, { useEffect, useRef } from 'react';
import useBoardStore from '../store/board';
import ReactFlow, { MiniMap, Controls, Background, applyNodeChanges, applyEdgeChanges, addEdge, NodeChange, EdgeChange, Connection } from 'react-flow-renderer';

const Board: React.FC = () => {
  const { nodes, edges, setNodes, setEdges } = useBoardStore();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const onNodesChange = (changes: NodeChange[]) => {
    setNodes(applyNodeChanges(changes, nodes));
  };

  const onEdgesChange = (changes: EdgeChange[]) => {
    setEdges(applyEdgeChanges(changes, edges));
  };

  const onConnect = (params: Connection) => setEdges(addEdge(params, edges));

  // Pan & zoom is handled by React Flow, so no need for manual wheel event

  return (
    <div className="h-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Board;