import {
  ReactFlow,
  Background,
  Controls,
  MarkerType,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { CSSProperties } from "react";
import CustomEdge from "./edge";

export default function Arc() {
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

  const edgeTypes = {
    "custom-edge": CustomEdge,
  };

  const initialNodes = [
    {
      id: "vx1",
      position: { x: -70, y: 0 },
      sourcePosition: Position.Right,
      data: { label: "50" },
      type: "input",
      isConnectable: false,
      style: {
        borderRadius: 100,
        border: 0,
        width: 50,
        background: "transparent",
      },
    },
    {
      id: "n1",
      position: { x: 0, y: 0 },
      sourcePosition: Position.Right,
      data: { label: "A" },
      type: "input",
      style: {
        borderRadius: 100,
      },
    },
    {
      id: "n2",
      position: { x: 300, y: 0 },
      targetPosition: Position.Left,
      data: { label: "1" },
      style: {
        borderRadius: 100,
      },
    },
    {
      id: "vy1",
      position: { x: 470, y: 0 },
      sourcePosition: Position.Left,
      data: { label: "50" },
      type: "input",
      connectable: false,
      style: {
        borderRadius: 100,
        border: 0,
        width: 50,
        background: "transparent",
      },
    },
    {
      id: "vx2",
      position: { x: -70, y: 50 },
      sourcePosition: Position.Right,
      data: { label: "50" },
      isConnectable: false,
      type: "input",
      style: {
        borderRadius: 100,
        border: 0,
        width: 50,
        background: "transparent",
      },
    },
    {
      id: "n3",
      position: { x: 0, y: 50 },
      sourcePosition: Position.Right,
      data: { label: "B" },
      type: "input",
      style: {
        borderRadius: 100,
      },
    },
    {
      id: "n4",
      position: { x: 300, y: 50 },
      targetPosition: Position.Left,
      data: { label: "2" },
      style: {
        borderRadius: 100,
      },
    },
    {
      id: "vy2",
      position: { x: 470, y: 50 },
      sourcePosition: Position.Left,
      data: { label: "50" },
      type: "input",
      style: {
        borderRadius: 100,
        border: 0,
        width: 50,
        background: "transparent",
      },
    },
    {
      id: "vx3",
      position: { x: -70, y: 100 },
      sourcePosition: Position.Right,
      data: { label: "50" },
      type: "input",
      style: {
        borderRadius: 100,
        border: 0,
        width: 50,
        background: "transparent",
      },
    },
    {
      id: "n5",
      position: { x: 0, y: 100 },
      sourcePosition: Position.Right,
      data: { label: "C" },
      type: "input",
      style: {
        borderRadius: 100,
      },
    },
    {
      id: "n6",
      position: { x: 300, y: 100 },
      targetPosition: Position.Left,
      data: { label: "3" },
      style: {
        borderRadius: 100,
      },
    },
    {
      id: "vy3",
      position: { x: 470, y: 100 },
      sourcePosition: Position.Left,
      data: { label: "50x" },
      type: "input",
      style: {
        borderRadius: 100,
        border: 0,
        width: 50,
        background: "transparent",
      },
    },
  ];

  const initialEdges = [
    {
      id: "n1-n2",
      source: "n1",
      target: "n2",
      type: "custom-edge",
      data: {
        label: "69",
      },
      style: customStyle.style,
      label: customStyle.label,
      markerEnd: customStyle.markerEnd,
      labelX: customStyle.labelX,
      labelY: customStyle.labelY,
    },
    {
      id: "n1-n4",
      source: "n1",
      target: "n4",
      type: "custom-edge",
      data: {
        label: "692",
        labelOffsetY: -10,
      },
      style: customStyle.style,
      label: customStyle.label,
      markerEnd: customStyle.markerEnd,
    },
    {
      id: "n1-n6",
      source: "n1",
      target: "n6",
      type: "custom-edge",
      data: {
        label: "6944",
        labelOffsetY: -10,
      },
      style: customStyle.style,
      label: customStyle.label,
      markerEnd: customStyle.markerEnd,
    },
    {
      id: "n3-n4",
      source: "n3",
      target: "n4",
      type: "custom-edge",
      data: {
        label: "68",
        labelOffsetY: 15,
      },
      style: customStyle.style,
      label: "6000000",
      markerEnd: customStyle.markerEnd,
    },
    {
      id: "n5-n6",
      source: "n5",
      target: "n6",
      type: "custom-edge",
      data: {
        label: "69",
      },
      style: customStyle.style,
      label: customStyle.label,
      markerEnd: customStyle.markerEnd,
    },
  ];
  return (
    <div style={{ height: "50%", width: "100%" }}>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        edgeTypes={edgeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
