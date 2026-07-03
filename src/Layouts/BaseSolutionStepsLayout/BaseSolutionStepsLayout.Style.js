import styled from "styled-components";

export const StepsGraph = styled.div`
    flex: 1;
    display: flex;
    overflow-y: auto;

    .solution-container {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
`;

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

export const Remaining = styled.td`
    color: red;
    font-weight: bold;
    text-align: center;

    border: none !important;
    background: transparent !important;
`;

export const RemainingRight = styled.td`
    color: red;
    font-weight: bold;
    text-align: left;
    padding-left: 10px;

    border: none !important;
    background: transparent !important;
`;

export const RemainingBottom = styled.td`
    color: red;
    font-weight: bold;
    text-align: center;

    border: none !important;
    background: transparent !important;
`;

