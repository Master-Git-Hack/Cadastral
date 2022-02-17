import { ChangeEventHandler } from "react";

export default function Selector(props: {
  currentName: string;
  subject: any;
  selector: Array<any>;
  handleChange: ChangeEventHandler<HTMLSelectElement>;
  styles: string;
}) {
  const { currentName, subject, selector, handleChange, styles } = props;

  return (
    <select
      name={currentName}
      value={subject.value}
      className={`form-select ${styles}`}
      onChange={handleChange}
    >
      {selector.map((item, index) => (
        <option
          key={`${currentName}-option-${index}`}
          value={item.value}
          className="bg-light"
        >
          {item.type}
        </option>
      ))}
    </select>
  );
}
