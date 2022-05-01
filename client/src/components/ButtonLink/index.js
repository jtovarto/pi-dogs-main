import styles from "./index.module.css";
const ButtonLink = ({ label }) => {
  return (
    <div className={styles.btn_cont}>
      <span className={styles.btn}>
        {label}
        <span className={styles.line_1}></span>
        <span className={styles.line_2}></span>
        <span className={styles.line_3}></span>
        <span className={styles.line_4}></span>
      </span>
    </div>
  );
};

export default ButtonLink;
