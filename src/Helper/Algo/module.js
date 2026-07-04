const epsilon = 0.000001;
// création de l'objet matrice
export function createMatrice(valeurs, a, b, nbA, nbB){
    // a: les quantités disponibles dans les magasins de dépôt respectifs
    // b: les quantités demandées par les magasins de déstination respectifs
    // nbA: le nombre des magasins de dépot
    // nbB: le nombre des magasins de départ
    // valeurs: les valeurs des coûts unitaires à repartir dans la matrice
    let matrice = {};
    if(nbA === a.length && nbB === b.length && nbA*nbB === valeurs.length){
        for(let i = 0, a = 1, b = 1; i < nbA*nbB && a <= nbA && b <= nbB; i++){
            if(b%nbB != 0){
                matrice[`a${a}b${b}`] = parseInt(valeurs[i]);
                b++;
            }else{
                matrice[`a${a}b${b}`] = parseInt(valeurs[i]);
                a++;
                b=1;
            }
        }
    }
    return matrice;
}

// AI Code, sorryyy XD

// génère la solution de base
export function generateBaseSolution(tabIndex, matrice, qteA, qteB, maxiOfTab){
    // let miniOfTab = Infinity;
    const {Graph} = require('./Graph.js');
    let indexOfMiniOfTab;
    let newValueOfMatrice; //evolution des valeurs dans la matrice
    let baseSolution = {};
    let qteDispo;
    let qteDemande;
    let a = [...qteA];
    let b = [...qteB];
    newValueOfMatrice = Object.values(matrice)
    let miniOfTab = Math.min(...newValueOfMatrice);

    // --- AJOUT : Tableau pour stocker l'historique des étapes ---
    let etapes = [];
    let numEtape = 0;
    etapes.push({
                etape: numEtape,
                caseChoisie: indexOfMiniOfTab,
                coutUnitaire: miniOfTab,
                quantiteAllouee: 0,
                action: "",
                // On fait des copies profondes des objets pour figer l'état à cet instant T
                etatMatrice: {...matrice}, 
                disponibilitesRestantes: [...a],
                demandesRestantes: [...b],
                solutionIntermediaire: {...baseSolution}
            });
       
    let stop = false;
    while(!stop){
        for(let i = 0; i < tabIndex.length; i++){
            if(matrice[`${tabIndex[i]}`] != miniOfTab){
                continue;
            }else{
                indexOfMiniOfTab = tabIndex[i];
                break;
            }
        }
        
        if(indexOfMiniOfTab){
            const aId = parseInt(indexOfMiniOfTab.slice(1,2));  // retourne la valeur de l'index de a corresondant à l'emplacement du miniOfTab ex: a2b3 => aId = 2
            const bId = parseInt(indexOfMiniOfTab.slice(3,4));  // retourne la valeur de l'index de b corresondant à l'emplacement du miniOfTab ex: a2b3 => bId = 3

            let qteAllouee = 0;
            let typeElimination = ""; // Pour savoir si on barre la ligne ou la colonne

            if(a[aId-1] < b[bId-1]){
                qteAllouee = a[aId-1];
                baseSolution[`a${aId}b${bId}`] = a[aId-1];
                b[bId-1] = b[bId-1] - a[aId-1];
                a[aId-1] = 0;
                tabIndex.forEach(index => {
                    if(index.slice(0,2)==`a${aId}`){
                        // matrice[index] = maxiOfTab;
                        matrice[index] = Infinity;
                    }
                })
            }else if(a[aId-1] > b[bId-1]){
                qteAllouee = b[bId-1];
                baseSolution[`a${aId}b${bId}`] = b[bId-1];
                a[aId-1] = a[aId-1] - b[bId-1];
                b[bId-1] = 0;
                tabIndex.forEach(val => {
                    if(val.slice(2,4)==`b${bId}`){
                        // matrice[`${val}`]=maxiOfTab;
                        matrice[`${val}`]=Infinity;
                    }
                })
            }else{
                qteAllouee = a[aId-1];
                baseSolution[`a${aId}b${bId}`] = a[aId-1];
                a[aId-1] = b[bId-1] = 0;
                tabIndex.forEach(index => {
                    if(index.slice(0,2)==`a${aId}` || index.slice(2,4)==`b${bId}`){
                        // matrice[index] = maxiOfTab;
                        matrice[index] = Infinity;
                    }
                })
            }

            // --- AJOUT : Enregistrement de l'état à la fin de cette itération ---
            etapes.push({
                etape: numEtape++,
                caseChoisie: indexOfMiniOfTab,
                coutUnitaire: miniOfTab,
                quantiteAllouee: qteAllouee,
                action: typeElimination,
                // On fait des copies profondes des objets pour figer l'état à cet instant T
                etatMatrice: {...matrice}, 
                disponibilitesRestantes: [...a],
                demandesRestantes: [...b],
                solutionIntermediaire: {...baseSolution}
            });
        }

        newValueOfMatrice = Object.values(matrice);
        miniOfTab = Math.min(...newValueOfMatrice);

        qteDispo = a.reduce((acc, el) => {
            return acc + el;
        }, 0);
        qteDemande = b.reduce((acc, el) => {
            return acc + el;
        }, 0);

        if(qteDispo == 0 && qteDemande == 0) stop=true
        else continue
    }
    const graph = new Graph();
    Object.keys(baseSolution).forEach(key => {
        graph.addEdge(key.slice(0,2), key.slice(2,4));
    })

    // for (let i = 0; i < etapes.length; ++i)
    //     console.log(etapes[i])

    // console.log('cas dégénéré?: ', graph.isConnected() ? 'non' : 'oui');

    if(graph.isConnected()){
        return {casD: false, baseSolution, etapes};
    }else{
        const connectedComponents = graph.findConnectedComponents();
        // console.log('Composantes connexes trouvées : ', connectedComponents);
        
        // 1. On choisit un nœud de référence absolu dans la TOUTE PREMIÈRE composante (ex: un magasin 'a')
        let globalAnchor = '';
        for (let key of connectedComponents[0]) {
            if (key.startsWith('a')) {
                globalAnchor = key;
                break;
            }
        }
        // Si aucun 'a' n'est trouvé, on prend le premier élément par défaut
        if (!globalAnchor) globalAnchor = [...connectedComponents[0]][0];

        // 2. On boucle sur TOUTES les AUTRES composantes pour les relier à notre ancre globale
        for (let i = 1; i < connectedComponents.length; i++) {
            let targetNode = '';
            
            // Si l'ancre globale est un 'a', on cherche un 'b' dans la composante cible pour créer une arête valide 'axbx'
            if (globalAnchor.startsWith('a')) {
                for (let key of connectedComponents[i]) {
                    if (key.startsWith('b')) {
                        targetNode = key;
                        break;
                    }
                }
            } else { // Si l'ancre est un 'b', on cherche un 'a'
                for (let key of connectedComponents[i]) {
                    if (key.startsWith('a')) {
                        targetNode = key;
                        break;
                    }
                }
            }

            // Si le type opposé n'est pas trouvé, on prend le premier disponible
            if (!targetNode) targetNode = [...connectedComponents[i]][0];

            // On forme la clé de la case à occuper avec epsilon (ex: "a1b3")
            let caseEpsilon = globalAnchor.startsWith('a') ? `${globalAnchor}${targetNode}` : `${targetNode}${globalAnchor}`;
            
            baseSolution[caseEpsilon] = epsilon;

            // --- Enregistrement de l'étape spéciale "Cas dégénéré" ---
            etapes.push({
                etape: numEtape++,
                estCasDegenere: true,
                caseChoisie: caseEpsilon,
                coutUnitaire: 0, 
                quantiteAllouee: 'Epsilon',
                action: `Reconnexion de la composante ${i + 1} à l'ancre ${globalAnchor}`,
                etatMatrice: {...matrice},
                disponibilitesRestantes: [...a],
                demandesRestantes: [...b],
                solutionIntermediaire: {...baseSolution}
            });
        }
        // console.log("Mis en place du cas deg: ");
        // for (let i = 0; i < etapes.length; ++i)
        //     console.log(etapes[i])
        return {casD: true, baseSolution, etapes};
    }
}

