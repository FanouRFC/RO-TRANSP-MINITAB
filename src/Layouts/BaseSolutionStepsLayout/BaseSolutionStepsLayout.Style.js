import styled from "styled-components";

export const StepsGraph = styled.div`
    flex: 1;
    display: flex;
    background-color: #f8fafc; /* Fond de page gris très clair moderne */
    min-height: 100%;

    .solution-container {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
`;

export const StepsLayoutTitle = styled.div`
    background: red;
    width: 100%;
    z-index: 3;
    // height: ${({theme})=>theme.size(8)}px;
    padding: ${({theme}) => theme.size(2)+4}px ${({theme})=>theme.size(3)}px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${({theme})=>theme.colors.white};
    color: ${({theme})=>theme.colors.brandPrimary900};
    box-shadow: ${({theme})=>theme.shadows.shadow1};
`;

/* Nouveau composant pour la barre de navigation */
export const NavigationStepsBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    padding: 16px 32px;
    border-bottom: 1px solid #f1f5f9;
    
    .progress-text {
        font-size: 0.95rem;
        font-weight: 600;
        color: #64748b;
        background: #f1f5f9;
        padding: 6px 16px;
        border-radius: 20px;
    }

    .nav-buttons {
        display: flex;
        gap: 12px;
    }

    .btn-nav {
        background: #ffffff;
        color: #334155;
        border: 1px solid #cbd5e1;
        padding: 8px 18px;
        font-size: 0.9rem;
        font-weight: 600;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 6px;

        &:hover:not(:disabled) {
            background: #f8fafc;
            border-color: #94a3b8;
            color: #1e293b;
            transform: translateY(-1px);
        }

        &:disabled {
            opacity: 0.4;
            cursor: not-allowed;
            background: #f1f5f9;
        }

        &.primary {
            background: #2563eb;
            color: #ffffff;
            border-color: #2563eb;

            &:hover:not(:disabled) {
                background: #1d4ed8;
                border-color: #1d4ed8;
                box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
            }
        }
    }
`;

export const StepsLayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 32px;
    align-items: center;
    justify-content: center;
    flex: 1;

    .solutions {
        background: #ffffff;
        border-radius: 16px;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
        border: 1px solid #e2e8f0;
        padding: 32px;
        width: 100%;
        max-width: 1100px;
        transition: transform 0.3s ease;
        animation: fadeIn 0.4s ease-out;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .solutions-title {
        font-size: 1.15rem;
        font-weight: 700;
        color: #1e293b;
        margin-top: 0;
        margin-bottom: 28px;
        display: inline-flex;
        align-items: center;
        background: #eff6ff;
        color: #1d4ed8;
        padding: 6px 16px;
        border-radius: 8px;
        border: 1px solid #bfdbfe;
    }

    /* 🔥 Flex horizontal amélioré pour les matrices */
    .step-matrices {
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
        gap: 32px;
        flex-wrap: wrap; /* Aligne l'un sous l'autre sur petit écran, côte à côte sinon */
    }

    /* 🔥 Container des matrices */
    .matrix-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        min-width: 440px;
        background: #f8fafc;
        border-radius: 12px;
        padding: 20px;
        border: 1px dashed #cbd5e1;
    }

    /* ===== TABLE ===== */
    .transport-table {
        border-collapse: separate;
        border-spacing: 0;
        table-layout: fixed;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
    }

    .transport-table th {
        background: #f1f5f9;
        color: #475569;
        font-weight: 600;
        padding: 10px;
        font-size: 0.9rem;
    }

    .transport-table td,
    .transport-table th {
        border: 1px solid #e2e8f0;
    }

    /* ===== CELLULE ===== */
    .cell {
        position: relative;
        width: 75px;
        height: 75px;
        text-align: center;
        vertical-align: middle;
        transition: background-color 0.2s ease;

        &:hover {
            background-color: #f8fafc;
        }
    }

    .cost {
        font-size: 14px;
        color: #64748b;
        font-weight: 500;
    }

    .allocation {
        font-size: 22px;
        font-weight: 800;
        color: #0f172a;
    }

    /* ===== CASES BLOQUÉES (Hachurées) ===== */
    .disabled {
        background: repeating-linear-gradient(
            45deg,
            #f1f5f9,
            #f1f5f9 8px,
            #ffffff 8px,
            #ffffff 16px
        ) !important;
        opacity: 0.75;
    }

    /* ===== SUPPRESSION BORDURES EXTÉRIEURES ===== */
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

    /* ===== MACARON SIGNES (+/-) ===== */
    .sign {
        position: absolute;
        top: 6px;
        right: 6px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #f59e0b;
        border: 2px solid #ffffff;
        color: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 14px;
        z-index: 5;
    }
`;

export const Remaining = styled.td`
    color: #ef4444;
    font-weight: 700;
    text-align: center;
    border: none !important;
    background: transparent !important;
`;

export const RemainingRight = styled.td`
    color: #ef4444;
    font-weight: 700;
    text-align: left;
    padding-left: 12px;
    border: none !important;
    background: transparent !important;
`;

export const RemainingBottom = styled.td`
    color: #ef4444;
    font-weight: 700;
    text-align: center;
    border: none !important;
    background: transparent !important;
`;