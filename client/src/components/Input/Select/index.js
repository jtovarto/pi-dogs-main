import style from "./index.module.css";
const Select = ({ name, label, onChange, value = "", children }) => {
  return (
    <select
      value={value}
      className={style.select}
      name={name}
      onChange={onChange}
    >
      <option value="">{label}</option>
      {children}
    </select>
  );
};

export default Select;
