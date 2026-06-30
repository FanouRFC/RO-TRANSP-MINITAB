import React from "react";
import { BaseEdge, EdgeLabelRenderer, getStraightPath } from "reactflow";

export default function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    markerEnd,
    style,
    data,
}) {
    const [edgePath, labelX, labelY] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    const index = data?.index ?? 0;

    // décalage plus stable (évite overlap)
    const offsetX = (index % 3 === 0) ? -25 : (index % 3 === 1 ? 0 : 25);
    const offsetY = (index % 2 === 0) ? -10 : 10;

    return (
        <>
            <BaseEdge
                id={id}
                path={edgePath}
                markerEnd={markerEnd}
                style={style}
            />

            <EdgeLabelRenderer>
                <div
                    style={{
                        position: "absolute",
                        transform: `translate(-50%, -50%) translate(${labelX + offsetX}px, ${labelY + offsetY}px)`,
                        background: "#fff",
                        padding: "2px 6px",
                        borderRadius: 4,
                        fontWeight: 600,
                        fontSize: 13,
                        pointerEvents: "none",
                        border: "1px solid #ddd",
                        whiteSpace: "nowrap",
                    }}
                >
                    {data?.label}
                </div>
            </EdgeLabelRenderer>
        </>
    );
}