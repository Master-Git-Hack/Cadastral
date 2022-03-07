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
  Number((value / 10).toString().split(".")[1][0]) <= 5
    ? Math.floor(value / Math.pow(10, decimals)) * Math.pow(10, decimals)
    : Math.ceil(value / Math.pow(10, decimals)) * Math.pow(10, decimals);

export const findFactor: Function = (
  valueToFind: number,
  collection: Array<FactorState | any>
): FactorState =>
  collection.find((object: FactorState) => object.value === valueToFind);

export const defineResults = (items: any) => {
  const ageSubject = items[0].age.subject.value;
  const buildingSubject = items[0].building.subject.value;
  const classificationSubject = items[0].classification.subject.value;
  const levelSubject = items[0].level.subject.value;
  const projectSubject = items[0].project.subject.value;
  const qualitySubject = items[0].quality.subject.value;
  const topographySubject = items[0].topography.subject.value;
  const typeFormSubject = items[0].typeForm.subject.value;
  const usageSubject = items[0].usage.subject.value;
  items = items.map((item: any, index: number) => {
    const {
      age,
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
      salesCost: 1,
      area: 1,
      unitCost: 1,
      surface: 1,
      age: 1 - (ageSubject - age.current.value) * 0.01,
      building: buildingSubject / building.current.value,
      classification: classificationSubject / classification.current.value,
      level: levelSubject / level.current.value,
      project: projectSubject / project.current.value,
      quality: qualitySubject / quality.current.value,
      topography: topographySubject / topography.current.value,
      typeForm: typeFormSubject / typeForm.current.value,
      usage: usageSubject / usage.current.value,
      comparison: 1,
      resultingTypeApprovalFactor: 1,
      weightingPercentage: 100 / items.length,
      resultingUnitaryCost: 1,
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
        zone: handle(location),
      };
    }
    object = {
      ...object,
      resultingTypeApprovalFactor:
        object.age *
        object.building *
        object.classification *
        object.level *
        object.project *
        object.quality *
        object.topography *
        object.typeForm *
        object.usage,
    };
    return {
      ...item,
      ...object,
    };
  });
  const handleLocationZone = (name = "location" || "zone"): void =>
    items[0][name].map((item: any, index: number) => {
      items[index][name] = item;
      items[index].resultingTypeApprovalFactor *= item;
    });

  handleLocationZone("location");
  handleLocationZone("zone");
  return items;
};

export const handleVisibility = (items: any, element: string) => {
  const item = items.find((current: any) => current.type === element);
  return item;
};

export const makeCalculations = (
  items: any,
  type: string,
  areaSubject: number
) => {
  const averageLotArea =
    items.reduce(
      (previous: number, current: any) => previous + Number(current.area),
      0
    ) / items.length;

  items = items.map((item: any) => {
    const { salesCost, area } = item;
    item.unitCost = salesCost / area;

    item.surface =
      (area / (type === "TERRENO" ? averageLotArea : areaSubject)) **
      (1 / (type === "TERRENO" ? 12 : 8));
    const {
      age,
      building,
      classification,
      level,
      project,
      quality,
      typeForm,
      topography,
      usage,
      location,
      zone,
      comparison,
      surface,
    } = item;

    item.resultingTypeApprovalFactor =
      (age || 1) *
      (building || 1) *
      (classification || 1) *
      (level || 1) *
      (project || 1) *
      (quality || 1) *
      (topography || 1) *
      (typeForm || 1) *
      (usage || 1) *
      (location || 1) *
      (zone || 1) *
      (comparison || 1) *
      (surface || 1);

    item.resultingUnitaryCost =
      item.resultingTypeApprovalFactor * item.unitCost || 1;

    return item;
  });
  const averageUnitValue = items.reduce(
    (previous: number, current: any) =>
      previous +
      current.resultingUnitaryCost * (current.weightingPercentage / 100),
    0
  );
  return {
    results: items,
    averageLotArea,
    averageUnitValue,
  };
};
