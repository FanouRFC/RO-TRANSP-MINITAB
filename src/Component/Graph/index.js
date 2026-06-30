import React, { useContext } from 'react';
import ReactFlow from 'reactflow';
import { MinitabContext } from '../../Context/MinitabContext';
import CustomEdge from './customEdge';

import 'reactflow/dist/style.css';

function BaseSGraph() {
    const { minitabData } = useContext(MinitabContext);

    let initialNodes = [];
    let lettre = 'A';

    for (let i = 1; i <= parseInt(minitabData.nbLigne); i++) {
        initialNodes.push({
            id: 'a' + i,
            type: 'input',
            position: { x: 10, y: 24 + 80 * (i - 1) },
            data: { label: lettre },
            style: {
                width: 48,
                height: 48,
                borderRadius: 24,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#fff',
                fontWeight: 600,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            },
        });

        lettre = String.fromCharCode(lettre.charCodeAt(0) + 1);
    }

    for (let i = 1; i <= parseInt(minitabData.nbColonne); i++) {
        initialNodes.push({
            id: 'b' + i,
            type: 'output',
            position: { x: 260, y: 24 + 80 * (i - 1) },
            data: { label: i },
            style: {
                width: 48,
                height: 48,
                borderRadius: 24,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#fff',
                fontWeight: 600,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            },
        });
    }

    const initialEdges = Object.keys(minitabData.baseSolution).map((key, i) => ({
        id: key,
        source: key.slice(0, 2),
        target: key.slice(2, 4),
        type: "custom",

        data: {
            label:
                Math.round(minitabData.baseSolution[key]) === 0
                    ? "ε"
                    : Math.round(minitabData.baseSolution[key]),
            index: i,
        },

        markerEnd: { type: "arrowclosed" },

        style: {
            stroke: "#000",
            strokeWidth: 2,
        },
    }));

    const edgeTypes = {
        custom: CustomEdge,
    };

    return (
        <div className="graph" style={{ width: 360, height: 540, position: "relative" }}>
            <ReactFlow
                nodes={initialNodes}
                edges={initialEdges}
                edgeTypes={edgeTypes}
                fitView
            />
        </div>
    );
}

export default BaseSGraph;