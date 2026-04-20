import { useMemo } from "react";
import "./App.css";
import Arc from "./components/arc";
import Tableau from "./components/Tableau";
import { destinyQuantity, disponibleQuantity, productUnit } from "./data/table";
import { minitab } from "./services/Minitab";
import type { NodeData } from "./types/arc";

function App() {
  // Données hi simulevako anle node sy potentiel reny fotsk itony
  // Normalement tokony misy fonction micalcul potentiel any de valeur de retour mitovy type @ ito
  // NB: Left izy rehefa hoan lettre rehetra, Right: hoan chiffre rehetra
  const nodesData: NodeData[] = [
    { id: "A", label: "A", type: "left", value: 10 },
    { id: "B", label: "B", type: "left", value: 40 },
    { id: "C", label: "C", type: "left", value: 17 },
    { id: "D", label: "D", type: "left", value: 27 },

    { id: "1", label: "1", type: "right", value: 24 },
    { id: "2", label: "2", type: "right", value: 54 },
    { id: "3", label: "3", type: "right", value: 50 },
    { id: "4", label: "4", type: "right", value: 69 },
    { id: "5", label: "5", type: "right", value: 80 },
    { id: "6", label: "6", type: "right", value: 855 },
  ];

  const solution = useMemo(() => {
    return minitab(productUnit, disponibleQuantity, destinyQuantity)
      .baseSolution;
  }, []);

  return (
    <div className="w-full h-100">
      <p className="text-center text-4xl font-bold">
        Projet RO : TRANSP - MINITAB - STEPPING STONE
      </p>
      <Tableau />
      <Arc
        transportTable={productUnit}
        transportTableSolution={solution}
        nodesData={nodesData}
      />
    </div>
  );
}

export default App;