export const generatePotentiels = (baseSolution, matriceOriginal, nbA, nbB) => {
    const {LinkedList} = require('./LinkedList');
    const list = [];
    const potentielsXY = {};
    const nodePotentiel = {};

    // --- AJOUT : Tableau d'étapes pour les potentiels ---
    let etapesPotentiels = [];
    let numEtape = 1;

    for(let i = 1; i <= nbA; i++){
        list[i-1] = new LinkedList();
        list[i-1].append(undefined, `a${i}`);
        const pSIndex = Object.keys(baseSolution);
        pSIndex.forEach(id => {
            if(id.slice(0,2) == `a${i}`){
                potentielsXY[`${id}`] = Number(matriceOriginal[`${id}`]);
                list[i-1].append(undefined, id.slice(2,4));
            }
        })
    }
    const maxPXY = Math.max(...Object.values(potentielsXY));
    let maxId = NaN;
    Object.keys(potentielsXY).forEach(id => {
        if(maxId != NaN && potentielsXY[`${id}`]==maxPXY) maxId = id;
    })

    // Fixation du premier potentiel de départ (arbitraire ou max)
    const source = maxId.slice(0,2);
    list[`${Number(source.slice(1,2))-1}`].insertPotentiel(0, source);
    nodePotentiel[source] = 0;

    etapesPotentiels.push({
        etape: numEtape++,
        description: `Initialisation du potentiel de référence pour le nœud source`,
        noeudModifie: source,
        valeurObtenue: 0,
        etatPotentiels: { ...nodePotentiel }
    });

    Object.keys(potentielsXY).forEach(id => {
        if(source==id.slice(0,2)) {
            list[`${Number(source.slice(1,2))-1}`].insertPotentiel(potentielsXY[id], id.slice(2,4));
            nodePotentiel[id.slice(2,4)] = potentielsXY[id];

            etapesPotentiels.push({
                etape: numEtape++,
                description: `Calcul du potentiel de la destination lié à la case de base ${id}`,
                noeudModifie: id.slice(2,4),
                valeurObtenue: potentielsXY[id],
                etatPotentiels: { ...nodePotentiel }
            });
        }
    })
    let isPotentielFilled = false;
    while(!isPotentielFilled){
        const nodeWithPotentiel = Object.keys(nodePotentiel);
        for(let i = 0; i < nbA; i++){
            if(list[i].getSourceValue()===undefined){
                list[i].getNextLabels().forEach(index => {
                    if(nodeWithPotentiel.includes(index)){
                        const label = list[i].getSourceLabel();
                        const id = label+index;
                        const potentiel = nodePotentiel[index]-potentielsXY[id];
                        list[i].insertPotentiel(potentiel,label);
                        nodePotentiel[label] = potentiel;

                        etapesPotentiels.push({
                            etape: numEtape++,
                            description: `Calcul du potentiel de la ligne ${label} à partir de la destination ${index} (Equation: u + v = C)`,
                            noeudModifie: label,
                            valeurObtenue: potentiel,
                            etatPotentiels: { ...nodePotentiel }
                        });

                    }
                })
            } else {
                list[i].getNextLabels().forEach(index => {
                    if(!nodeWithPotentiel.includes(index)){
                        const label = list[i].getSourceLabel();
                        const id = label+index;
                        const potentiel = nodePotentiel[label] + potentielsXY[id];
                        list[i].insertPotentiel(potentiel, index);
                        nodePotentiel[index] = potentiel;

                        etapesPotentiels.push({
                            etape: numEtape++,
                            description: `Calcul du potentiel de la destination ${index} à partir de la ligne ${label} (Equation: u + v = C)`,
                            noeudModifie: index,
                            valeurObtenue: potentiel,
                            etatPotentiels: { ...nodePotentiel }
                        });

                    }
                })
            }

        }
        if(Object.keys(nodePotentiel).length == nbA + nbB){
            isPotentielFilled = true;
        }   
    }

    // for (let i = 0; i < etapesPotentiels.length; ++i)
    //     console.log(etapesPotentiels[i]);

    return {nodePotentiel, potentielsXY, etapesPotentiels};
}

