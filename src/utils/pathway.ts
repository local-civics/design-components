import { Pathway, pathways } from "../../build/old/models/pathway";

export const getPathways = (from: string[] | null) => {
  const selected: Pathway[] = [];
  from?.forEach((pathway) => {
    if (pathways.includes(pathway as Pathway)) {
      selected.push(pathway as Pathway);
    }
  });
  return selected;
};
