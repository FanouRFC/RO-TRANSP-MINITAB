import React, { useContext } from 'react';
import { MinitabContext } from "../../Context/MinitabContext";
import {
    IterationGraph,
    StepsLayoutTitle,
    StepsLayoutContainer,
} from "./IterationStepsLayout.Style";
import GraphPotentiel from '../../Component/Graph/graphPot';
import OptimisedDelta from '../../Component/SolutionMatrix/optimisationDelta';

const IterationStepsLayout = () => {
    const { minitabData } = useContext(MinitabContext);

    if (!minitabData.etapesData?.iterationsOptimisation) {
        return null;
    }

    return (
        <IterationGraph>
            <div className="solution-container">
                    <h3>Étapes Stepping Stone</h3>

                <StepsLayoutContainer>
                    {minitabData.etapesData.iterationsOptimisation.map((etape, index) => (

                        <div className="solutions" key={index}>

                            <p className="solutions-title">
                                Étape {index + 1}
                            </p>
                                {/* Extra steps */}
                            <h4>Étapes potentiels</h4>
                            <div>
                                <GraphPotentiel
                                    currentSolution={etape.currentSolution}
                                    etatPotentiel={{}}
                                    showMid={false}
                                />
                            </div>
                            <div>
                                <GraphPotentiel
                                    currentSolution={etape.currentSolution}
                                    etatPotentiel={{}}
                                    showMid={true}
                                />
                            </div>
                            {
                                etape.potentiels.map((etapePotentiel, idxPotentiel) => (
                                    <div key={idxPotentiel}>
                                        <GraphPotentiel
                                            currentSolution={etape.currentSolution}
                                            etatPotentiel={etapePotentiel.etatPotentiels}
                                        />
                                    </div>
                                ))
                            }
                            <h4>Étapes deltas</h4>
                            {
                                etape.deltas.map((etapeDelta, idxDelta) => (
                                    <div key={idxDelta}>
                                        <p>{etapeDelta.calcul}</p>
                                    </div>
                                ))
                            }
                            <h4>Étapes gains</h4>
                            {
                                etape.optimisation?.cheminsEvalues.map((etapeGain, idxGain) => {
                                        const deltaMatch = etape.deltas.find(
                                            d => d.case === etapeGain.caseEntrante
                                        );
                                        const [, a, b] = etapeGain.caseEntrante.match(/^a(\d+)b(\d+)$/);
                                        const A = parseInt(a, 10);
                                        const B = parseInt(b, 10);
                                        let quantiteMax = etapeGain.quantiteMax;
                                        let gainTotal = etapeGain.gainTotal;
                                        if (Math.abs(quantiteMax) == 0.000001)
                                        {
                                            if (quantiteMax < 0)
                                            {
                                                quantiteMax = "-ε";
                                            }
                                            else
                                            {
                                                quantiteMax = "ε";
                                            }
                                        }
                                        if (Math.abs(gainTotal) == 0.000001)
                                        {
                                            if (gainTotal < 0)
                                            {
                                                gainTotal = "-ε";
                                            }
                                            else
                                            {
                                                gainTotal = "ε";
                                            }
                                        }

                                        return (
                                            <div key={idxGain}>
                                                <p>
                                                    {deltaMatch.calcul}
                                                </p>
                                                <OptimisedDelta
                                                    nbLigne={minitabData.nbLigne}
                                                    nbColonne={minitabData.nbColonne}
                                                    // etatMatrice={etape.etatMatrice}
                                                    originalMatrix={minitabData.cout}
                                                    solution={etapeGain.preOptimalSolution}
                                                    signes={etapeGain.signe}
                                                />
                                                <p>
                                                    {`gain (${String.fromCharCode('A'.charCodeAt(0) + A - 1)}, ${B}) = ${etapeGain.coutMarginal} x ${quantiteMax} = ${gainTotal}`}
                                                </p>
                                            </div>
                                        );
                                })
                            }
                            <h4>Gain retenu</h4>
                            {
                                (() =>
                                {
                                    try{
                                        const [, a, b] = etape.optimisation?.cheminChoisi.caseEntrante.match(/^a(\d+)b(\d+)$/);
                                        const A = parseInt(a, 10);
                                        const B = parseInt(b, 10);
                                        let quantiteeDeplace = etape.optimisation?.cheminChoisi.quantiteDeplacee;
                                        let total = etape.optimisation?.cheminChoisi.gainAmelioration;
                                        if (Math.abs(quantiteeDeplace) == 0.000001)
                                        {
                                            if (quantiteeDeplace < 0)
                                            {
                                                quantiteeDeplace = "-ε";
                                            }
                                            else
                                            {
                                                quantiteeDeplace = "ε";
                                            }
                                        }
                                        if (Math.abs(total) == 0.000001)
                                        {
                                            if (total < 0)
                                            {
                                                total = "-ε";
                                            }
                                            else
                                            {
                                                total = "ε";
                                            }
                                        }
                                        return <p>{`gain (${String.fromCharCode('A'.charCodeAt(0) + A - 1)}, ${B}) = ${etape.optimisation?.cheminChoisi.coutMarginal} x ${quantiteeDeplace} = ${total}`}</p>
                                    }
                                    catch{}
                                })()
                            }

                        </div>

                    ))}

                </StepsLayoutContainer>

            </div>
        </IterationGraph>
    );
};

export default IterationStepsLayout;