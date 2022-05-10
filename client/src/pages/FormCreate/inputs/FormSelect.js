import { useTemperaments } from "../../../hooks/useTemperaments";
import useLang from "../../../utils/Lang/useLang";

import Select from "../../../components/Input/Select";
import Error from "./Error";

import styles from "./index.module.css";

const FormSelect = ({ value, values, handlerSelect, removeTemper, errors }) => {
  const { translate } = useLang();
  const [storeTempers] = useTemperaments();

  const temperOptions = () =>
    storeTempers.length > 0 &&
    storeTempers.map((temper) => (
      <option value={temper.id} key={temper.name}>
        {temper.name}
      </option>
    ));

  const errorRendering = () =>
    errors?.hasOwnProperty("temperaments") && (
      <Error errors={errors["temperaments"]} />
    );
  const selectProperties = {
    id: "temperaments",
    name: "temperaments",
    onChange: handlerSelect,
    label: translate("Temperaments"),
    value: value,
  };

  const temperAddedRendering = () => {
    if (values.length > 0) {
      if (storeTempers.length > 0) {
        return values.map((v) => {
          const found = storeTempers.find((temper) => +temper.id === +v);
          return (
            <span key={found.name} className={styles.badge}>
              {found.name}
              <span onClick={() => removeTemper(+v)} className={styles.icon}>
                x
              </span>
            </span>
          );
        });
      }
    }
    return <p>{translate("No temperament has been added.")}</p>;
  };
  return (
    <div className={styles.input_wrapper}>
      <div>
        <Select {...selectProperties}>{temperOptions()}</Select>
        {errorRendering()}
      </div>

      <div>
        <h3>{translate("Added temperaments")}</h3>
        <div className={styles.badges_wrapper}>{temperAddedRendering()}</div>
      </div>
    </div>
  );
};

export default FormSelect;
