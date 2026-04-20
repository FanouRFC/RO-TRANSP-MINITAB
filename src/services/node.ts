import { Position } from "@xyflow/react";
import type { CSSProperties } from "react";
import type { Node } from "@xyflow/react";

type NodeData = {
  id: string;
  label: string;
  type: "left" | "right";
  value?: number;
};

export function createNodes(nodesData: NodeData[]): Node[] {
  const nodes: Node[] = [];

  const leftNodes = nodesData.filter(n => n.type === "left");
  const rightNodes = nodesData.filter(n => n.type === "right");

  const gap = 100;

  // hauteur totale de chaque colonne
  const leftHeight = (leftNodes.length - 1) * gap;
  const rightHeight = (rightNodes.length - 1) * gap;

  // on centre par rapport à la plus grande colonne
  const maxHeight = Math.max(leftHeight, rightHeight);

  const leftStartY = (maxHeight - leftHeight) / 2;
  const rightStartY = (maxHeight - rightHeight) / 2;

  let yLeft = leftStartY;
  let yRight = rightStartY;

  for (const n of nodesData) {
    if (n.type === "left") {
      nodes.push({
        id: `v-${n.id}`,
        position: { x: -60, y: yLeft },
        sourcePosition: Position.Right,
        targetPosition: Position.Right,
        data: { label: n.value },
        type: "input",
        style: {
          border: 0,
          width: 50,
          fontWeight: 700,
          background: "transparent",
        },
      });

      nodes.push({
        id: n.id,
        position: { x: 0, y: yLeft },
        data: { label: n.label },
        sourcePosition: Position.Right,
        targetPosition: Position.Right,
        style: {
          borderRadius: 50,
          width: 50,
        } as CSSProperties,
      });

      yLeft += gap;
    } else {
      nodes.push({
        id: n.id,
        position: { x: 300, y: yRight },
        data: { label: n.label },
        sourcePosition: Position.Left,
        targetPosition: Position.Left,
        style: {
          borderRadius: 50,
          width: 50,
        },
      });

      nodes.push({
        id: `v-${n.id}`,
        position: { x: 360, y: yRight },
        data: { label: n.value },
        sourcePosition: Position.Left,
        targetPosition: Position.Left,
        type: "input",
        style: {
          border: 0,
          fontWeight: 700,
          background: "transparent",
          width: 50,
        },
      });

      yRight += gap;
    }
  }

  return nodes;
}