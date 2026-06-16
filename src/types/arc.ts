export type NodeData = {
  id: string;
  label: string;
  type: "left" | "right";
  value?: number;
};

export type EdgesData = {
    X: string;
    Cxy: number;
    Y: string;
}

export type ArcsData = {
    IsDegenerate: boolean;
    EdgesDatas : EdgesData[];
}

export type StringDictionary = {
    [key: string] : string[];
}