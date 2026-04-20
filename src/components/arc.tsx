import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect, useState } from "react";
import type { Node, Edge } from "@xyflow/react";
import { createNodes } from "../services/node";
import { createEdge } from "../services/edge";
import { getArcTable } from "../services/Minitab";
import CustomEdge from "./edge";
import type { NodeData } from "../types/arc";

type ArcProps = {
  nodesData: NodeData[];
  transportTable: number[][];
  transportTableSolution: number[][];
};

export default function Arc({
  transportTable,
  transportTableSolution,
  nodesData,
}: ArcProps) {
  const [ArcNodes, setNodes] = useState<Node[]>([]);
  const [ArcEdges, setEdges] = useState<Edge[]>([]);
  const edgeTypes = {
    "custom-edge": CustomEdge,
  };

  useEffect(() => {
    var n = createNodes(nodesData);
    setNodes(n);
    var ArcsFromTable = getArcTable(transportTable, transportTableSolution);
    var e = createEdge(ArcsFromTable);
    setEdges(e);
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
