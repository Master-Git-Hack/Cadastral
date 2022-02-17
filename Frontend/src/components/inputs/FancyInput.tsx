import { ChangeEventHandler, useState } from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";

function FancyInput(props: {
  index: number;
  currentName: string;
  currentValue: number;
  isCurrency: boolean;
  isPercentage: boolean;
  handleCurrentChange: ChangeEventHandler<HTMLInputElement>;
  toFancyNumber: Function;
}): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => setIsEditing(!isEditing);

  const {
    index,
    currentValue,
    currentName,
    isCurrency,
    isPercentage,
    handleCurrentChange,
    toFancyNumber,
  } = props;
  return (
    <>
      {isEditing ? (
        <input
          type="number"
          name={currentName}
          value={Number(currentValue)}
          onChange={handleCurrentChange}
          step={isCurrency || isPercentage ? "1" : "0.01"}
          min="0"
          max={
            isCurrency && !isPercentage
              ? "999999999999"
              : !isCurrency && isPercentage
              ? "100"
              : "2"
          }
          onBlur={toggleEditing}
          className="form-control text-right"
          style={{ minWidth: "5rem" }}
        />
      ) : (
        <>
          <input
            type="string"
            name={currentName}
            value={toFancyNumber(currentValue, isCurrency, isPercentage)}
            onChange={handleCurrentChange}
            onFocus={toggleEditing}
            className="form-control text-center text-muted "
            style={{ minWidth: "3rem", margin: "auto" }}
            readOnly
            data-tip
            data-for={`tip-${currentName}-${index}`}
          />
          <ReactTooltip
            id={`tip-${currentName}-${index}`}
            place="bottom"
            type="light"
            effect="solid"
          >
            {toFancyNumber(currentValue, isCurrency, isPercentage)}
          </ReactTooltip>
        </>
      )}
    </>
  );
}
FancyInput.propTypes = {
  index: PropTypes.number.isRequired,
  currentName: PropTypes.string.isRequired,
  currentValue: PropTypes.number.isRequired,
  isCurrency: PropTypes.bool.isRequired,
  isPercentage: PropTypes.bool,
  handleCurrentChange: PropTypes.func.isRequired,
  toFancyNumber: PropTypes.func.isRequired,
};
export default FancyInput;
