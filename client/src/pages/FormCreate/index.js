import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import styles from "./FormCreate.module.css";

import { getAllTemperaments, createBreed } from "../../redux/actions";

const FormCreate = () => {
  const storeTempers = useSelector((state) => state.allTempers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (storeTempers.length <= 0) {
      dispatch(getAllTemperaments());
    }
  }, [storeTempers, dispatch]);

  const inputDefault = {
    name: "",
    weight_min: 0,
    weight_max: 0,
    height_min: 0,
    height_max: 0,
    lifespan_min: 0,
    lifespan_max: 0,
    image: "",
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
        <span>></span>
        <Link to="/main">Volver</Link>
      </div>
      <br />
      <br />

      <form onSubmit={handleOnSubmit} className={styles.form}>
        <div className={styles.input_wrapper}>
          <label htmlFor="">Name</label>
          <input
            className={styles.input}
            id="name"
            onChange={handleOnChange}
            name="name"
            value={name}
          />
        </div>

        <div className={styles.input_wrapper}>
          <label htmlFor="height">Height</label>
          <input
            className={styles.input}
            id="height"
            onChange={handleOnChange}
            name="height_min"
            type="number"
            value={height_min}
          />

          <input
            className={styles.input}
            id="height"
            onChange={handleOnChange}
            name="height_max"
            type="number"
            value={height_max}
          />
        </div>

        <div className={styles.input_wrapper}>
          <label htmlFor="weight">Weight</label>
          <input
            className={styles.input}
            id="weight"
            onChange={handleOnChange}
            name="weight_min"
            type="number"
            value={weight_min}
          />
          <input
            className={styles.input}
            id="weight"
            onChange={handleOnChange}
            name="weight_max"
            type="number"
            value={weight_max}
          />
        </div>

        <div className={styles.input_wrapper}>
          <label htmlFor="lifespan">Life span</label>
          <input
            className={styles.input}
            id="lifespan"
            onChange={handleOnChange}
            name="lifespan_min"
            type="number"
            value={lifespan_min}
          />
          <input
            className={styles.input}
            id="lifespan"
            onChange={handleOnChange}
            name="lifespan_max"
            type="number"
            value={lifespan_max}
          />
        </div>

        <div className={styles.input_wrapper}>
          <label htmlFor="image">Image</label>
          <input
            className={styles.input}
            type="url"
            id="image"
            onChange={handleOnChange}
            name="image"
            value={image}
          />
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
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default FormCreate;
