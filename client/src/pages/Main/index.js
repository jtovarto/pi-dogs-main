import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Paginator from "../../components/Paginator";

/* import useLang from "../../utils/Lang/useLang"; */

import {
  getAllBreeds,
  getAllTemperaments,
  getBreedsByName,
} from "../../redux/actions";

import styles from "./Main.module.css";

const Main = () => {
  const storeBreeds = useSelector((state) => state.allBreeds);
  const storeTempers = useSelector((state) => state.allTempers);
  const [temper, setTemper] = useState("all");
  const [count, setCount] = useState([1]);
  const [page, setPage] = useState(1);

  const [breedName, setBreedName] = useState("");

  let filterTimeout;

  const handleOnChange = (e) => {
    e.preventDefault();
    let name = e.target.value;
    clearTimeout(filterTimeout);
    if (!name) return dispatch(getAllBreeds());

    filterTimeout = setTimeout(() => {
      dispatch(getAllBreeds(name));
    }, 500);
  };

  const [orderBy, setOrderBy] = useState("1_name");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBreeds());
    dispatch(getAllTemperaments());
  }, []);

  let orderByCallbacks = {
    name: (a, b) => {
      let [direction] = orderBy.split("_");
      if (a.name > b.name) {
        return 1 * +direction;
      }

      if (a.name < b.name) {
        return -1 * +direction;
      }

      return 0;
    },
    weight: (a, b) => {
      let [direction] = orderBy.split("_");
      let a_min = isNaN(a.weight[0]) ? 0 : +a.weight[0];
      let b_min = isNaN(b.weight[0]) ? 0 : +b.weight[0];

      if (a_min > b_min) {
        return 1 * +direction;
      }

      if (a_min < b_min) {
        return -1 * +direction;
      }

      return 0;
    },
  };

  const print = () => {
    const init = (page - 1) * 8;

    let breeds = storeBreeds;
    let [, property] = orderBy.split("_");
    breeds = breeds.sort(orderByCallbacks[property]);

    if (temper !== "all") {
      breeds = breeds.filter((breed) => breed.temperaments.includes(temper));
    }

    if (count !== breeds.length) setCount(breeds.length);

    if (count > 0) {
      return breeds.slice(init, init + 8).map((breed) => (
        <Link to={"/detail/" + breed.id} key={breed.id}>
          <div className={styles.card}>
            {breed.name}
            <div
              style={{
                color: "black",
                fontSize: "0.75rem",
              }}
            >
              {breed.temperaments &&
                breed.temperaments.map((temper) => (
                  <p key={breed.id + temper}>{temper}</p>
                ))}

              <br />

              <p>
                {breed.weight[0]}-{breed.weight[1]}
              </p>
            </div>
          </div>
        </Link>
      ));
    }

    return <p>No results</p>;
  };

  /* const [, changeLang, lang] = useLang(); */
  /* useEffect(()=>{
    changeLang('es')
  }) */
  /* 
  const onChangeLang = (lang) => {
    changeLang(lang);
  }; */

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.panel}>
          <div className={styles.filter_panel}>
            <label htmlFor="temperamentFilter">
              Filter by Temper:
              <select
                id="temperamentFilter"
                onChange={(e) => setTemper(e.target.value)}
              >
                <option value="all">All temperaments</option>
                {storeTempers &&
                  storeTempers.map((temper) => (
                    <option key={temper.name}>{temper.name}</option>
                  ))}
              </select>
            </label>

            <label htmlFor="breedFilter">
              Filter by Breed:
              <input
                onChange={handleOnChange}
                style={{ border: "1px solid black", padding: "1rem" }}
              />
            </label>
          </div>

          <div>
            <label htmlFor="">
              Order by:
              <select
                name=""
                id=""
                onChange={(e) => setOrderBy(e.target.value)}
              >
                <option value="1_name">Name ASC</option>
                <option value="-1_name">Name DESC</option>
                <option value="1_weight">Weight ASC</option>
                <option value="-1_weight">Weight DESC</option>
              </select>
            </label>
          </div>
        </div>

        <br></br>
        <p>Results ({count})</p>
        <br></br>
        <div className={styles.content}>{storeBreeds && print()}</div>
      </div>

      <Paginator count={count} setPage={setPage} />
    </>
  );
};

export default Main;
