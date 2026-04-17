export const minitab = () =>
{
    let productUnit: number[][] = [[24, 22, 61, 49, 83, 35], [23, 39, 78, 28, 65, 42], [67, 56, 92, 24, 53, 54], [71, 43, 91, 67, 40, 49]];
    let disponibleQuantity: number[] = [18, 32, 14, 9]; // TY le amin lignes reny, le quantite am lignes
    let destinyQuantity: number[] = [9, 11, 28, 6, 14, 5]; // TY le amin colonnes reny, le quantite am colonnes
    let baseSolution: number[][] = [];
    
    // Miinitialiser anle matrice solution de base
    let n: number = disponibleQuantity.length;
    let m: number = destinyQuantity.length;
    for (let i: number = 0; i < n; i++)
    {
        let temp: number[] = [];
        for (let j: number = 0; j < m; j++)
        {
            temp.push(0);
        }
        baseSolution.push(temp);
    }
    // Ty le boucle, miboucle izy tant que tsy 0 aby le quantites dispo sy necessaire am destination
    while(1)
    {
        let ok: boolean = true;
        let x: number = -1;
        let y: number = -1;
        let bestUnit: number = Number.POSITIVE_INFINITY;
        for (let i: number = 0; i < n; i++)
        {
            for (let j: number = 0; j < m; j++)
            {
                if (disponibleQuantity[i] == 0 || destinyQuantity[j] == 0)continue;
                if (productUnit[i][j] < bestUnit)
                {
                    ok = false;
                    bestUnit = productUnit[i][j];
                    x = i;
                    y = j;
                }
            }
        }
        if (ok) break;
        if (disponibleQuantity[x] < destinyQuantity[y])
        {
            baseSolution[x][y] = disponibleQuantity[x];
            destinyQuantity[y] = destinyQuantity[y] - disponibleQuantity[x];
            disponibleQuantity[x] = 0;
        }
        else
        {
            baseSolution[x][y] = destinyQuantity[y];
            disponibleQuantity[x] = disponibleQuantity[x] - destinyQuantity[y];
            destinyQuantity[y] = 0;
        }
        // console.log(bestUnit);
        // console.log(x + " " + y);
    }
    let Z: number = 0;
    for (let i: number = 0; i < n; i++)
    {
        for (let j: number = 0; j < m; j++)
        {
            if (baseSolution[i][j] != 0)
            {
                Z += (baseSolution[i][j] * productUnit[i][j]);
            }
        }
    }
    console.log("A = " + disponibleQuantity);
    console.log("B = " + destinyQuantity);
    console.log("Solution de base = " + baseSolution);
    console.log("Z = " + Z);
}