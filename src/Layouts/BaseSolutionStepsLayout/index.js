import React, { useContext } from "react";
import { MinitabContext } from "../../Context/MinitabContext";
import {
    StepsGraph,
    StepsLayoutTitle,
    StepsLayoutContainer,
} from "./BaseSolutionStepsLayout.Style";

import CostMatrix from "../../Component/CostMatrix";
import SolutionMatrix from "../../Component/SolutionMatrix";

const BaseSolutionStepsLayout = () => {

    const { minitabData } = useContext(MinitabContext);

    if (!minitabData.etapesData?.solutionDeBase) {
        return null;
    }

    return (
        <StepsGraph>
            <div className="solution-container">

                <StepsLayoutTitle>
                    <h3>Étapes de génération de la solution de base</h3>
                </StepsLayoutTitle>

                <StepsLayoutContainer>

                    {minitabData.etapesData.solutionDeBase.map((etape, index) => {
                        // if (minitabData.casD && index + 1 == minitabData.etapesData.solutionDeBase.length) return(<></>);
                        return (
                            <div className="solutions" key={index}>

                                <p className="solutions-title">
                                    Étape {index + 1}
                                </p>

                                {/* 🔥 2 MATRICES COTE A COTE */}
                                <div className="step-matrices">

                                    <div className="matrix-box">
                                        <CostMatrix
                                            nbLigne={minitabData.nbLigne}
                                            nbColonne={minitabData.nbColonne}
                                            etatMatrice={etape.etatMatrice}
                                            disponibilites={minitabData.a}
                                            demandes={minitabData.b}
                                            originalMatrix={minitabData.cout}
                                        />
                                    </div>

                                    <div className="matrix-box">
                                        <SolutionMatrix
                                            nbLigne={minitabData.nbLigne}
                                            nbColonne={minitabData.nbColonne}
                                            etatMatrice={etape.etatMatrice}
                                            solution={etape.solutionIntermediaire}
                                            disponibilites={etape.disponibilitesRestantes}
                                            demandes={etape.demandesRestantes}
                                        />
                                    </div>

                                </div>

                                {/* {etape.action && (
                                    <p className="solutions-p">
                                        {etape.action}
                                    </p>
                                )} */}

                            </div>

                        );
                    })}

                </StepsLayoutContainer>

            </div>
        </StepsGraph>
    );
};

export default BaseSolutionStepsLayout;