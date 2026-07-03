import React, { useContext } from 'react';
import ReactFlow from 'reactflow';
import { MinitabContext } from '../../Context/MinitabContext';
import CustomEdge from './customEdge';
import { Handle, Position } from "reactflow";

import 'reactflow/dist/style.css';
function CustomNode({ data }) {
    return (
        <div style={{ position: "relative", width: 48, height: 48 }}>
            
            {/* HANDLE LEFT (entrée) */}
            <Handle type="target" position={Position.Left} />

            {/* potentiel gauche */}
            {data.leftValue !== undefined && (
                <div style={{
                    position: "absolute",
                    left: -30,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: 12,
                    color: "gray"
                }}>
                    {data.leftValue}
                </div>
            )}

            {/* node */}
            <div style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600
            }}>
                {data.label}
            </div>

            {/* HANDLE RIGHT (sortie) */}
            <Handle type="source" position={Position.Right} />

            {/* potentiel droit */}
            {data.rightValue !== undefined && (
                <div style={{
                    position: "absolute",
                    right: -30,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: 12,
                    color: "gray"
                }}>
                    {data.rightValue}
                </div>
            )}
        </div>
    );
}

function GraphPotentiel({ currentSolution, etatPotentiel , showMid = true}) {
    const { minitabData } = useContext(MinitabContext);

    let initialNodes = [];
    let lettre = 'A';

    const nodes = Object.keys(currentSolution);
    // console.log("EtatPotentiel", etatPotentiel)

    // Noeuds de gauche (A, B, C...)
    for (let i = 1; i <= parseInt(minitabData.nbLigne); i++) {        
        initialNodes.push({
            id: 'a' + i,
            type: 'custom',
            sourcePosition: 'right',
            targetPosition: 'left',
            position: { x: 10, y: 24 + 80 * (i - 1) },
            data: {
                label: lettre,
                leftValue: etatPotentiel?.[`a${i}`] ?? ""
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
            type: 'custom',
            sourcePosition: 'right',
            targetPosition: 'left',
            position: { x: 260, y: 24 + 80 * (i - 1) },
            data: {
                label: i,
                rightValue: etatPotentiel?.[`b${i}`] ?? ""
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
    if(showMid)
    {
        for (let i = 0; i < nodes.length; i++) {
            const [, a, b] = nodes[i].match(/^a(\d+)b(\d+)$/);
            const ligne = parseInt(a, 10);
            const colonne = parseInt(b, 10);
            const index = (ligne - 1) * Number(minitabData.nbColonne) + (colonne - 1);
            // console.log("valeur : ", parseInt(minitabData.cout[index], 10))
            initialEdges.push({
                id: nodes[i],
                source: `a${ligne}`,
                target: `b${colonne}`,

                type: 'custom',

                data: {
                    label: showMid? (parseInt(minitabData.cout[index], 10) === 0? "ε": parseInt(minitabData.cout[index], 10))
                            : "",
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
                nodeTypes={{custom: CustomNode}}
                fitView
            />
        </div>
    );
}

export default GraphPotentiel;