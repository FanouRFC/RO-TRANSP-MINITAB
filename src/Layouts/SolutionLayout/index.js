import React, { useContext } from 'react';
import { MinitabContext } from '../../Context/MinitabContext';
import { Graph, GifContainer, SolutionLayoutTitle, SolutionLayoutContainer, TagDeg } from './SolutionLayout.Style';
import BaseSGraph from '../../Component/Graph';
import FinalSGraph from '../../Component/Graph/optimalGraph';
import "../../App.css";

const SolutionLayout = () => {
    const { minitabData } = useContext(MinitabContext);

    return (
        <Graph>
            {/* Affichage du GIF de chargement si activé */}
            {minitabData.isGifDisplayed && (
                <GifContainer>
                    <div>{' '}</div>
                </GifContainer>
            )}

            <div className='solution-container'>
                {/* Le titre reste visible pour structurer la page même sans données */}
                <SolutionLayoutTitle>
                    <h3>Résultats</h3>
                </SolutionLayoutTitle>
                
                <SolutionLayoutContainer>
                    {minitabData.baseSolution ? (
                        <>
                            {/* --- BLOC 1 : SOLUTION DE BASE --- */}
                            <div className='solutions'>
                                <p className='solutions-title'>
                                    Solution de base {"(Minitab)"} {minitabData.casD && (<TagDeg>Cas Dégénéré</TagDeg>)}
                                </p>
                                
                                <table className="transport-table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            {Array.from({ length: minitabData.nbColonne }, (_, i) => (
                                                <th key={i}>{i + 1}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.from({ length: minitabData.nbLigne }, (_, i) => (
                                            <tr key={i}>
                                                <th>{String.fromCharCode(65 + i)}</th>
                                                {Array.from({ length: minitabData.nbColonne }, (_, j) => {
                                                    const key = `a${i + 1}b${j + 1}`;
                                                    const value = minitabData.baseSolution[key];

                                                    return (
                                                        <td key={j}>
                                                            {value !== undefined ? (value === 0.000001 ? "ε" : value) : "-"}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                
                                <p className='solutions-p'>
                                    Voici la représentation graphique de la solution de base dont le coût total de transport est de :
                                    <br/><br/>
                                    <span> Z = {minitabData.zBase}</span>
                                </p>
                                <BaseSGraph />
                            </div>

                            {/* --- BLOC 2 : SOLUTION OPTIMALE --- */}
                            <div className='solutions'>
                                <p className='solutions-title'>
                                    Solution optimale
                                </p>
                                
                                <table className="transport-table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            {Array.from({ length: minitabData.nbColonne }, (_, i) => (
                                                <th key={i}>{i + 1}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.from({ length: minitabData.nbLigne }, (_, i) => (
                                            <tr key={i}>
                                                <th>{String.fromCharCode(65 + i)}</th>
                                                {Array.from({ length: minitabData.nbColonne }, (_, j) => {
                                                    const key = `a${i + 1}b${j + 1}`;
                                                    const value = minitabData.finalSolution?.[key];
                                                    
                                                    return (
                                                        <td key={j}>
                                                            {value !== undefined ? (Math.round(value) === 0 ? "ε" : Math.round(value)) : "-"}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                
                                <p className='solutions-p'>
                                    Voici la représentation graphique de la solution optimale dont le coût total de transport est de :
                                    <br/><br/>
                                    <span>Z = {minitabData.zOptimal}</span>
                                </p>
                                <FinalSGraph />
                            </div>
                        </>
                    ) : (
                        /* Message de secours si debugState ou minitabData n'a pas encore chargé baseSolution */
                        <div style={{ padding: '20px', textAlign: 'center', color: '#64748b', fontStyle: 'italic' }}>
                            En attente du calcul ou de la génération des solutions de base...
                        </div>
                    )}
                </SolutionLayoutContainer>
            </div>
        </Graph>
    );
};

export default SolutionLayout;