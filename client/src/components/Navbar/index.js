import { Link } from "react-router-dom";
import useLang from "../../utils/Lang/useLang";
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
      <div style={{ display:'flex', aligItems:'center', gap:'1rem' }}>
        <Link to="/create">Create</Link>
        <a onClick={changeLang}>{locale}</a>
      </div>
    </nav>
  );
};

export default Navbar;
