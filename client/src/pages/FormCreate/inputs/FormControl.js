import Input from "../../../components/Input";
import styles from "./index.module.css";
import useLang from "../../../utils/Lang/useLang";
import Error from "./Error";
const FormControl = ({ value, name, label, onChange, errors }) => {
  const { translate } = useLang();
  return (
    <div className={styles.input_wrapper}>
      <div>
        <Input
          id={name}
          name={name}
          label={translate(label)}
          onChange={onChange}
          value={value}
        />
        {errors?.hasOwnProperty(name) && <Error errors={errors[name]} />}
      </div>
    </div>
  );
};

export default FormControl;