export const deltaXY = (baseSolution, potentiels, matriceOriginal) => {
    let allDeltas = [];
    const nodePotentiel = potentiels[0];
    const edgePotentiel = potentiels[1];

    // --- AJOUT : Structures pour l'historique et le tableau d'affichage ---
    let etapesDeltas = [];
    let tableauMarginal = {}; // Contiendra la valeur brute ou "-" si c'est une case de base
    let numEtape = 1;
    let lettre = 'A';

    Object.keys(matriceOriginal).forEach(index => {
        if(!Object.keys(edgePotentiel).includes(index)){
            const [, a, b] = index.match(/^a(\d+)b(\d+)$/);

            const i = parseInt(a, 10);
            const j = parseInt(b, 10);

            const sourceNode = `a${i}`;
            const targetNode = `b${j}`;

            // Si la case n'est pas une case de base (c'est une case vide)
            if (!Object.keys(edgePotentiel).includes(index)) {
                const u_i = nodePotentiel[sourceNode];
                const v_j = nodePotentiel[targetNode];
                const c_ij = matriceOriginal[index];
                
                // Formule : Δ = u_i + c_ij - v_j
                let delta = u_i + c_ij - v_j;
                
                allDeltas.push({ [`${index}`]: delta });
                tableauMarginal[index] = delta;

                // Ajout de la ligne d'étape détaillée
                etapesDeltas.push({
                    etape: numEtape++,
                    case: index,
                    calcul: `δ(${String.fromCharCode('A'.charCodeAt(0) + i - 1)}, ${j}) = ${u_i} + ${c_ij} - ${v_j} = ${delta}`
                });
            } else {
                // Case de base occupée
                tableauMarginal[index] = "-";
            }
        }
    })

    return {allDeltas, tableauMarginal, etapesDeltas};
}

