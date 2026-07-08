import React, { useContext, useState, useEffect, useRef } from 'react';
import { MinitabContext } from "../../Context/MinitabContext";
import {
    IterationGraph,
    StepsLayoutContainer,
    StepCard,
    StepsLayoutTitle,
    StepHeader,
    SubSectionTitle,
    DeltaCalculList,
    GainHighlightBox
} from "./IterationStepsLayout.Style";
import GraphPotentiel from '../../Component/Graph/graphPot';
import OptimisedDelta from '../../Component/SolutionMatrix/optimisationDelta';
import styled from 'styled-components';

const CarouselNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background: white;
  padding: 12px 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);

  .nav-button {
    background-color: #3b82f6;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;

    &:hover:not(:disabled) {
      background-color: #2563eb;
    }

    &:disabled {
      background-color: #cbd5e1;
      cursor: not-allowed;
    }
  }

  .nav-info {
    font-weight: 600;
    color: #475569;
    font-size: 1rem;
  }
`;

const SubCarouselNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 12px;
  padding: 6px 12px;
  background: #f8fafc;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;

  .sub-nav-button {
    background-color: #64748b;
    color: white;
    border: none;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;

    &:hover:not(:disabled) {
      background-color: #475569;
    }

    &:disabled {
      background-color: #e2e8f0;
      color: #94a3b8;
      cursor: not-allowed;
    }
  }

  .sub-nav-info {
    font-size: 0.85rem;
    font-weight: 600;
    color: #64748b;
  }
`;

