import style from "./index.module.css";
import useLang from "../../utils/Lang/useLang";

const Input = ({ id, name, label, list, onChange }) => {
  const { translate } = useLang();
  return (
    <div className={`${style.form_group} ${style.field}`}>
      <input
        type="input"
        className={style.form_field}
        placeholder={label}
        name={name}
        id={id}
        list={list}
        autoComplete="off"
        onChange={onChange}
        required
      />
      <label htmlFor={name} className={style.form_label}>
        {translate(label)}
      </label>
    </div>
  );
};

export default Input;
