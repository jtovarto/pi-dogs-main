import Input from "../../../components/Input";
import styles from "./index.module.css";
import useLang from "../../../utils/Lang/useLang";
import Error from "./Error";
const FormControlGroup = ({
  min_label,
  min_name,
  min_value,
  max_label,
  max_name,
  max_value,
  onChange,
  errors,
}) => {
  const { translate } = useLang();
  return (
    <div className={styles.input_wrapper}>
      <div>
        <Input
          name={min_name}
          label={translate(min_label)}
          onChange={onChange}
          type="number"
          value={min_value}
        />
        {errors?.hasOwnProperty(min_name) && (
          <Error errors={errors[min_name]} />
        )}
      </div>

      <div>
        <Input
          name={max_name}
          label={translate(max_label)}
          onChange={onChange}
          type="number"
          value={max_value}
        />
        {errors?.hasOwnProperty(max_name) && (
          <Error errors={errors[max_name]} />
        )}
      </div>
    </div>
  );
};

export default FormControlGroup;
