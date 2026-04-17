import { useEffect, useState } from "react";
import "../services/Minitab.ts";
import { minitab } from "../services/Minitab.ts";
import TableData from "./transportTable.tsx";

export default function Tableau() {
  var [productUnit, setProductUnit] = useState<number[][]>([
    [24, 22, 61, 49, 83, 35],
    [23, 39, 78, 28, 65, 42],
    [67, 56, 92, 24, 53, 54],
    [71, 43, 91, 67, 40, 49],
  ]);

  var [disponibleQuantity, setDisponibleQuantity] = useState<number[]>([
    18, 32, 14, 9,
  ]);
  var [destinyQuantity, setDestinyQuantity] = useState<number[]>([
    9, 11, 28, 6, 14, 5,
  ]);

  var [baseSolution, setBaseSolution] = useState<number[][]>([]);
  var [z, setZ] = useState<number>();

  useEffect(() => {
    const resultat = minitab(
      productUnit.map((row) => [...row]),
      [...disponibleQuantity],
      [...destinyQuantity],
    );
    // console.log(" Z EST EGALE A  " + resultat.Z);
    setBaseSolution(resultat.baseSolution);
    setZ(resultat.Z);
  }, [productUnit, disponibleQuantity, destinyQuantity]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 g-10 m-5">
      <TableData
        data={productUnit}
        destinyQuantity={destinyQuantity}
        disponibleQuantity={disponibleQuantity}
      />
      <TableData
        data={baseSolution}
        destinyQuantity={destinyQuantity}
        disponibleQuantity={disponibleQuantity}
      />
    </div>
  );
}
