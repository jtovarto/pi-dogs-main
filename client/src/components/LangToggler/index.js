import useLang from "../../utils/Lang/useLang";
import styles from "./index.module.css";

const LangToggler = () => {
  const { lang, toogleLang } = useLang();  

  return (
    <div className={styles.container}>
      <buttom onClick={toogleLang} className={styles.btn}>
        {lang}
      </buttom>
    </div>
  );
};

export default LangToggler;
