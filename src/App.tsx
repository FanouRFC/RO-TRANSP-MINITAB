import "./App.css";
import Arc from "./components/arc";
import Tableau from "./components/Tableau";

function App() {
  return (
    <div className="w-full h-100">
      <p className="text-center text-4xl font-bold">
        Projet RO : TRANSP - MINITAB - STEPPING STONE
      </p>
      <Tableau />
      <Arc />
    </div>
  );
}

export default App;
