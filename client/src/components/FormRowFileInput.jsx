const FormRowFileInput = ({
  type,
  name,
  labelText,
  onChange,
  required = false,
  accept,
}) => {
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
        onChange={onChange}
        required={required}
        accept={accept}
      />
    </div>
  );
};
export default FormRowFileInput;
