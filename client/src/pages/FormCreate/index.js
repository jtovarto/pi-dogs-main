import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import styles from "./FormCreate.module.css";

import { validate } from "../../hooks/useValidator";

import { getAllTemperaments, createBreed } from "../../redux/actions";

const FormCreate = () => {
  const storeTempers = useSelector((state) => state.allTempers);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (storeTempers.length <= 0) {
      dispatch(getAllTemperaments());
    }
  }, [storeTempers, dispatch]);

  const inputDefault = {
    name: "AAA",
    weight_min: 1,
    weight_max: 2,
    height_min: 1,
    height_max: 2,
    lifespan_min: 1,
    lifespan_max: 2,
    image: "https://aaa.com?aaa.jpg",
    temperaments: [],
  };
  const [input, setInput] = useState(inputDefault);
  const handleOnChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const {
    name,
    weight_min,
    weight_max,
    height_min,
    height_max,
    lifespan_min,
    lifespan_max,
    image,
    temperaments,
  } = input;

  const addTemper = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      temperaments: [...input.temperaments, e.target.value],
    });
  };
  /* const urlValidation = (URL) => {
    const regex = new RegExp(/(https?:\/\/.*\.(?:png|jpg|gif))/);
    return regex.test(URL);
  }; */
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const validated = validate(
      input,
      {
        name: "isRequired|isString",
        weight_min: "isRequired|isNumber|isBetween:1,20|isLessThan:weight_max",
        weight_max:
          "isRequired|isNumber|isBetween:1,20|isGreaterThan:weight_min",
        height_min: "isRequired|isNumber|isBetween:1,20|isLessThan:height_max",
        height_max:
          "isRequired|isNumber|isBetween:1,20|isGreaterThan:height_min",
        lifespan_min:
          "isRequired|isNumber|isBetween:1,20|isLessThan:lifespan_max",
        lifespan_max:
          "isRequired|isNumber|isBetween:1,20|isGreaterThan:lifespan_min",
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
      weight: [input.weight_min, input.weight_max],
      height: [input.height_min, input.height_max],
      lifespan: [input.lifespan_min, input.lifespan_max],
      temperaments: input.temperaments,
      image: input.image,
    };

    dispatch(createBreed(data));
  };
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", gap: ".5rem", padding: "2rem" }}>
        <span>Home</span>
        <span>&gt;</span>
        <Link to="/main">Volver</Link>
      </div>

      <br />
      <br />

      <form onSubmit={handleOnSubmit} className={styles.form}>
        <div className={styles.input_wrapper}>
          <label htmlFor="">Name</label>
          <div>
            <input
              className={styles.input}
              id="name"
              onChange={handleOnChange}
              name="name"
              value={name}
            />
            {errors?.hasOwnProperty("name") &&
              errors["name"].map((error) => <p>{error}</p>)}
          </div>
        </div>

        <div className={styles.input_wrapper}>
          <label htmlFor="height">Height</label>
          <div>
            <input
              className={styles.input}
              id="height"
              onChange={handleOnChange}
              name="height_min"
              type="number"
              value={height_min}
            />
            {errors?.hasOwnProperty("height_min") &&
              errors["height_min"].map((error) => <p>{error}</p>)}
          </div>

          <div>
            <input
              className={styles.input}
              id="height"
              onChange={handleOnChange}
              name="height_max"
              type="number"
              value={height_max}
            />
            {errors?.hasOwnProperty("height_max") &&
              errors["height_max"].map((error) => <p>{error}</p>)}
          </div>
        </div>

        <div className={styles.input_wrapper}>
          <label htmlFor="weight">Weight</label>
          <div>
            <input
              className={styles.input}
              id="weight"
              onChange={handleOnChange}
              name="weight_min"
              type="number"
              value={weight_min}
            />
            {errors?.hasOwnProperty("weight_min") &&
              errors["weight_min"].map((error) => <p>{error}</p>)}
          </div>

          <div>
            <input
              className={styles.input}
              id="weight"
              onChange={handleOnChange}
              name="weight_max"
              type="number"
              value={weight_max}
            />
            {errors?.hasOwnProperty("weight_max") &&
              errors["weight_max"].map((error) => <p>{error}</p>)}
          </div>
        </div>

        <div className={styles.input_wrapper}>
          <label htmlFor="lifespan">Life span</label>
          <div>
            <input
              className={styles.input}
              id="lifespan_min"
              onChange={handleOnChange}
              name="lifespan_min"
              type="number"
              value={lifespan_min}
            />
            {errors?.hasOwnProperty("lifespan_min") &&
              errors["lifespan_min"].map((error) => <p>{error}</p>)}
          </div>
          <div>
            <input
              className={styles.input}
              id="lifespan_max"
              onChange={handleOnChange}
              name="lifespan_max"
              type="number"
              value={lifespan_max}
            />
            {errors?.hasOwnProperty("lifespan_max") &&
              errors["lifespan_max"].map((error) => <p>{error}</p>)}
          </div>
        </div>

        <div className={styles.input_wrapper}>
          <div>
            <label htmlFor="image">Image</label>
            <input
              className={styles.input}
              type="url"
              id="image"
              onChange={handleOnChange}
              name="image"
              value={image}
            />
            {errors?.hasOwnProperty("image") &&
              errors["image"].map((error) => <p>{error}</p>)}
          </div>
        </div>

        <div className={styles.input_wrapper}>
          <label htmlFor="temperaments">Temperaments</label>
          <select
            multiple
            className={styles.input}
            name={temperaments}
            id="temperaments"
            onChange={addTemper}
          >
            {storeTempers &&
              storeTempers.map((temper) => (
                <option key={temper.name} value={temper.id}>
                  {temper.name}
                </option>
              ))}
          </select>
          {errors?.hasOwnProperty("temperaments") &&
            errors["temperaments"].map((error) => <p>{error}</p>)}
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default FormCreate;
