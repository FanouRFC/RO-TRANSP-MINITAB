import React, { useReducer } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './Core/Theme/Global';
import Theme from './Core/Theme/index.ts';
import { Container, MainContentArea } from './Styles/styles';
import FormLayout from './Layouts/FormLayout';
import SolutionLayout from './Layouts/SolutionLayout';
import BaseSolutionStepsLayout from './Layouts/BaseSolutionStepsLayout';
import { MinitabContext } from './Context/MinitabContext';
import IterationStepsLayout from './Layouts/IterationStepsLayout';

const initialState = {
    isLoading : true,
    isGettingStarted: false,
    isGifDisplayed: true,
    nbLigne: 0,
    nbColonne: 0,
    a: null,
    b: null,
    isQteValid: false,
    errorQte: false,
    cout: null,
    isCoutValid: false,
    baseSolution: null,
    casD: false,
    zBase: 0,
    finalSolution: null,
    zOptimal: 0,
};


// Juste fikafika mampalaky debug, tode sady resoudre fotsiny kitianlah de mijery inspect XD
// Le ambany ito Cas degeneree
// let debugState = {
//   isLoading: false,
//   isGettingStarted: false,
//   isGifDisplayed: false,

//   nbLigne: 4,
//   nbColonne: 6,

//   a: [20, 30, 40, 10],
//   b: [20,30,10,20,10,10],

//   isQteValid: true,
//   errorQte: false,

//   cout: [
//     "45","60","45","30","45","50",
//     "35","15","35","35","25","25",
//     "30","25","45","55","15","55",
//     "30","40","55","10","10","50",
//   ],

//   isCoutValid: false,

//   baseSolution: null,
//   finalSolution: null,

//   casD: true,
//   zBase: 0,
//   zOptimal: 0,
// };

// let debugState = {
//   isLoading: true,
//   isGettingStarted: true,
//   isGifDisplayed: true,

//   nbLigne: 4,
//   nbColonne: 6,

//   a: [25, 30, 10, 45],
//   b: [20,15,35,10,20,10],

//   isQteValid: true,
//   errorQte: false,

//   cout: [
//     "45","60","45","30","45","50",
//     "35","15","35","35","25","25",
//     "30","25","45","55","15","55",
//     "30","40","55","10","10","50",
//   ],

//   isCoutValid: false,

//   baseSolution: null,
//   finalSolution: null,

//   casD: true,
//   zBase: 0,
//   zOptimal: 0,
// };

// let debugState = {
//   isLoading: false,
//   isGettingStarted: false,
//   isGifDisplayed: false,

//   nbLigne: 4,
//   nbColonne: 6,

//   a: [18, 32, 14, 9],
//   b: [9,11,28,6,14,5],

//   isQteValid: true,
//   errorQte: false,

//   cout: [
//     "24","22","61","49","83","35",
//     "23","39","78","28","65","42",
//     "67","56","92","24","53","54",
//     "71","43","91","67","40","49",
//   ],

//   isCoutValid: false,

//   baseSolution: null,
//   finalSolution: null,

//   casD: true,
//   zBase: 0,
//   zOptimal: 0,
// };



// let debugState = {
//   isLoading: false,
//   isGettingStarted: false,
//   isGifDisplayed: false,

//   nbLigne: 4,
//   nbColonne: 6,

//   a: [18, 32, 14, 9],
//   b: [9,11,28,6,14,5],

//   isQteValid: true,
//   errorQte: false,

//   cout: [
//     "24","22","61","49","83","35",
//     "23","39","78","28","65","42",
//     "67","56","92","24","53","54",
//     "71","43","91","67","40","49",
//   ],

//   isCoutValid: false,

//   baseSolution: null,
//   finalSolution: null,

//   casD: false,
//   zBase: 0,
//   zOptimal: 0,
// };

// let debugState = {
//   isLoading: false,
//   isGettingStarted: false,
//   isGifDisplayed: false,

//   nbLigne: 4,
//   nbColonne: 6,

//   a: [18, 32, 14, 9],
//   b: [9,11,28,6,14,5],

//   isQteValid: true,
//   errorQte: false,

//   cout: [
//     "24","22","61","49","83","35",
//     "23","39","78","28","65","42",
//     "67","56","92","24","53","54",
//     "71","43","91","67","40","49",
//   ],

//   isCoutValid: false,

//   baseSolution: null,
//   finalSolution: null,

//   casD: false,
//   zBase: 0,
//   zOptimal: 0,
// };



// Real cas degenere hoan MINITAB
// let debugState = {
//   isLoading: false,
//   isGettingStarted: false,
//   isGifDisplayed: false,

//   nbLigne: 4,
//   nbColonne: 6,

//   a: [20, 15, 25, 10],
//   b: [20, 10, 5, 15, 10, 10],

//   isQteValid: true,
//   errorQte: false,

//   cout: [
//     "24","22","61","49","83","35",
//     "23","39","78","28","65","42",
//     "67","56","92","24","53","54",
//     "71","43","91","67","40","49",
//   ],

//   isCoutValid: false,

//   baseSolution: null,
//   finalSolution: null,

//   casD: true,
//   zBase: 0,
//   zOptimal: 0,
// };

const reducer = (state, action) => {
    switch(action.type){
      case 'start':
        return {...state, isGettingStarted: true};
      case 'addMagasins':
        return {...state, nbLigne: action.nbA, nbColonne: action.nbB, a: null, b: null, cout: null, baseSolution: null, finalSolution: null};
      case 'addQte':
        return {...state, a: action.a, b: action.b, isQteValid: true, errorQte: action.errorQte};
      case 'addCout':
        return {...state, cout: action.cout, isCoutValid: true, baseSolution: action.bs, zBase: action.z, casD: action.casD, finalSolution: action.os, zOptimal: action.zOptimal, etapesData: action.etapesData, isGifDisplayed: false, isLoading: false};
      case 'editLigneColonne':
        return {...state, nbLigne: 0, nbColonne: 0, a: null, b: null, isQteValid: false, isCoutValid: false, cout: null, baseSolution: null, finalSolution: null, zBase: 0, zOptimal: 0, casD: false}
      case 'editQte':
        return {...state, isQteValid: false};
      case 'editCout':
        return {...state, isCoutValid: false};
      case 'errorQte':
        return {...state, errorQte: true}
      case 'reinitialiser':
        {
          console.clear();
          return initialState;
        }
      default:
        return state;
    }
}



const App = () => {
  const [minitabData, dispatch] = useReducer(reducer, initialState);

  return (
    <ThemeProvider theme={Theme}>
      <MinitabContext.Provider value={{ minitabData, dispatch }}>
        <GlobalStyles />
        <Container>
          {/* Formulaire fixé à gauche */}
          <FormLayout />
          {/* Contenu dynamique défilant à droite */}
          <MainContentArea>
            <SolutionLayout />
            <BaseSolutionStepsLayout/>
            <IterationStepsLayout />
          </MainContentArea>
        </Container>
      </MinitabContext.Provider>
    </ThemeProvider>
  );
};

export default App; 