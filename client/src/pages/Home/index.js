import { Link } from "react-router-dom";
import styles from "./Home.module.css";

import DarkModeToggle from "../../components/DarkModeToggler";
import GithubLink from "../../components/GithubLink";

import useLang from "../../utils/Lang/useLang";
import LangToggler from "../../components/LangToggler";

const Home = () => {
  const { translate } = useLang();

  return (
    <div>
      <div className={styles.config_options}>
        <DarkModeToggle />
        <LangToggler />
      </div>

      <GithubLink />

      <div className={styles.container}>
        <h1 className={styles.title}>{translate("Welcome")}</h1>

        <div className={styles.btn_cont}>
          <Link className={styles.btn} to="/main">
            {translate("Enter")}
            <span className={styles.line_1}></span>
            <span className={styles.line_2}></span>
            <span className={styles.line_3}></span>
            <span className={styles.line_4}></span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
