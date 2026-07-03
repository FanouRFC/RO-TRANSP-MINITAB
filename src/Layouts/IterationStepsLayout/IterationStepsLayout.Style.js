import styled from 'styled-components';

export const IterationGraph = styled.div`
  flex: 1;
  height: 100vh;
  position: relative;
  display: flex;
  overflow-y: scroll;
  .solution-container{
      flex: 1;
      display: flex;
      flex-direction: column;
    //   gap: ${({theme})=>theme.size(2)}px;
        // border: 3px solid red;
  }
`

export const SolutionLayoutContainer = styled.div`
  display: flex;
  background: #ffffff;
  flex: 1;
  padding: ${({theme})=>theme.size(2)}px 0;
  .solutions{
      flex: 2;
    //   border: 1px solid green;
      padding:  ${({theme})=>theme.size(0)}px ${({theme})=>theme.size(3)}px;
      color: ${({theme})=>theme.colors.brandPrimary900};
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;
      gap: ${({theme})=>theme.size(1)}px;
      .solutions-title{
        width: 100%;
        font-size: ${({theme}) => theme.size(2)+2}px;
        font-weight: 600;
        // border: 1px solid yellow;
    }
    .solutions-p{
        width: 100%;
        // flex: 1;
        // border: 1px solid red;
        span{
            font-weight: 600;
            // font-family: 'Orbitron';
            // margin-top: 8px;
            height: 24px;
            border-radius: 4px;
            background: ${({theme}) => theme.colors.vert};
            padding: 4px 8px;
            color: ${({theme}) => theme.colors.white};
        }
      }
  }
`


export const StepsLayoutTitle = styled.div`
    position: sticky;
    top: 0;
    z-index: 2;

    background: ${({ theme }) => theme.colors.white};

    padding: ${({ theme }) => theme.size(2) + 4}px
             ${({ theme }) => theme.size(3)}px;

    box-shadow: ${({ theme }) => theme.shadows.shadow1};
`;

export const StepsLayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size(4)}px;
    padding: ${({ theme }) => theme.size(3)}px;

    .solutions {
        background: white;
        border-radius: 8px;
        box-shadow: ${({ theme }) => theme.shadows.shadow1};
        padding: ${({ theme }) => theme.size(3)}px;
    }

    .solutions-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 20px;
    }

    /* 🔥 IMPORTANT: 2 matrices côte à côte */
    .step-matrices {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        gap: 40px;

        flex-wrap: nowrap;
        overflow-x: auto;
    }

    /* 🔥 container de chaque matrice */
    .matrix-box {
        display: flex;
        flex-direction: column;
        align-items: center;

        min-width: 420px;
    }

    /* ===== TABLE ===== */
    .transport-table {
        border-collapse: collapse;
        table-layout: fixed;
    }

    .transport-table td,
    .transport-table th {
        border: 1px solid #ddd;
    }

    /* ===== CELLULE ===== */
    .cell {
        position: relative;
        width: 70px;
        height: 70px;
        text-align: center;
        vertical-align: middle;
    }

    .cost {
        // position: absolute;
        // top: 4px;
        // left: 6px;
        font-size: 16px;
        color: #666;
        text-align: center
    }

    .allocation {
        font-size: 20px;
        font-weight: bold;
        color: #000;
    }

    /* ===== CASES BLOQUÉES ===== */
    .disabled {
        background: repeating-linear-gradient(
            45deg,
            #d9d9d9,
            #d9d9d9 6px,
            #ffffff 6px,
            #ffffff 12px
        ) !important;
    }

    /* ===== SUPPRESSION EXTÉRIEUR ===== */
    .outside-cell {
        border: none !important;
        background: transparent !important;
        box-shadow: none !important;
    }

    .outside-row > th,
    .outside-row > td {
        border: none !important;
        background: transparent !important;
    }
`;