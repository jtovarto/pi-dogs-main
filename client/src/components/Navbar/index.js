import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

import useLang from "../../utils/Lang/useLang";

import DarkModeToggle from "../../components/DarkModeToggler";
import LangToggler from "../../components/LangToggler";

const Navbar = () => {
  const { translate } = useLang();

  return (

    <nav className={`${styles.nav} theme-dark`}>

      <div className={styles.nav_link_items}>
        <Link className={styles.nav_link} to="/">
          {translate("Home")}
        </Link>

        <Link className={styles.nav_link} to="/main">
          {translate("Main")}
        </Link>

        <Link className={styles.nav_link} to="/create">
          {translate("Create")}
        </Link>
      </div>
      <div className={styles.container}>
        <DarkModeToggle />
        <LangToggler  />
      </div>
    </nav>
  );
};

export default Navbar;
