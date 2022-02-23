import { FC } from "react";
import { SelectorProps } from "../../types/inputs/selector";
export const Selector: FC<SelectorProps> = (props) => (
  <select
    key={props.id}
    id={`selector-${props.name}-${props.id}`}
    name={props.name}
    className={`form-select form-select-sm ${props.style}`}
    value={props.subject.value}
    onChange={props.onChange}
  >
    {props.selector.map((option, index: number) => (
      <option
        id={`selector-${props.name}-${props.id}-option-${option.type}-${index}`}
        key={`selector-${props.name}-${props.id}-option-${option.type}-${index}`}
        value={option.value}
        className="bg-light"
      >
        {option.type}
      </option>
    ))}
  </select>
);
