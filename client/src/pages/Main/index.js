import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Select from "../../components/Input/Select";
import LoadSpinner from "../../components/LoadSpinner";

import Navbar from "../../components/Navbar";
import Paginator from "../../components/Paginator";

import { getAllBreeds, getAllTemperaments } from "../../redux/actions";
import useLang from "../../utils/Lang/useLang";

import styles from "./Main.module.css";

const Main = () => {
  const dispatch = useDispatch();
  const { translate } = useLang();

  const storeBreeds = useSelector((state) => state.allBreeds);
  const storeTempers = useSelector((state) => state.allTempers);

  useEffect(() => {
    dispatch(getAllBreeds());
    dispatch(getAllTemperaments());
  }, [dispatch]);

  //Filter
  const [breedFilter, setBreed] = useState("");
  const [temperFilter, setTemper] = useState("");
  const [sourceFilter, setSource] = useState("all");

  const filterByBreed = (array, breed) => {};

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
  let filterTimeout;

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

    return <p className={styles.title}>No results</p>;
  };

  const handleFilterByTemper = (e) => {
    e.preventDefault();
    const search = e.target.value;
    if (search.length <= 0) return setTemper("");
    setTemper(e.target.value);
  };

  const handleFilterByBreed = (e) => {
    e.preventDefault();
    let name = e.target.value;
    clearTimeout(filterTimeout);
    if (!name) return dispatch(getAllBreeds());

    filterTimeout = setTimeout(() => {
      dispatch(getAllBreeds(name));
    }, 500);
  };
  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.panel}>
          <div className={styles.filter_panel}>
            <Select
              label={translate("Filter by resource")}
              onChange={(e) => setSource(e.target.value)}
            >
              <option value="db">{translate("Only from database")}</option>
              <option value="api">{translate("Only from API")}</option>
            </Select>

            <Input
              label={translate("Filter by temper")}
              list="tempers"
              onChange={(e) => setTemper(e.target.value)}
            />
            <datalist id="tempers">
              {storeTempers &&
                storeTempers.map((temper) => (
                  <option key={temper.name}>{temper.name}</option>
                ))}
            </datalist>

            <Input
              label={translate("Filter by breed")}              
              onChange={handleFilterByBreed}
            />
          </div>
        </div>

        <div className={styles.result_header}>
          <p>
            Results <span>({count})</span>
          </p>
          <div className={styles.sorter}>
            <Select
              label={translate("Order by")}
              onChange={(e) => setOrderBy(e.target.value)}
            >
              <option value="1_name">{translate('Name')} a-z</option>
              <option value="-1_name">Name z-a</option>
              <option value="1_weight">Weight 0-9</option>
              <option value="-1_weight">Weight 9-0</option>
            </Select>
          </div>
        </div>

        <div className={styles.content}>{print()}</div>
        {/* {<LoadSpinner />} */}

        <Paginator currentPage={page} count={count} setPage={setPage} />
      </div>
    </>
  );
};

export default Main;
