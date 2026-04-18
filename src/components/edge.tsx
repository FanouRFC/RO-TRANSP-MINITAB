import {
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
  type EdgeProps,
} from "@xyflow/react";

// Natao EdgeProps<any> mba hialana ny erreur de typage non critique
const CustomEdge = ({ id, data, markerEnd, ...props }: EdgeProps<any>) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY,
    sourcePosition: props.sourcePosition,
    targetPosition: props.targetPosition,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-70%, -90%) translate(${labelX}px,${labelY + (data.labelOffsetY ?? 0)}px)`,
            borderRadius: 5,
            fontSize: 10,
            fontWeight: 700,
            padding: "0 2px",
          }}
          className="nodrag nopan"
        >
          {data.label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
