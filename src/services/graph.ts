// services/graph.ts
import { ajouterArcsFictifs, calculerPotentiels } from "./potentiel";
import type { NodeData, EdgesData, TableauCell } from "../types/arc";

export function tableauToGraph(
  tableau: TableauCell[],
  couts: Record<string, number>
): { nodesData: NodeData[]; edgesData: EdgesData[] } {

  const rows = [...new Set(tableau.map(c => c.row))];
  const cols = [...new Set(tableau.map(c => c.col))];

  // arcs de base depuis tableau (cellules non vides)
  const arcsDeBase = tableau
    .filter(c => c.value > 0)
    .map(c => ({ row: c.row, col: c.col, cout: couts[`${c.row}-${c.col}`] ?? 0 }));

  // ajouter arcs fictifs si dégénéré
  // TEST

  console.log({
  rows: rows.length,
  cols: cols.length,
  base: arcsDeBase.length,
  manquants:
    rows.length + cols.length - 1 - arcsDeBase.length,
});

const arcsComplets = [
  ...arcsDeBase,
  { row: "A", col: "2", cout: 0 },
  { row: "B", col: "1", cout: 0 },
];

const arcsFictifs = arcsComplets.slice(arcsDeBase.length);
console.log("arcsFictifs", arcsFictifs);
  // calculer potentiels
  const { u, v } = calculerPotentiels(arcsComplets);
  console.log("u =", u);
console.log("v =", v);

  // nodes avec potentiels comme valeur
  const nodesData: NodeData[] = [
    ...rows.map(r => ({ id: r, label: r, type: "left"  as const, value: u[r] })),
    ...cols.map(c => ({ id: c, label: c, type: "right" as const, value: v[c] })),
  ];

  // edges : arcs de base normaux
  const edgesData: EdgesData[] = arcsDeBase.map(a => ({
    X: a.row,
    Y: a.col,
    Cxy: couts[`${a.row}-${a.col}`],
    isFictif: false,
  }));

  // edges : arcs fictifs ε
  for (const a of arcsFictifs) {
    edgesData.push({
      X: a.row,
      Y: a.col,
      Cxy: "ε",
      isFictif: true,
    });
  }

  return { nodesData, edgesData };
}