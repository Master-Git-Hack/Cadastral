import { FactorState } from "../types/homologation/factors/factor";
/**
 * @author Einar Jhordany Serna Valdivia
 * @param value number that will be converted to a string displaying a representative character as $ or % in case you need it
 * @param isCurrency boolean that will be used to determine if the value will be converted to a currency or not
 * @param isPercentage boolean that will be used to determine if the value will be converted to a percentage or not
 * @param decimals number that will be used to determine the number of decimals to be displayed
 * @returns a string that represents the value in the desired format (currency or percentage or decimal)
 * @example toFancyNumber(123456789, true, false, 2) // returns "$1,234,567.89"
 * @example toFancyNumber(123456789, false, true, 2) // returns "1234567.89%"
 * @example toFancyNumber(123456789, false, false, 2) // returns "1234567.89"
 * @example toFancyNumber(123456789, false, false, 0) // returns "1234567"
 */
export const toFancyNumber: Function = (
  value: number,
  isCurrency: boolean = false,
  isPercentage: boolean = false,
  decimals: number = 2
): string =>
  new Intl.NumberFormat("es-MX", {
    style: isCurrency ? "currency" : isPercentage ? "percent" : "decimal",
    minimumFractionDigits: decimals,
    currency: isCurrency ? "MXN" : undefined,
  }).format(isPercentage && !isCurrency ? value / 100 : value);

/**
 * @author Einar Jhordany Serna Valdivia
 * @param value number that will round to the nearest tenth
 * @param decimals number that will be used to determine the rounding precision
 * @returns a number that represents the value rounded to the nearest tenth
 * @example roundToTenth(123456789, 2) // returns 1234567.9
 *
 */
export const roundToTenth = (value: number, decimals: number = 2): number =>
  Number((value / 10).toString().split(".")[1]) <= 5
    ? Math.floor(value / Math.pow(10, decimals)) * Math.pow(10, decimals)
    : Math.ceil(value / Math.pow(10, decimals)) * Math.pow(10, decimals);

export const findFactor: Function = (
  valueToFind: number,
  collection: Array<FactorState | any>
): FactorState =>
  collection.find((object: FactorState) => object.value === valueToFind);

export const defineResults = (items: any) => {
  items = items.map((item: any, index: number) => {
    const {
      building,
      classification,
      level,
      project,
      quality,
      topography,
      typeForm,
      usage,
    } = item;
    let object = {
      salesCost: 0,
      area: 0,
      unitCost:0,
      building: building.subject.value / building.current.value,
      classification:
        classification.subject.value / classification.current.value,
      level: level.subject.value / level.current.value,
      project: project.subject.value / project.current.value,
      quality: quality.subject.value / quality.current.value,
      topography: topography.subject.value / topography.current.value,
      typeForm: typeForm.subject.value / typeForm.current.value,
      usage: usage.subject.value / usage.current.value,
      resultingTypeApprovalFactor: 1,
      weightingPercentage: 0,
    };
    if (index === 0) {
      const { location, zone } = item;
      const handle = (current: any): Array<number> => {
        const columns = Object.keys(current[0]).filter((key: string) =>
          key.includes("C")
        );
        return columns.map((key: string) =>
          current
            .map((item: any) => ({
              percentage: item.percentage,
              [key]: item[key],
            }))
            .reduce(
              (previous: number, current: any) =>
                previous + (current.percentage / 100) * current[key].value,
              1
            )
        );
      };
      return {
        ...item,
        ...object,
          location: handle(location),
          zone: handle(zone),
        
      };
    }
    return {
      ...item,
      ...object,
    };
  });
  const handleLocationZone = (name = "location" || "zone"): void =>
    items[0][name].map(
      (item: any, index: number) => (items[index][name] = item)
    );

  handleLocationZone("location");
  handleLocationZone("zone");
  return items;
};
