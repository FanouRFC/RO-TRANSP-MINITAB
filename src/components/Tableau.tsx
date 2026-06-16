import { useEffect, useState } from "react";
import "../services/Minitab.ts";
import { getArcTable, minitab } from "../services/Minitab.ts";
import TableData from "./transportTable.tsx";

export default function Tableau() {
  var [productUnit, setProductUnit] = useState<number[][]>([
    [45,60,45,30,45,50],
    [35,15,35,35,25,25],
    [30,25,45,55,15,55],
    [30,40,55,10,10,50]
  ]);

  var [disponibleQuantity, setDisponibleQuantity] = useState<number[]>([
    20, 30, 40,10
  ]);
  var [destinyQuantity, setDestinyQuantity] = useState<number[]>([
    20,30,10,20,10,10
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

    const arcs = getArcTable(
        productUnit,
        resultat.baseSolution
    );

    console.log(arcs)
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
