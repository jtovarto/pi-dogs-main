import styles from "./index.module.css";
import { useTheme } from "../../hooks/useTheme";
const DarkModeToggle = () => {
  const { toogleTheme } = useTheme();
  return (
    <>
      <input type="checkbox" className={styles.checkbox} id="checkbox" />
      <label for="checkbox" className={styles.label}  onClick={toogleTheme}>
        <i className={`${styles.fas} ${styles.fa_moon}`}></i>
        <i className={`${styles.fas} ${styles.fa_sun}`}></i>
        <div className={styles.ball}></div>
      </label>
    </>
  );
};

export default DarkModeToggle;
