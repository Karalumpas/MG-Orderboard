import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/board';
import ReactFlow, { MiniMap, Controls, Background } from 'react-flow-renderer';

const Board: React.FC = () => {
  const { nodes, edges, setNodes, setEdges } = useStore();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const onNodesChange = (changes: any) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  };

  const onEdgesChange = (changes: any) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  };

  const onConnect = (params: any) => setEdges((eds) => addEdge(params, eds));

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
      const newZoom = reactFlowWrapper.current?.zoom * zoomFactor;
      reactFlowWrapper.current?.setZoom(newZoom);
    };

    const wrapper = reactFlowWrapper.current;
    wrapper?.addEventListener('wheel', handleWheel);

    return () => {
      wrapper?.removeEventListener('wheel', handleWheel);
    };
  }, []);

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