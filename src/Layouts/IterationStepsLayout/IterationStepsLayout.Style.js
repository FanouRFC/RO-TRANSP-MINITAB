import styled from 'styled-components';

// --- Vos anciens styles conservés pour éviter les ruptures ---
export const IterationGraph = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #f8f9fa;

  .main-title {
    font-size: 1.75rem;
    color: #212529;
    margin-bottom: 24px;
    font-weight: 700;
    border-bottom: 2px solid #dee2e6;
    padding-bottom: 8px;
  }
`;

export const StepsLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px; /* Espace confortable entre chaque grande étape */
`;

export const SolutionLayoutContainer = styled.div`
  /* Conservé au cas où il est utilisé ailleurs */
`;

export const StepsLayoutTitle = styled.div`
  /* Conservé au cas où il est utilisé ailleurs */
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


// --- Les nouveaux styles requis par le Layout ---

export const StepCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .section-divider {
    border: 0;
    border-top: 1px dashed #cbd5e1;
    margin: 16px 0;
    width: 100%;
  }

  .graph-wrapper {
    background: #fdfdfd;
    border: 1px solid #f1f5f9;
    border-radius: 8px;
    padding: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .single-graph {
    margin-top: 12px;
  }

  .gains-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .gain-card-item {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 16px;
  }

  .calcul-reference {
    font-weight: 600;
    color: #475569;
    margin: 0 0 10px 0;
  }

  .matrix-preview {
    margin-bottom: 12px;
  }

  .gain-formula {
    margin: 0;
    font-size: 0.95rem;
    color: #334155;
    span { color: #dc2626; }
    strong { color: #16a34a; font-size: 1.05rem; }
  }
`;

export const StepHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  .step-badge {
    background-color: #3b82f6;
    color: white;
    padding: 6px 16px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.95rem;
    box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
  }
`;

export const SubSectionTitle = styled.h4`
  font-size: 1.1rem;
  color: #475569;
  margin: 10px 0 0 0;
  font-weight: 600;
  letter-spacing: -0.02em;
`;

export const GraphGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  width: 100%;
`;

export const DeltaCalculList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 8px;

  .delta-item {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 8px 12px;
    border-radius: 6px;
    
    code {
      font-family: 'Courier New', Courier, monospace;
      color: #0f172a;
      font-size: 0.9rem;
      font-weight: bold;
    }
  }
`;

export const GainHighlightBox = styled.div`
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 14px;

  .highlight-icon {
    font-size: 1.5rem;
  }

  .highlight-content {
    p {
      margin: 0 0 4px 0;
      color: #166534;
      font-size: 0.95rem;
    }
  }

  .final-formula {
    font-size: 1.1rem;
    font-weight: 700;
    color: #14532d;
    background: #dcfce7;
    padding: 2px 8px;
    border-radius: 4px;
    display: inline-block;
  }
`;