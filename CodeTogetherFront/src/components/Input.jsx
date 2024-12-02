const Input = ({ label, type, name, required, className, value }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      name={name}
      id={name}
      required={required}
      className={`border-2 border-slate-500 pl-2 ${className || ""}`}
      value={value}
    />
  </div>
);

export default Input;