export const generateOptimalSolution = (baseSolution, deltas, matriceOriginal, nbA, nbB) => {
    let optimalSolution = {};
    let preOptimalSolution = {};
    let fullMatriceBase = {};

    // --- AJOUT : Structure pour l'historique de la recherche de chemins ---
    let etapesOptimisation = {
        cheminsEvalues: [], // Tous les cycles fermés trouvés avec leurs détails
        cheminChoisi: null,   // Le cycle gagnant appliqué
    };

    Object.keys(matriceOriginal).forEach(index=> {
        if(Object.keys(baseSolution).includes(index)){
            fullMatriceBase[`${index}`] = baseSolution[index];
        }else{
            fullMatriceBase[`${index}`] = 0;
        }
    });

    let lignes = [];
    let lignesIndex = [];

    for(let i = 0; i < nbA; i++){
        let ligne = []
        let ligneInd = []
        Object.keys(matriceOriginal).forEach(index => {
            let ligneId = 'a'+(i+1);
            if(ligneId == index.slice(0,2)){
                if(Object.keys(baseSolution).includes(index)){
                    ligne.push(baseSolution[index]);
                    ligneInd.push(index);
                }else{
                    ligneInd.push(index);
                    ligne.push(0);
                }
            }
        })
        lignes.push(ligne);
        lignesIndex.push(ligneInd);
    }

    let negativeDeltasIndex = [];
    let negativeDeltasValue = [];
    let chemins = [];
    deltas.forEach(tuple=>{
        if(Object.values(tuple)<0){
            negativeDeltasIndex.push(Object.keys(tuple)[0]);
            negativeDeltasValue.push(Object.values(tuple)[0]);
        }
    })

    //atao anaty boucle manomboka eto
    for(let i = 0; i < negativeDeltasIndex.length; i++){

    let headIndex = negativeDeltasIndex[i];
    let headValue = negativeDeltasValue[i];
    
    let numLigne = indexToCoordinates(headIndex).i;
    let numCol = indexToCoordinates(headIndex).j;
    
    let loopPath = [];
    let trouve = false;
    
    const searchPath = (loopPath, rowNumber, currentIndex) => {
        if(loopPath.length%2!=0 && !trouve){
            loopPath.pop();
        }
        if(loopPath.length == 0 || indexToCoordinates(currentIndex).j == indexToCoordinates(loopPath[`${loopPath.length-1}`]).j){
            if(!trouve){
                loopPath.push(currentIndex);
            }
            let ligne = parcoursLigne(lignes[rowNumber], rowNumber);
            ligne = ligne.filter(id => id != currentIndex);
            if(ligne.length == 0 && !trouve){
                loopPath.pop();
            }else{
                ligne.forEach(id => {
                        if(loopPath.length%2==0 && !trouve){
                            loopPath.pop();
                        }
                        if(indexToCoordinates(id).i == indexToCoordinates(loopPath[`${loopPath.length-1}`]).i){
                            if(!trouve){
                                loopPath.push(id);
                            }
                            let colonneId = indexToCoordinates(id).j;
                            if(!trouve){
                                if(colonneId != numCol){
                                    let colonne = parcoursColonne(lignes, colonneId);
                                    colonne = colonne.filter(index => index != id);
                                    if(colonne.length == 0){
                                        loopPath.pop();
                                    }else{
                                        colonne.forEach(index => {
                                            let ligneId = indexToCoordinates(index).i;
                                            searchPath(loopPath, ligneId, index);
                                            if(!trouve&&loopPath.length%2!=0){
                                                loopPath.pop();
                                            }
                                        })
                                    }
                                } else {
                                    trouve = true;
                                    loopPath.push(headIndex); // On ferme la boucle proprement pour l'affichage
                                }
                            }
                        }
                    if(!trouve && loopPath.length%2==0){ loopPath.pop()}
                })
            }
        }
    }
   
    searchPath(loopPath, numLigne, headIndex);

    // Nettoyer le doublon de fermeture si nécessaire pour la logique originale
    if (loopPath[loopPath.length - 1] === headIndex) {
        loopPath.pop();
    }

    let loopMin = Infinity;
    for(let i=1; i < loopPath.length; i=i+2){
        if(fullMatriceBase[loopPath[i]]<loopMin){
            loopMin = fullMatriceBase[loopPath[i]]
        }
    }

    let gainEstime = 0;
    if (loopMin == epsilon || headValue == epsilon)
    {
        gainEstime = (headValue < 0) ? -epsilon : epsilon;
    }
    else
    {
        gainEstime = loopMin * headValue;
    }
    chemins.push({substitue: headIndex, gain: gainEstime, substitueValue: loopMin, chemin: loopPath, coutMarginal: headValue});

    // --- AJOUT : Sauvegarde des détails du chemin évalué ---
    let descriptionChemin = loopPath.map((caseId, idx) => {
            return `${caseId}(${idx % 2 === 0 ? '+' : '-'})`;
        }).join(' -> ') + ` -> ${headIndex}`;
        etapesOptimisation.cheminsEvalues.push({
            caseEntrante: headIndex,
            coutMarginal: headValue,
            cheminForme: descriptionChemin,
            signe: [...loopPath],
            quantiteMax: loopMin,
            gainTotal: gainEstime,
            preOptimalSolution: baseSolution
        });

    }

    let gain = 0;
    let cheminPrise = [];
    let substitueValue;
    let caseGagnante = "";
    let coutMarginal = 0

    chemins.map(chemin => {
        if(chemin.gain < gain){
            gain = chemin.gain;
            cheminPrise = chemin.chemin;
            substitueValue = chemin.substitueValue;
            caseGagnante = chemin.substitue;
            coutMarginal = chemin.coutMarginal;
        }
    })

    // --- AJOUT : Enregistrement du choix final retenu ---
    if (cheminPrise.length > 0) {
        etapesOptimisation.cheminChoisi = {
            caseEntrante: caseGagnante,
            quantiteDeplacee: substitueValue,
            coutMarginal: coutMarginal,
            gainAmelioration: gain,
            cheminDetaille: cheminPrise.map((caseId, idx) => {
                const estPositif = idx % 2 === 0;
                const valeurDeBase = fullMatriceBase[caseId];
                
                let nouvelleValeur = 0;
                if (valeurDeBase === epsilon || Math.abs(substitueValue) == epsilon) {
                    nouvelleValeur = estPositif ? Math.abs(substitueValue) : -Math.abs(substitueValue);
                } else {
                    nouvelleValeur = estPositif ? valeurDeBase + substitueValue : valeurDeBase - substitueValue;
                }

                return {
                    case: caseId,
                    signe: estPositif ? '+' : '-',
                    ancienneValeur: valeurDeBase,
                    nouvelleValeur: nouvelleValeur
                };
            })
        };
    }

    for(let i = 0; i < cheminPrise.length; i++){
        const estPositif = i%2==0;
        let valeurDeBase = fullMatriceBase[cheminPrise[i]];
        let nouvelleValeur = 0;
        if (valeurDeBase === epsilon || Math.abs(substitueValue) == epsilon) {
            nouvelleValeur = estPositif ? Math.abs(substitueValue) : -Math.abs(substitueValue);
        } else {
            nouvelleValeur = estPositif ? valeurDeBase + substitueValue : valeurDeBase - substitueValue;
        }
        // if(i%2!=0){
        //     fullMatriceBase[cheminPrise[i]] -= substitueValue;
        // }else {
        //     fullMatriceBase[cheminPrise[i]] += substitueValue;
        // }
        fullMatriceBase[cheminPrise[i]] = nouvelleValeur;
    }
    
    let ids = Object.keys(fullMatriceBase);

    ids.forEach(id => {
        if(fullMatriceBase[id] != 0){
            optimalSolution[`${id}`] = fullMatriceBase[`${id}`]
        }
    })

    // console.log("Etapes optimisation :")
    // console.log(etapesOptimisation)
    // // for (let i = 0; i < etapesOptimisation.length; ++i)
    // //     console.log(etapesOptimisation[i])
    // console.log("==================================================")

    return {optimalSolution, etapesOptimisation};
}

