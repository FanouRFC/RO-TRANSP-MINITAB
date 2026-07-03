import React, { useContext } from 'react';
import { FormWrapper, Form, FormTitle,Form3Inputs, BtnContainer } from './Form.Style';
import InputNumber from '../Input';
import Button from '../Button';
import { MinitabContext } from '../../Context/MinitabContext';
import { createMatrice, generateBaseSolution, calculateZ, generatePotentiels, deltaXY, generateOptimalSolution } from '../../Helper/Algo/module';
import { Graph } from '../../Helper/Algo/Graph';

const Form3 = () => {
    const { minitabData, dispatch } = useContext(MinitabContext);
    
    const generateSolution = (cout, a, b, nbLigne, nbColonne) => {
        let matrice = {};
        // let baseSolution = {};
        let index = [];
        matrice = createMatrice(cout, a, b, nbLigne, nbColonne);
        let valeurs = Object.values(matrice);
        index = Object.keys(matrice);
        let max = Math.max(...valeurs) + 1;
        max = Infinity;
        let baseSolution = generateBaseSolution(index, matrice, a, b, max);
        return baseSolution;
    }
    
    const afficherMatrice = (a, b) => {
        const composantsAffiches = [];
        for(let i = 1; i <= a; i++){
            const composantsEnfants = [];
            for(let j = 1; j <= b; j++){
            const cle = 'a'+i+'b'+j;
            composantsEnfants.push(<InputNumber key={cle} disabled={minitabData.isCoutValid} name={cle}/>);
            }
            composantsAffiches.push(
            <div key = {i} className="ligne">
                {composantsEnfants}
            </div>
            )
        }
        return composantsAffiches;
    }
    
    const onSubmitForm3 = (e) => {
        e.preventDefault();
        let cout = minitabData.cout;
        // const data = new FormData(e.target);
        // const cout = Object.fromEntries(data.entries());
        try{
            const { baseSolution, casD, etapes: etapesBase } = generateSolution(Object.values(cout), minitabData.a, minitabData.b, minitabData.nbLigne, minitabData.nbColonne);
            // const { baseSolution, casD, etapes: etapesBase } = generateSolution(Object.values(cout), minitabData.a, minitabData.b, minitabData.nbLigne, minitabData.nbColonne);
            const original = createMatrice(Object.values(cout), minitabData.a, minitabData.b, minitabData.nbLigne, minitabData.nbColonne);
            // const {baseSolution, casD} = s; 
            // console.log("ito le s : " , s)
            // let baseSolution = {
            //     a1b1: 15,
            //     a1b3: 0.000001,
            //     a1b4: 10,
            //     a2b2: 15,
            //     a2b5: 15,
            //     a3b1: 5,
            //     a3b5: 5,
            //     a4b3: 35,
            //     a4b6: 10
            // }
            // let baseSolution = {
            //     a1b2: 11,
            //     a1b3: 2,
            //     a1b6: 5,
            //     a2b1: 9,
            //     a2b3: 23,
            //     a3b3: 3,
            //     a3b4: 6,
            //     a3b5: 5,
            //     a4b5: 9
            // }

            let preOptimalSolution = { ...baseSolution };
            let optimal = false;
            let iteration = 1;

            // --- STRUCTURE POUR RECEVOIR TOUTES LES ÉTAPES ---
            let historiqueComplet = {
                solutionDeBase: etapesBase, 
                iterationsOptimisation: []  
            };
            
        while(!optimal){
           const { nodePotentiel, potentielsXY, etapesPotentiels } = generatePotentiels(preOptimalSolution, original, minitabData.nbLigne, minitabData.nbColonne);
            // console.log("LES Potentiels : ",potentiels )
        
            // Calculer Delta(x,y) = Vx + C(x,y) - Vy pour les cases vides c-a-d les couts marginaux
        
            const { allDeltas, tableauMarginal, etapesDeltas } = deltaXY(preOptimalSolution, [nodePotentiel, potentielsXY], original);
        
            // Tant qu'il existe Delta(x,y) < 0 => substitution de vecteur et refaire les étapes
            // console.log("LES DELATAS : ",deltas )
            let isNegativeExit = false;
            allDeltas.forEach(delta=>{
                if(Object.values(delta)[0]<0){
                    isNegativeExit = true;
                }
            })
            if(isNegativeExit){
                const { optimalSolution, etapesOptimisation } = generateOptimalSolution(preOptimalSolution, allDeltas, original, minitabData.nbLigne, minitabData.nbColonne);
                // Enregistrement des données de cette itération spécifique
                historiqueComplet.iterationsOptimisation.push({
                    numeroIteration: iteration++,
                    potentiels: etapesPotentiels,
                    deltas: etapesDeltas,
                    tableauMarginal: tableauMarginal,
                    optimisation: etapesOptimisation,
                    currentSolution: preOptimalSolution
                });

                preOptimalSolution = optimalSolution;
                const graph = new Graph();
                Object.keys(preOptimalSolution).forEach(key => {
                    graph.addEdge(key.slice(0,2), key.slice(2,4));
                })
                
                if(graph.isConnected()){
                    // console.log("hehe")
                    continue
                }else{
                    // Pas de négatif -> La solution actuelle est optimale !
                    // On enregistre quand même la dernière itération (sans étape d'optimisation car aucun transfert n'a lieu)
                    historiqueComplet.iterationsOptimisation.push({
                        numeroIteration: iteration,
                        potentiels: etapesPotentiels,
                        deltas: etapesDeltas,
                        tableauMarginal: tableauMarginal,
                        optimisation: null, // Terminé,
                        currentSolution: preOptimalSolution
                    });
                    optimal = true;
                }
            }else{
                    optimal=true;
            }
        }

        const optimalSolution = preOptimalSolution;
        const zValue = calculateZ(baseSolution, original);
        const zValueOptimal = calculateZ(optimalSolution, original);

        console.log("Historique complet de l'algorithme :", historiqueComplet);

        dispatch({
            type: 'addCout', 
            cout: Object.values(cout), 
            bs: baseSolution, 
            casD: casD, 
            z: zValue, 
            os: optimalSolution, 
            zOptimal: zValueOptimal,
            etapesData: historiqueComplet
        });
        }catch(e){
            console.error(e.message)
        }
    }

    return (
        <FormWrapper>
        <Form onSubmit={(e) => onSubmitForm3(e)}>
            <FormTitle>Les coûts unitaires de transport</FormTitle>
            <Form3Inputs>
                {afficherMatrice(minitabData.nbLigne, minitabData.nbColonne)}
            </Form3Inputs>
            {!minitabData.isCoutValid && (
                    <BtnContainer>
                        <Button 
                            variant='secondary'
                            type='submit' 
                            text='Résoudre'
                        />
                    </BtnContainer>
                )} 
        </Form>
            {minitabData.isCoutValid && (
                <BtnContainer>
                    <Button 
                        variant='secondary'
                        type='button' 
                        text='Modifier'
                        onClick={()=>dispatch({type: 'editCout'})}
                    />
                </BtnContainer>
            )}
        </FormWrapper>
    )
}

export default Form3;