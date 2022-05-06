import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Card from "../../components/Card";
import Input from "../../components/Input";
import Select from "../../components/Input/Select";
import LoadSpinner from "../../components/LoadSpinner";

import Navbar from "../../components/Navbar";
import Paginator from "../../components/Paginator";

import {
  getAllBreeds,
  getAllTemperaments,
  getBreedsByName,
} from "../../redux/actions";
import useLang from "../../utils/Lang/useLang";

import styles from "./Main.module.css";

const Main = () => {
  const dispatch = useDispatch();
  const { translate } = useLang();

  const storeBreeds = useSelector((state) => state.allBreeds);
  const storeTempers = useSelector((state) => state.allTempers);
  const isLoading = useSelector((state) => state.isLoading);

  useEffect(() => {
    dispatch(getAllBreeds());
    dispatch(getAllTemperaments());
  }, [dispatch]);

  //Filter
  const [breedFilter, setBreed] = useState("");
  const [temperFilter, setTemper] = useState("");
  const [sourceFilter, setSource] = useState("");

  let filterTimeout = useRef();
  const filterByBreed = useCallback(
    (e) => {
      e.preventDefault();
      clearTimeout(filterTimeout.current);
      let name = e.target.value;
      setBreed(name);
      if (!name) {
        return dispatch(getAllBreeds());
      }

      filterTimeout.current = setTimeout(() => {
        console.log(name);
        dispatch(getBreedsByName(name));
      }, 1000);
    },
    [dispatch]
  );

  const filterByTemper = (array, temper) => {
    if (temper.length > 3) {
      return array.filter((item) => item.temperaments.includes(temper));
    }
    return array;
  };

  const filterBySource = (array, source) => {
    if (source === "db") return array.filter((item) => isNaN(item.id));
    if (source === "api") return array.filter((item) => !isNaN(item.id));
    return array;
  };

  //Sort
  const [orderBy, setOrderBy] = useState("");
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

  //Pagination
  const [count, setCount] = useState([1]);
  const [page, setPage] = useState(1);

  //clear filter and sorter
  const clearFilters = (e) => {
    e.preventDefault();
    setBreed("");
    setTemper("");
    setSource("");
    setOrderBy("");
    if (storeBreeds.length < 172) {
      dispatch(getAllBreeds());
    }
  };

  const print = () => {
    const init = (page - 1) * 8;
    let breeds = [...storeBreeds];

    breeds = filterByTemper(breeds, temperFilter);
    breeds = filterBySource(breeds, sourceFilter);

    let [, property] = orderBy.split("_");
    if (property?.length > 0) {
      breeds = breeds.sort(orderByCallbacks[property]);
    }

    if (count !== breeds.length) setCount(breeds.length);

    if (breeds.length > 0) {
      return breeds.slice(init, init + 8).map((breed) => (
        <Link to={"/detail/" + breed.id} key={`link${breed.id}`}>
          <Card breed={breed} key={`card${breed.id}`} />
        </Link>
      ));
    }

    return <p className={styles.title}>{translate("No results")}</p>;
  };

  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.panel}>
          <div className={styles.filter_panel}>
            <Select
              label={translate("Filter by source")}
              onChange={(e) => setSource(e.target.value)}
              value={sourceFilter}
            >
              <option value="db">{translate("Only from database")}</option>
              <option value="api">{translate("Only from API")}</option>
            </Select>

            <Input
              label={translate("Filter by temper")}
              list="tempers"
              onChange={(e) => setTemper(e.target.value)}
              value={temperFilter}
            />
            <datalist id="tempers">
              {storeTempers &&
                storeTempers.map((temper) => (
                  <option key={temper.name}>{temper.name}</option>
                ))}
            </datalist>

            <Input
              label={translate("Filter by name")}
              onChange={filterByBreed}
              value={breedFilter}
            />
          </div>
        </div>

        <div className={styles.result_header}>
          <p>
            {translate("Results")} <span>({count})</span>
          </p>
          <div>
            <button className={styles.btn} type="button" onClick={clearFilters}>
              {translate("Clear all")}
            </button>
          </div>
          <div className={styles.sorter}>
            <Select
              label={translate("Order by")}
              onChange={(e) => setOrderBy(e.target.value)}
              value={orderBy}
            >
              <option value="1_name">{translate("Name")} a-z</option>
              <option value="-1_name">Name z-a</option>
              <option value="1_weight">Weight 0-9</option>
              <option value="-1_weight">Weight 9-0</option>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <LoadSpinner />
        ) : (
          <>
            <div className={styles.content}>{print()}</div>
            <Paginator currentPage={page} count={count} setPage={setPage} />
          </>
        )}
      </div>
    </>
  );
};

export default Main;