const IterationStepsLayout = () => {
    const { minitabData } = useContext(MinitabContext);
    
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    // Index du graphique actif dans la liste totale combinée
    const [currentSubStepIndex, setCurrentSubStepIndex] = useState(0);
    const topRef = useRef(null);

    // Réinitialisation du sous-carrousel au changement de grande étape
    useEffect(() => {
        setCurrentSubStepIndex(0);
        if (topRef.current) {
            topRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, [currentStepIndex]);

    if (!minitabData.etapesData?.iterationsOptimisation) {
        return null;
    }

    const iterations = minitabData.etapesData.iterationsOptimisation;
    const totalSteps = iterations.length;

    const handleNext = () => {
        if (currentStepIndex < totalSteps - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
        }
    };

    const formatValue = (val) => {
        if (Math.abs(val) === 0.000001) {
            return val < 0 ? "-ε" : "ε";
        }
        return val;
    };

    const parseCoordinates = (caseStr) => {
        if (!caseStr) return { label: '', A: 0, B: 0 };
        const match = caseStr.match(/^a(\d+)b(\d+)$/);
        if (!match) return { label: caseStr, A: 0, B: 0 };
        
        const [, a, b] = match;
        const A = parseInt(a, 10);
        const B = parseInt(b, 10);
        const letter = String.fromCharCode('A'.charCodeAt(0) + A - 1);
        
        return { label: `${letter}, ${B}`, A, B };
    };

    const etape = iterations[currentStepIndex];

    // --- LOGIQUE D'AFFICHAGE 1 PAR 1 DE TOUS LES GRAPHES ---
    // On construit un tableau unique contenant TOUS les graphiques de cette étape
    const allGraphs = [
        { type: 'intro-false', data: null },
        { type: 'intro-true', data: null },
        ...(etape.potentiels? etape.potentiels : []).map(p => ({ type: 'dynamique', data: p }))
    ];
    
    const totalGraphsCount = allGraphs.length;
    const activeGraph = allGraphs[currentSubStepIndex];

    const handleNextSub = () => {
        if (currentSubStepIndex < totalGraphsCount - 1) {
            setCurrentSubStepIndex(currentSubStepIndex + 1);
        }
    };

    const handleSubPrev = () => {
        if (currentSubStepIndex > 0) {
            setCurrentSubStepIndex(currentSubStepIndex - 1);
        }
    };

    return (
        <IterationGraph>
            <div className="solution-container">
                <StepsLayoutTitle>
                    <h3 className="main-title" ref={topRef}>Étapes Stepping Stone</h3>
                </StepsLayoutTitle>

                {/* Navigation Principale (Haut) */}
                {totalSteps > 1 && (
                    <CarouselNav>
                        <button className="nav-button" onClick={handlePrev} disabled={currentStepIndex === 0}>
                            ← Précédent
                        </button>
                        <div className="nav-info">
                            Étape {currentStepIndex + 1} sur {totalSteps}
                        </div>
                        <button className="nav-button" onClick={handleNext} disabled={currentStepIndex === totalSteps - 1}>
                            Suivant →
                        </button>
                    </CarouselNav>
                )}

                <StepsLayoutContainer>
                    {etape && (
                        <StepCard>
                            <StepHeader>
                                <span className="step-badge">Étape {currentStepIndex + 1}</span>
                            </StepHeader>

                            <SubSectionTitle>Graphiques des potentiels</SubSectionTitle>
                            
                            {/* Affichage de l'unique graphique actif */}
                            <div style={{ marginTop: '12px' }}>
                                {activeGraph?.type === 'intro-false' && (
                                    <div className="graph-wrapper">
                                        <GraphPotentiel
                                            currentSolution={etape.currentSolution}
                                            etatPotentiel={{}}
                                            showMid={false}
                                        />
                                    </div>
                                )}
                                {activeGraph?.type === 'intro-true' && (
                                    <div className="graph-wrapper">
                                        <GraphPotentiel
                                            currentSolution={etape.currentSolution}
                                            etatPotentiel={{}}
                                            showMid={true}
                                        />
                                    </div>
                                )}
                                {activeGraph?.type === 'dynamique' && (
                                    <div className="graph-wrapper">
                                        <GraphPotentiel
                                            currentSolution={etape.currentSolution}
                                            etatPotentiel={activeGraph.data.etatPotentiels}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Contrôles du sous-carrousel (1 par 1) */}
                            {totalGraphsCount > 1 && (
                                <SubCarouselNav>
                                    <button 
                                        className="sub-nav-button"
                                        onClick={handleSubPrev}
                                        disabled={currentSubStepIndex === 0}
                                    >
                                        « Préc.
                                    </button>
                                    <div className="sub-nav-info">
                                        Graphique {currentSubStepIndex + 1} / {totalGraphsCount}
                                    </div>
                                    <button 
                                        className="sub-nav-button"
                                        onClick={handleNextSub}
                                        disabled={currentSubStepIndex === totalGraphsCount - 1}
                                    >
                                        Suiv. »
                                    </button>
                                </SubCarouselNav>
                            )}

                            {/* Section 3 : Calculs de Delta */}
                            {etape.deltas && etape.deltas.length > 0 && (
                                <>
                                    <hr className="section-divider" />
                                    <SubSectionTitle>Calcul des Évaluations (Deltas)</SubSectionTitle>
                                    <DeltaCalculList>
                                        {etape.deltas.map((etapeDelta, idxDelta) => {
                                            let isNegatif = false;

                                            if (etapeDelta.calcul && etapeDelta.calcul.includes('=')) {
                                                // On découpe par tous les "=" présents
                                                const parts = etapeDelta.calcul.split('=');
                                                // On récupère le tout dernier morceau (le résultat final)
                                                const dernierResultat = parts[parts.length - 1]; 
                                                
                                                // On vérifie si ce dernier résultat contient le signe moins
                                                if (dernierResultat && dernierResultat.includes('-')) {
                                                    isNegatif = true;
                                                }
                                            }

                                            return (
                                                <li 
                                                    key={idxDelta} 
                                                    className="delta-item"
                                                    style={isNegatif ? {
                                                        backgroundColor: '#fef2f2', // Fond rouge très doux
                                                        border: '1px solid #fca5a5',  // Bordure rouge pastel
                                                        borderRadius: '6px',
                                                        padding: '8px 12px',
                                                        margin: '6px 0',
                                                        listStyleType: 'none',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center'
                                                    } : {}}
                                                >
                                                    <code>
                                                        {etapeDelta.calcul}
                                                    </code>
                                                    {isNegatif && (
                                                        <span style={{ 
                                                            marginLeft: '10px', 
                                                            fontSize: '0.8rem', 
                                                            color: '#dc2626', 
                                                            fontWeight: 'bold',
                                                            backgroundColor: '#fee2e2',
                                                            padding: '2px 6px',
                                                            borderRadius: '4px',
                                                            whiteSpace: 'nowrap'
                                                        }}>
                                                        </span>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </DeltaCalculList>
                                </>
                            )}

                            {/* Section 4 : Évaluation des Chemins & Matrice Opti */}
                            {etape.optimisation?.cheminsEvalues && etape.optimisation.cheminsEvalues.length > 0 && (
                                <>
                                    <hr className="section-divider" />
                                    <SubSectionTitle>Étapes des gains potentiels</SubSectionTitle>
                                    
                                    <div className="gains-container">
                                        {etape.optimisation.cheminsEvalues.map((etapeGain, idxGain) => {
                                            const deltaMatch = etape.deltas?.find(d => d.case === etapeGain.caseEntrante);
                                            const coords = parseCoordinates(etapeGain.caseEntrante);
                                            const quantiteMax = formatValue(etapeGain.quantiteMax);
                                            const gainTotal = formatValue(etapeGain.gainTotal);

                                            return (
                                                <div className="gain-card-item" key={idxGain}>
                                                    {deltaMatch && <p className="calcul-reference">{deltaMatch.calcul}</p>}
                                                    
                                                    <div className="matrix-preview">
                                                        <OptimisedDelta
                                                            nbLigne={minitabData.nbLigne}
                                                            nbColonne={minitabData.nbColonne}
                                                            originalMatrix={minitabData.cout}
                                                            solution={etapeGain.preOptimalSolution}
                                                            signes={etapeGain.signe}
                                                        />
                                                    </div>
                                                    
                                                    <p className="gain-formula">
                                                        Gain ({coords.label}) = <span>{etapeGain.coutMarginal}</span> × {quantiteMax} = <strong>{gainTotal}</strong>
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            )}

                            {/* Section 5 : Conclusion de l'étape / Gain retenu */}
                            {etape.optimisation?.cheminChoisi && (
                                <>
                                    <hr className="section-divider" />
                                    <SubSectionTitle>Gain optimal retenu pour cette itération</SubSectionTitle>
                                    {(() => {
                                        const chosen = etape.optimisation.cheminChoisi;
                                        const coords = parseCoordinates(chosen.caseEntrante);
                                        const quantiteeDeplace = formatValue(chosen.quantiteDeplacee);
                                        const total = formatValue(chosen.gainAmelioration);

                                        return (
                                            <GainHighlightBox>
                                                <div className="highlight-content">
                                                    <p>
                                                        Amélioration validée sur la case <strong>({coords.label})</strong> :
                                                    </p>
                                                    <span className="final-formula">
                                                        {chosen.coutMarginal} × {quantiteeDeplace} = {total}
                                                    </span>
                                                </div>
                                            </GainHighlightBox>
                                        );
                                    })()}
                                </>
                            )}
                        </StepCard>
                    )}
                </StepsLayoutContainer>

                {/* Navigation Principale (Bas) */}
                {totalSteps > 1 && (
                    <CarouselNav style={{ marginTop: '20px' }}>
                        <button className="nav-button" onClick={handlePrev} disabled={currentStepIndex === 0}>
                            ← Précédent
                        </button>
                        <div className="nav-info">
                            Étape {currentStepIndex + 1} sur {totalSteps}
                        </div>
                        <button className="nav-button" onClick={handleNext} disabled={currentStepIndex === totalSteps - 1}>
                            Suivant →
                        </button>
                    </CarouselNav>
                )}
            </div>
        </IterationGraph>
    );
};

export default IterationStepsLayout;