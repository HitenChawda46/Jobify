import { forwardRef, useImperativeHandle, useRef } from "react";

const FormRowSelect = forwardRef(
  ({ name, labelText, list, defaultValue = "", onChange }, ref) => {
    const selectRef = useRef();
    useImperativeHandle(ref, () => {
      return {
        reset: () => {
          selectRef.current.value = list[0];
        },
      };
    });
    return (
      <div className="form-row">
        <label htmlFor={name} className="form-label">
          {labelText || name}
        </label>
        <select
          name={name}
          id={name}
          className="form-select"
          defaultValue={defaultValue}
          onChange={onChange}
          ref={selectRef}
        >
          {list.map((itemValue) => {
            return (
              <option key={itemValue} value={itemValue}>
                {itemValue}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
);
export default FormRowSelect;
