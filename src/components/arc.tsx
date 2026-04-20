import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect, useState } from "react";
import type { Node, Edge } from "@xyflow/react";
import { createNodes } from "../services/node";
import { createEdge } from "../services/edge";
import CustomEdge from "./edge";
import type { EdgesData, NodeData } from "../types/arc";

type ArcProps = {
  nodesData: NodeData[];
  edgesData: EdgesData[];
};

export default function Arc({ edgesData, nodesData }: ArcProps) {
  const [ArcNodes, setNodes] = useState<Node[]>([]);
  const [ArcEdges, setEdges] = useState<Edge[]>([]);

  const edgeTypes = {
    "custom-edge": CustomEdge,
  };

  useEffect(() => {
    setNodes(createNodes(nodesData));
    setEdges(createEdge(edgesData));
  }, []);

  return (
    <div className="mx-10 w-1/2 h-full border rounded-xl">
      <ReactFlow nodes={ArcNodes} edgeTypes={edgeTypes} edges={ArcEdges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
