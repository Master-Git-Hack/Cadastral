import { Symbols, symbols } from "../factors/symbols";
export interface LocationZone {
  [key: string]: string | Symbols | number;
}

export const templateLocationZone: LocationZone = {
  C1: symbols[0],
  location_zone: "",
  percentage: 0,
};

export const _templateLocationZone = [templateLocationZone];

export const addColumnAtLocationZone = (
  current: Array<LocationZone>
): Array<LocationZone> => {
  const length = Object.keys(current[0]).filter((key: string) =>
    key.includes("C")
  ).length;
  current.map((item: LocationZone) => (item[`C${length + 1}`] = symbols[0]));
  return current;
};

export const removeColumnAtLocationZone = (
  current: Array<LocationZone>
): Array<LocationZone> => {
  const length = Object.keys(current[0]).filter((key: string) =>
    key.includes("C")
  ).length;
  if (length > 1) {
    current.map((item: LocationZone) => delete item[`C${length}`]);
    return current;
  }
  return current;
};

export const addRowAtLocationZone = (
  current: Array<LocationZone>
): Array<LocationZone> => {
  const length = current.length;
  /*const columns = Object.keys(current[0]).filter((key: string) =>
    key.includes("C")
  );*/
  current.push(current[length - 1]);
  return current;
};
export const removeRowAtLocationZone = (
  current: Array<LocationZone>
): Array<LocationZone> =>
  current.length > 1 ? current.slice(0, current.length - 1) : current;
