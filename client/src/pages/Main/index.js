import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Paginator from "../../components/Paginator";

import useLang from "../../utils/Lang/useLang";

import { getAllBreeds, getAllTemperaments } from "../../redux/actions";

import styles from "./Main.module.css";

const Main = () => {
  const storeBreeds = useSelector((state) => state.allBreeds);
  const storeTempers = useSelector((state) => state.allTempers);
  const [temper, setTemper] = useState("all");
  const [count, setCount] = useState([1]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);
  const dispatch = useDispatch();

  const getBreeds = getAllBreeds(dispatch);
  const getTempers = getAllTemperaments(dispatch);

  useEffect(() => {
    getBreeds();
    getTempers();
  }, []);

  const print = () => {
    const init = (page - 1) * 8;

    let breeds = storeBreeds;

    if (temper !== "all") {
      breeds = breeds.filter((breed) =>
        breed.temperaments.map((temper) => temper.name).includes(temper)
      );
    }

    if (count !== breeds.length) setCount(breeds.length);
    
    return breeds.slice(init, init + 8).map((breed) => (
      <Link to={"/detail/" + breed.id} key={breed.id}>
        <div className={styles.card}>
          {breed.name}
          <div>
            {breed.temperaments &&
              breed.temperaments.map((temper) => <p>{temper.name}</p>)}
          </div>
        </div>
      </Link>
    ));
  };

  const [, changeLang, lang] = useLang();
  /* useEffect(()=>{
    changeLang('es')
  }) */

  const onChangeLang = (lang) => {
    changeLang(lang);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.panel}>
          <div className={styles.filter_panel}>
            <label htmlFor="">
              Filter by Temper:
              <select name="" id="" onChange={(e) => setTemper(e.target.value)}>
                <option value="all">All temperaments</option>
                {storeTempers &&
                  storeTempers.map((temper) => <option>{temper.name}</option>)}
              </select>
            </label>
            <label htmlFor="">
              Filter by Breed:
              <select name="" id="">
                <option value="1">Breed</option>
              </select>
            </label>
          </div>

          <div></div>

          <div>
            <label htmlFor="">
              Order by Temper:
              <select name="" id="">
                <option value="1">Name</option>
                <option value="1">Weight</option>
              </select>
            </label>
          </div>
        </div>

        <br></br>
        <hr></hr>

        <div className={styles.content}>{storeBreeds && print()}</div>
      </div>

      <Paginator count={count} setPage={setPage} />
    </>
  );
};

export default Main;
