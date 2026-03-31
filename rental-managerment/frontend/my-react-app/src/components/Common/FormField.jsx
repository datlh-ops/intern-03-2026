import React from "react";

const FormField = ({ label, name, type = "text", register, error, options, placeholder, disabled }) => {

  const inputClass = `auth-input ${error ? "input-error" : ""} ${disabled ? "form-disabled" : ""}`;

  const renderInputControl = () => {
    if (type === "select") {
      return (
        <select id={name} className={inputClass} {...register(name)} disabled={disabled}>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        id={name}
        type={type}
        className={inputClass}
        placeholder={placeholder}
        {...register(name)}
        disabled={disabled}
      />
    );
  };

  return (
    <div className="form-group-rm">
      {label && <label htmlFor={name}>{label}</label>}

      {renderInputControl()}

      {error && <span className="error-text">{error.message}</span>}
    </div>
  );
};

export default FormField;
