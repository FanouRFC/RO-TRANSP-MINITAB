// services/potentiel.ts

type Arc = { row: string; col: string; cout: number };

// Étape 1 : détecter dégénérescence et choisir les arcs ε
export function ajouterArcsFictifs(
  arcsDeBase: Arc[],
  rows: string[],
  cols: string[],
  couts: Record<string, number>
): Arc[] {
  const manquants = rows.length + cols.length - 1 - arcsDeBase.length;
  if (manquants <= 0) return arcsDeBase;

  const result = [...arcsDeBase];

  // cellules vides candidates
  const cellulesVides: { row: string; col: string }[] = [];
  for (const r of rows) {
    for (const c of cols) {
      const dejaDedans = result.some(a => a.row === r && a.col === c);
      if (!dejaDedans) cellulesVides.push({ row: r, col: c });
    }
  }

  // ajouter les manquants avec cout = 0
  for (let i = 0; i < manquants; i++) {
    result.push({
      row: cellulesVides[i].row,
      col: cellulesVides[i].col,
      cout: 0,
    });
  }

  return result;
}

// Étape 2 : calculer u_i et v_j
export function calculerPotentiels(arcsDeBase: Arc[]): {
  u: Record<string, number>;
  v: Record<string, number>;
} {
  const u: Record<string, number> = {};
  const v: Record<string, number> = {};

  // fixer u du premier nœud source à 0
  u[arcsDeBase[0].row] = 0;

  let changed = true;
  while (changed) {
    changed = false;
    for (const { row, col, cout } of arcsDeBase) {
      if (u[row] !== undefined && v[col] === undefined) {
        v[col] = cout - u[row];
        changed = true;
      }
      if (v[col] !== undefined && u[row] === undefined) {
        u[row] = cout - v[col];
        changed = true;
      }
    }
  }

  return { u, v };
}

// Étape 3 : calculer Δ_ij pour les arcs hors base
export function calculerDeltaHorsBase(
  rows: string[],
  cols: string[],
  arcsDeBase: Arc[],
  couts: Record<string, number>,
  u: Record<string, number>,
  v: Record<string, number>
): { row: string; col: string; delta: number }[] {
  const result = [];

  for (const row of rows) {
    for (const col of cols) {
      const estDansLaBase = arcsDeBase.some(a => a.row === row && a.col === col);
      if (!estDansLaBase) {
        const cij = couts[`${row}-${col}`] ?? 0;
        const delta = cij - (u[row] ?? 0) - (v[col] ?? 0);
        result.push({ row, col, delta });
      }
    }
  }

  return result;
}