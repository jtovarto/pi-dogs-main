import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import useLang from "../../Utils/Lang/useLang";

import styles from "./Main.module.css";

const Main = () => {
  const [, changeLang, lang] = useLang();
  /* useEffect(()=>{
    changeLang('es')
  }) */

  const onChangeLang = (lang) => {
    console.log("cambio");
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
              <select name="" id="">
                <option value="1">Temper</option>
              </select>
            </label>
            <label htmlFor="">
              Filter by Breed:
              <select name="" id="">
                <option value="1">Breed</option>
              </select>
            </label>
          </div>
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
        
        <div className={styles.content}>
          <Link to="/detail/1">
            <div className={styles.card}></div>
          </Link>
          <Link to="/detail/2">
            <div className={styles.card}></div>
          </Link>
          <Link to="/detail/3">
            <div className={styles.card}></div>
          </Link>
          <Link to="/detail/4">
            <div className={styles.card}></div>
          </Link>
          <Link to="/detail/5">
            <div className={styles.card}></div>
          </Link>
          <Link to="/detail/6">
            <div className={styles.card}></div>
          </Link>
          <Link to="/detail/7">
            <div className={styles.card}></div>
          </Link>
          <Link to="/detail/8">
            <div className={styles.card}></div>
          </Link>
        </div>

        <div className={styles.pagintion_panel}>
          <a href="#">{lang("First")}</a>
          <a href="#">{lang("Prev")}</a>
          <span>...</span>
          <a href="#">20</a>
          <a href="#">21</a>
          <a href="#">22</a>
          <span>...</span>
          <a href="#">Next</a>
          <a href="#">Last</a>
        </div>
      </div>
    </>
  );
};

export default Main;
