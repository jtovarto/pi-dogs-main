import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./FormCreate.module.css";

import Navbar from "../../components/Navbar";
import useLang from "../../utils/Lang/useLang";
import { validate } from "../../hooks/useValidator";

import { getAllTemperaments, createBreed } from "../../redux/actions";
import FormControl from "./inputs/FormControl";
import FormControlGroup from "./inputs/FormControlGroup";
import FormSelect from "./inputs/FormSelect";

const FormCreate = () => {
  const storeTempers = useSelector((state) => state.allTempers);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const { translate } = useLang();

  useEffect(() => {
    if (storeTempers.length <= 0) {
      dispatch(getAllTemperaments());
    }
  }, [storeTempers, dispatch]);

  const inputDefault = {
    name: "",
    min_weight: 1,
    max_weight: 2,
    min_height: 1,
    max_height: 2,
    min_lifespan: 1,
    max_lifespan: 2,
    image: "https://aaa.com?aaa.jpg",
    temperaments: ["1", "6"],
  };
  const [input, setInput] = useState(inputDefault);

  const {
    name,
    min_weight,
    max_weight,
    min_height,
    max_height,
    min_lifespan,
    max_lifespan,
    image,
    temperaments,
  } = input;

  const handleOnChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handlerSelect = (e) => {
    e.preventDefault();
    if (!temperaments.includes(e.target.value)) {
      setInput({
        ...input,
        temperaments: [...input.temperaments, e.target.value],
      });
    }
  };

  const removeTemper = (id) => {
    const newTemper = temperaments.filter((temper) => +temper !== +id);
    setInput({
      ...input,
      temperaments: [...newTemper],
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const validated = validate(
      input,
      {
        name: "isRequired|isString|isGreaterThan:3",
        min_weight: "isRequired|isNumber|isBetween:1,20|isLessThan:max_weight",
        max_weight:
          "isRequired|isNumber|isBetween:1,20|isGreaterThan:min_weight",
        min_height: "isRequired|isNumber|isBetween:1,20|isLessThan:max_height",
        max_height:
          "isRequired|isNumber|isBetween:1,20|isGreaterThan:min_height",
        min_lifespan:
          "isRequired|isNumber|isBetween:1,20|isLessThan:max_lifespan",
        max_lifespan:
          "isRequired|isNumber|isBetween:1,20|isGreaterThan:min_lifespan",
        temperaments: "isArray",
        image: "isRequired|isImage",
      },
      setErrors
    );

    if (!validated) {
      return;
    }

    let data = {
      name: input.name,
      weight: [input.min_weight, input.max_weight],
      height: [input.min_height, input.max_height],
      lifespan: [input.min_lifespan, input.max_lifespan],
      temperaments: input.temperaments,
      image: input.image,
    };

    dispatch(createBreed(data));

    setInput(inputDefault);
  };
  return (
    <div>
      <Navbar />

      <div className={styles.container}>
        <form onSubmit={handleOnSubmit} className={styles.form}>
          <h1>{translate("Create a new breed")}</h1>
          <FormControl
            name="name"
            value={name}
            label="Name"
            onChange={handleOnChange}
            errors={errors}
          />

          <FormControlGroup
            onChange={handleOnChange}
            min_label="Min. height"
            min_name="min_height"
            min_value={min_height}
            max_label="Max. height"
            max_name="max_height"
            max_value={max_height}
            errors={errors}
          />

          <FormControlGroup
            onChange={handleOnChange}
            min_label="Min. weight"
            min_name="min_weight"
            min_value={min_weight}
            max_label="Max. weight"
            max_name="max_weight"
            max_value={max_weight}
            errors={errors}
          />

          <FormControlGroup
            onChange={handleOnChange}
            min_label="Min. life expectancy"
            min_name="min_lifespan"
            min_value={min_lifespan}
            max_label="Max. life expectancy"
            max_name="max_lifespan"
            max_value={max_lifespan}
            errors={errors}
          />

          <FormControl
            name="image"
            value={image}
            label="URL Image"
            onChange={handleOnChange}
            errors={errors}
          />
          <br />
          <br />
          <FormSelect
            values={temperaments}
            handlerSelect={handlerSelect}
            removeTemper={removeTemper}
            errors={errors}
          />

          <div className={styles.btn_wrapper}>
            <button type="submit">{translate("Create")}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormCreate;