const parcoursLigne = (ligne, numLigne) => {
    const ligneId = 'a'+(Number(numLigne)+1);
    let b;
    let values = []
    for(let i = 0; i<ligne.length; i++){
        b = 'b'+(i+1);
        const index = ligneId + b;
        if(ligne[i]!=0){
            values.push(index);
        }
    }
    return values
}

const parcoursColonne = (ligne, numColonne) => {
    const colonneId = 'b'+(Number(numColonne)+1);
    let a;
    let values = [];
    for(let i = 0; i<ligne.length; i++){
        a = 'a'+(i+1);
        const index = a + colonneId;
        if(ligne[i][numColonne]!=0){
            values.push(index);
        }
    }
    return values;
}

function indexToCoordinates(idx) {
    const [, row, col] = idx.match(/a(\d+)b(\d+)/);
    return { i: parseInt(row) - 1, j: parseInt(col) - 1 };
}

export function calculateZ(solution, matriceOriginal){
    const pSIndex = Object.keys(solution);
    const z = pSIndex.reduce((acc, el) => {
        if(solution[`${el}`] == epsilon){
            return acc;
        }
        else{
            return acc + parseInt(matriceOriginal[`${el}`])*parseInt(solution[`${el}`]);
        }
    },0);
    return z;
}

// module.exports = {
//     createMatrice,
//     generateBaseSolution,
//     calculateZ,
// }