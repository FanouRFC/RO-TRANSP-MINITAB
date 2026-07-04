import React, { useContext, useState } from "react";
import { MinitabContext } from "../../Context/MinitabContext";
import {
    StepsGraph,
    StepsLayoutTitle,
    StepsLayoutContainer,
    NavigationStepsBar,
} from "./BaseSolutionStepsLayout.Style";

import CostMatrix from "../../Component/CostMatrix";
import SolutionMatrix from "../../Component/SolutionMatrix";

const BaseSolutionStepsLayout = () => {
    const { minitabData } = useContext(MinitabContext);
    
    // État local pour piloter la navigation étape par étape
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    // Sécurité si les données ne sont pas prêtes
    if (!minitabData.etapesData?.solutionDeBase) {
        return null;
    }

    const listeEtapes = minitabData.etapesData.solutionDeBase;
    const totalEtapes = listeEtapes.length;
    const etapeCourante = listeEtapes[currentStepIndex];

    // Fonctions de navigation
    const etapeSuivante = () => {
        if (currentStepIndex < totalEtapes - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        }
    };

    const etapePrecedente = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
        }
    };

    return (
        <StepsGraph>
            <div className="solution-container">
                
                {/* --- TITRE DE LA PAGE --- */}
                <StepsLayoutTitle>
                    <h3>Étapes de génération de la solution de base</h3>
                </StepsLayoutTitle>

                {/* --- BARRE DE NAVIGATION (Suivant / Précédent) --- */}
                <NavigationStepsBar>
                    <div className="progress-text">
                        Étape {currentStepIndex + 1} sur {totalEtapes}
                    </div>
                    <div className="nav-buttons">
                        <button 
                            className="btn-nav" 
                            onClick={etapePrecedente} 
                            disabled={currentStepIndex === 0}
                        >
                            ← Précédent
                        </button>
                        <button 
                            className="btn-nav primary" 
                            onClick={etapeSuivante} 
                            disabled={currentStepIndex === totalEtapes - 1}
                        >
                            Suivant →
                        </button>
                    </div>
                </NavigationStepsBar>

                {/* --- CONTENEUR DE L'ÉTAPE ACTIVE --- */}
                <StepsLayoutContainer>
                    {etapeCourante && (
                        <div className="solutions">
                            
                            <p className="solutions-title">
                                Détails de l'Étape {currentStepIndex + 1}
                            </p>

                            {/* Les deux matrices disposées proprement */}
                            <div className="step-matrices">
                                
                                <div className="matrix-box">
                                    <CostMatrix
                                        nbLigne={minitabData.nbLigne}
                                        nbColonne={minitabData.nbColonne}
                                        etatMatrice={etapeCourante.etatMatrice}
                                        disponibilites={minitabData.a}
                                        demandes={minitabData.b}
                                        originalMatrix={minitabData.cout}
                                    />
                                </div>

                                <div className="matrix-box">
                                    <SolutionMatrix
                                        nbLigne={minitabData.nbLigne}
                                        nbColonne={minitabData.nbColonne}
                                        etatMatrice={etapeCourante.etatMatrice}
                                        solution={etapeCourante.solutionIntermediaire}
                                        disponibilites={etapeCourante.disponibilitesRestantes}
                                        demandes={etapeCourante.demandesRestantes}
                                    />
                                </div>

                            </div>

                            {/* Commentaire ou action textuelle si disponible */}
                            {etapeCourante.action && (
                                <p className="solutions-p" style={{ marginTop: '24px', color: '#475569', fontStyle: 'italic' }}>
                                    <strong>Action effectuée :</strong> {etapeCourante.action}
                                </p>
                            )}

                        </div>
                    )}
                </StepsLayoutContainer>

            </div>
        </StepsGraph>
    );
};

export default BaseSolutionStepsLayout;