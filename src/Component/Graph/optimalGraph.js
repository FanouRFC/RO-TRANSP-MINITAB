import React, { useContext } from 'react';
import ReactFlow from 'reactflow';
import { MinitabContext } from '../../Context/MinitabContext';
import CustomEdge from './customEdge';

import 'reactflow/dist/style.css';

function FinalSGraph() {
    const { minitabData } = useContext(MinitabContext);

    let initialNodes = [];
    let lettre = 'A';

    // Noeuds de gauche (A, B, C...)
    for (let i = 1; i <= parseInt(minitabData.nbLigne); i++) {
        initialNodes.push({
            id: 'a' + i,
            type: 'input',
            sourcePosition: 'right',
            targetPosition: 'left',
            position: { x: 10, y: 24 + 80 * (i - 1) },
            data: {
                label: lettre,
            },
            style: {
                boxSizing: 'border-box',
                color: '#005162',
                fontSize: '14px',
                borderRadius: '24px',
                width: '48px',
                height: '48px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#ffffff',
                border: 'none',
                fontFamily: 'Orbitron',
                fontWeight: '600',
                boxShadow:
                    '0 2px 4px 0 rgba(0,0,0,0.08), 0 4px 10px 0 rgba(0,0,0,0.08)',
            },
        });

        lettre = String.fromCharCode(lettre.charCodeAt(0) + 1);
    }

    // Noeuds de droite (1,2,3...)
    for (let i = 1; i <= parseInt(minitabData.nbColonne); i++) {
        initialNodes.push({
            id: 'b' + i,
            type: 'output',
            sourcePosition: 'right',
            targetPosition: 'left',
            position: { x: 260, y: 24 + 80 * (i - 1) },
            data: {
                label: i,
            },
            style: {
                boxSizing: 'border-box',
                color: '#005162',
                fontSize: '14px',
                borderRadius: '24px',
                width: '48px',
                height: '48px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#ffffff',
                border: 'none',
                fontFamily: 'Orbitron',
                fontWeight: '600',
                boxShadow:
                    '0 2px 4px 0 rgba(0,0,0,0.08), 0 4px 10px 0 rgba(0,0,0,0.08)',
            },
        });
    }

    const initialEdges = [];
    const nodes = Object.keys(minitabData.finalSolution);

    for (let i = 0; i < nodes.length; i++) {
        initialEdges.push({
    id: nodes[i],
    source: nodes[i].slice(0, 2),
    target: nodes[i].slice(2, 4),

    type: 'custom',

    data: {
        label:
            Math.round(minitabData.finalSolution[nodes[i]]) === 0
                ? "ε"
                : Math.round(minitabData.finalSolution[nodes[i]]),
        index: i,
    },

    markerEnd: {
        type: 'arrowclosed',
    },

    style: {
        stroke: '#000',
        strokeWidth: 2,
    },
});
    }

    const edgeTypes = {
            custom: CustomEdge,
        };

    return (
        <div className="graph" style={{ width: '360px', height: '540px' }}>
            <ReactFlow
                nodes={initialNodes}
                edges={initialEdges}
                edgeTypes={edgeTypes}
                fitView
            />
        </div>
    );
}

export default FinalSGraph;