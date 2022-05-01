import { Link } from "react-router-dom";
import styles from "./Home.module.css";

import DarkModeToggle from "../../components/DarkModeToggler";
import GithubLink from "../../components/GithubLink";
import ButtonLink from "../../components/ButtonLink";

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

        <Link to="/main">
          <ButtonLink label={translate("Enter")} />
        </Link>
      </div>
    </div>
  );
};

export default Home;
