import type { EdgesData, ArcsData, StringDictionary } from "../types/arc";

const EPSILON = 0.0000000001;

export const minitab = (productUnit: number[][], disponibleQuantity: number[], destinyQuantity: number[]) =>
{
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
    console.log("Z = " + Z)

    return{
        baseSolution,
        Z
    }
}

export const getArcTable = (transportTableData: number[][] ,transportTableSolution: number[][]): ArcsData=>{
    const arcs: EdgesData[] = [];

    for (let i = 0; i < transportTableSolution.length; i++) {
        for (let j = 0; j < transportTableSolution[i].length; j++) {
        const quantity = transportTableSolution[i][j];

        if (quantity !== 0) {
            arcs.push({
            X: String.fromCharCode(65 + i), // A, B, C...
            Y: (j+1).toString(), 
            Cxy: transportTableData[i][j]
            });
        }
        }
    }

    if (IsConnected(arcs))
    {
        return {IsDegenerate: false, EdgesDatas: arcs};
    }
    else
    {
        return {IsDegenerate: true, EdgesDatas: GenerateOneArcNoDegeneration(arcs)};
    }
}

// This is a helper
const IsConnected = (graph: EdgesData[]): boolean => {
    const adjacencyList: StringDictionary = {};
    for (const edge of graph) {
        if (!adjacencyList[edge.X])
            adjacencyList[edge.X] = [];
        if (!adjacencyList[edge.Y])
            adjacencyList[edge.Y] = [];
        adjacencyList[edge.X].push(edge.Y);
        adjacencyList[edge.Y].push(edge.X);
    }
    const vertices = Object.keys(adjacencyList);
    if (vertices.length === 0)
        return true;
    const visited = new Set<string>();
    const queue: string[] = [vertices[0]];
    visited.add(vertices[0]);
    while (queue.length > 0) {
        const current = queue.shift()!;
        for (const neighbor of adjacencyList[current]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    return visited.size === vertices.length;
};

const GetConnectedComponents = (graph: EdgesData[]): string[][] => {
    const adjacencyList: StringDictionary = {};

    for (const edge of graph) {
        if (!adjacencyList[edge.X]) {
            adjacencyList[edge.X] = [];
        }

        if (!adjacencyList[edge.Y]) {
            adjacencyList[edge.Y] = [];
        }

        adjacencyList[edge.X].push(edge.Y);
        adjacencyList[edge.Y].push(edge.X);
    }

    const visited = new Set<string>();
    const components: string[][] = [];

    for (const vertex of Object.keys(adjacencyList)) {
        if (visited.has(vertex)) continue;
        const component: string[] = [];
        const queue: string[] = [vertex];
        visited.add(vertex);
        while (queue.length > 0) {
            const current = queue.shift()!;
            component.push(current);
            for (const neighbor of adjacencyList[current]) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
        components.push(component);
    }
    return components;
};

const GenerateOneArcNoDegeneration = (graph: EdgesData[]): EdgesData[] => {
    const result: EdgesData[] = [...graph];
    const components = GetConnectedComponents(result);
    if (components.length <= 1) {
        return result;
    }
    const comp1 = components[0];
    const comp2 = components[1];
    for (const v1 of comp1) {
        for (const v2 of comp2) {
            const v1IsRow = isNaN(Number(v1));
            const v2IsRow = isNaN(Number(v2));
            if (v1IsRow === v2IsRow) {
                continue;
            }
            const X = v1IsRow ? v1 : v2;
            const Y = v1IsRow ? v2 : v1;
            const alreadyExists = result.some(
                e => e.X === X && e.Y === Y
            );
            if (!alreadyExists) {
                result.push({
                    X,
                    Y,
                    Cxy: EPSILON
                });
                return result;
            }
        }
    }
    throw new Error("Impossible de connecter les deux composantes.");
};