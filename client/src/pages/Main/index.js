import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Select from "../../components/Input/Select";

import Navbar from "../../components/Navbar";
import Paginator from "../../components/Paginator";

/* import useLang from "../../utils/Lang/useLang"; */

import { getAllBreeds, getAllTemperaments } from "../../redux/actions";
import useLang from "../../utils/Lang/useLang";

import styles from "./Main.module.css";

const Main = () => {
  const storeBreeds = useSelector((state) => state.allBreeds);
  const storeTempers = useSelector((state) => state.allTempers);
  const [temper, setTemper] = useState("");
  const [count, setCount] = useState([1]);
  const [page, setPage] = useState(1);

  const { translate } = useLang();

  let filterTimeout;

  const [orderBy, setOrderBy] = useState("1_name");
  const [filterSource, setFilterSource] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (storeBreeds.length <= 0) {
      dispatch(getAllBreeds());
    }
    if (storeTempers.length <= 0) {
      dispatch(getAllTemperaments());
    }
  }, [storeBreeds, storeTempers, dispatch]);

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

    if (temper.length > 2) {
      breeds = breeds.filter((breed) => breed.temperaments.includes(temper));
    }

    if (count !== breeds.length) setCount(breeds.length);

    if (count > 0) {
      return breeds.slice(init, init + 8).map((breed) => (
        <Link to={"/detail/" + breed.id} key={`link${breed.id}`}>
          <Card breed={breed} key={`card${breed.id}`} />
        </Link>
      ));
    }

    return <p>No results</p>;
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
              label={translate("Filter by resource  ")}
              onChange={(e) => setFilterSource(e.target.value)}
            >
              <option value="">{translate("All results")}</option>
              <option value="db">{translate("Only database")}</option>
              <option value="api">{translate("Only Api")}</option>
            </Select>
            
            <Input
              label={translate("Filter by temper")}
              list="tempers"
              onChange={handleFilterByTemper}
            />
            <datalist id="tempers">
              {storeTempers &&
                storeTempers.map((temper) => (
                  <option key={temper.name}>{temper.name}</option>
                ))}
            </datalist>

            <Input
              label={translate("Filter by breed")}
              list="tempers"
              onChange={handleFilterByBreed}
            />

            <Select
              label={translate("Order by")}
              onChange={(e) => setOrderBy(e.target.value)}
            >
              <option value="1_name">Name ASC</option>
              <option value="-1_name">Name DESC</option>
              <option value="1_weight">Weight ASC</option>
              <option value="-1_weight">Weight DESC</option>
            </Select>
          </div>
        </div>

        <br></br>
        <p>Results ({count})</p>
        <br></br>

        <div className={styles.content}>{storeBreeds && print()}</div>
      </div>

      <Paginator currentPage={page} count={count} setPage={setPage} />
    </>
  );
};

export default Main;
