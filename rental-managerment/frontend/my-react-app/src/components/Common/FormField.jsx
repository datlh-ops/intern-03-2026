import React from "react";

const FormField = ({ label, name, type = "text", register, error, options, placeholder }) => {

  const inputClass = `auth-input ${error ? "input-error" : ""}`;

  const renderInputControl = () => {
    if (type === "select") {
      return (
        <select id={name} className={inputClass} {...register(name)}>
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
      />
    );
  };

  return (
    <div className="input-group">
      {label && <label htmlFor={name}>{label}</label>}

      {renderInputControl()}

      {error && <span className="error-text">{error.message}</span>}
    </div>
  );
};

export default FormField;
