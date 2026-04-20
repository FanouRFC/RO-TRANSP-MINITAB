import { MarkerType, type Edge } from "@xyflow/react";
import type { CSSProperties } from "react";
import type { EdgesData } from "../types/arc";

const customStyle = {
    style: {
      strokeWidth: 1,
      stroke: "black",
    } as CSSProperties,
    label: "5x",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      strokeWidth: 3,
      color: "black",
    },
    labelX: 50,
    labelY: 10,
  };

export function createEdge(edgesData: EdgesData[]) {
  const edgeTemp: Edge[] = [];

  const sourceCount: Record<string, number> = {};
  const sourceIndex: Record<string, number> = {};

  // compter les arcs par source
  for (const value of edgesData) {
    sourceCount[value.X] = (sourceCount[value.X] || 0) + 1;
  }

  for (const value of edgesData) {
    const index = sourceIndex[value.X] || 0;
    sourceIndex[value.X] = index + 1;

    const total = sourceCount[value.X];

    const offsetY =  (index - (total - 1) / 2) * 20;

    edgeTemp.push({
      id: `n${value.X}-n${value.Y}`,
      source: value.X,
      target: value.Y,
      type: "custom-edge",
      data: {
        label: String(value.Cxy),
        labelOffsetY: offsetY,
      },
      style: customStyle.style,
      markerEnd: customStyle.markerEnd,
    });
  }

  return edgeTemp;
}