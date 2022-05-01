import style from "./index.module.css";
const Select = ({ name, label, onChange, children }) => {
  return (
    <select className={style.select} name={name} onChange={onChange}>
      <option value="">{label}</option>
      {children}
    </select>
  );
};

export default Select;
