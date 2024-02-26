import { forwardRef, useImperativeHandle, useRef } from "react";

const FormRow = forwardRef(
  ({ type, name, labelText, defaultValue, onChange }, ref) => {
    const inputRef = useRef();
    useImperativeHandle(ref, () => {
      return {
        reset: () => {
          inputRef.current.value = "";
        },
      };
    });
    return (
      <div className="form-row">
        <label htmlFor={name} className="form-label">
          {labelText || name}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          className="form-input"
          defaultValue={defaultValue}
          onChange={onChange}
          required
          ref={inputRef}
        />
      </div>
    );
  }
);
export default FormRow;
