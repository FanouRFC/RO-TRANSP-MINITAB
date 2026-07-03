import React, { useContext } from 'react';
import { MinitabContext } from "../../Context/MinitabContext";
import {
    IterationGraph,
    StepsLayoutTitle,
    StepsLayoutContainer,
} from "./IterationStepsLayout.Style";
import GraphPotentiel from '../../Component/Graph/graphPot';

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

                        </div>

                    ))}

                </StepsLayoutContainer>

            </div>
        </IterationGraph>
    );
};

export default IterationStepsLayout;