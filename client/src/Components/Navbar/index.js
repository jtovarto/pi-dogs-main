import { Link } from "react-router-dom";
import useLang from "../../Utils/Lang/useLang";
import styles from "./Navbar.module.css";
const Navbar = () => {
  const [locale, changeLocale, lang] = useLang();

  const changeLang = () => {
    if (locale === "es") changeLocale("en");
    if (locale === "en") changeLocale("es");
  };
  return (
    <nav className={styles.nav}>
      <Link to="/">{lang("Home")}</Link>
      <div>
        <span onClick={changeLang}>{locale}</span>
      </div>
    </nav>
  );
};

export default Navbar;
