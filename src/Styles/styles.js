import styled from 'styled-components';

export const Container = styled.div`
  display: flex;                  /* Aligne le formulaire et le contenu côte à côte */
  width: 100vw;
  height: 100vh;
  overflow: hidden;               /* Empêche la page entière de scroller bizarrement */
`;

export const MainContentArea = styled.div`
  flex: 1;                        /* Prend tout l'espace restant à droite du formulaire */
  height: 100vh;
  overflow-y: auto;               /* C'est CETTE zone qui doit défiler, pas la page entière */
  padding: 20px;
  display: flex;
  flex-direction: column;         /* Aligne SolutionLayout au-dessus de IterationStepsLayout */
  gap: 30px;                      /* Donne de l'espace entre tes deux layouts */
`;