import styles from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1>Home</h1>
        <Link to="main">Entrar</Link>
      </div>
    </div>
  );
};

export default Home;
