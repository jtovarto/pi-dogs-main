import styles from "./Card.module.css";

import useLang from "../../utils/Lang/useLang";

const Card = ({ breed }) => {
  const { translate } = useLang();

  return (
    <div
      className={`${styles.card} ${styles.card}`}
      style={{ backgroundImage: `url(${breed.image})` }}
    >
      <div className={styles.border}>
        <h2>{breed.name}</h2>
        <div className={styles.info}>
          {breed.temperaments.map((temper) => (
            <span key={breed.name + temper}>{temper}</span>
          ))}
        </div>
        <div className={styles.info}>
          <span>

            {translate("Weight")}: {breed.weight[0]} - {breed.weight[1]}

          </span>
        </div>
        <div className={styles.icons}>
          <i
            className={`${styles.fa} ${styles.fa_codepen}`}
            aria-hidden="true"
          ></i>
          <i
            className={`${styles.fa} ${styles.fa_instagram}`}
            aria-hidden="true"
          ></i>
          <i
            className={`${styles.fa} ${styles.fa_dribbble}`}
            aria-hidden="true"
          ></i>
          <i
            className={`${styles.fa} ${styles.fa_twitter}`}
            aria-hidden="true"
          ></i>
          <i
            className={`${styles.fa} ${styles.fa_facebook}`}
            aria-hidden="true"
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Card;
