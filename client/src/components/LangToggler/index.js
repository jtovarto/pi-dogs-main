import useLang from "../../utils/Lang/useLang";
import styles from "./index.module.css";

const LangToggler = () => {
  const { lang, toogleLang } = useLang();  

  return (
    <div className={styles.container}>
      <button onClick={toogleLang} className={styles.btn}>
        {lang}
      </button>
    </div>
  );
};

export default LangToggler;
