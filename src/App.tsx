import "./App.css";
import Arc from "./components/arc";
import Tableau from "./components/Tableau";
import type { EdgesData, NodeData } from "./types/arc";

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

  const edgesData: EdgesData[] = [
    { X: "A", Cxy: 22, Y: "2" },
    { X: "A", Cxy: 61, Y: "3" },
    { X: "A", Cxy: 83, Y: "6" },
    { X: "B", Cxy: 23, Y: "1" },
    { X: "B", Cxy: 78, Y: "3" },
    { X: "C", Cxy: 92, Y: "3" },
    { X: "C", Cxy: 24, Y: "4" },
    { X: "C", Cxy: 53, Y: "5" },
    { X: "D", Cxy: 40, Y: "5" },
  ];

  return (
    <div className="w-full h-100">
      <p className="text-center text-4xl font-bold">
        Projet RO : TRANSP - MINITAB - STEPPING STONE
      </p>
      <Tableau />
      <Arc edgesData={edgesData} nodesData={nodesData} />
    </div>
  );
}

export default App;
