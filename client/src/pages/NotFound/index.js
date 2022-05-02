import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";
import useLang from "../../utils/Lang/useLang";
import ButtonLink from "../../components/ButtonLink";

const NotFound = () => {
  const { translate } = useLang();
  return (
    <div className={styles.container}>
        <p className={styles.message}>Page not found</p>
      <h1 className={styles.m404}>404</h1>
            
      <div className={styles.btn}>
        <Link to="/">
          <ButtonLink label={translate("Back to home")} />
        </Link>
      </div>

      <div className={styles.d_container}>
        <div className={styles.corgi}>
          <div className={styles.head}>
            <div className={`${styles.ear} ${styles.ear_r}`}></div>
            <div className={`${styles.ear} ${styles.ear_l}`}></div>

            <div className={`${styles.eye} ${styles.eye_left}`}></div>
            <div className={`${styles.eye} ${styles.eye_right}`}></div>

            <div className={styles.face}>
              <div className={styles.face_white}>
                <div
                  className={`${styles.face_orange} ${styles.face_orange_l}`}
                ></div>
                <div
                  className={`${styles.face_orange} ${styles.face_orange_r}`}
                ></div>
              </div>
            </div>

            <div className={styles.face_curve}></div>

            <div className={styles.mouth}>
              <div className={styles.nose}></div>
              <div className={styles.mouth_left}>
                <div className={styles.mouth_left_round}></div>
                <div className={styles.mouth_left_sharp}></div>
              </div>

              <div className={styles.lowerjaw}>
                <div className={styles.lips}></div>
                <div className={`${styles.tongue} ${styles.test}`}></div>
              </div>

              <div className={styles.snout}></div>
            </div>
          </div>

          <div className={styles.neck_back}></div>
          <div className={styles.neck_front}></div>

          <div className={styles.body}>
            <div className={styles.body_chest}></div>
          </div>

          <div
            className={`${styles.foot} ${styles.foot_left} ${styles.foot_front} ${styles.foot_1}`}
          ></div>
          <div
            className={`${styles.foot} ${styles.foot_right} ${styles.foot_front} ${styles.foot_2}`}
          ></div>
          <div
            className={`${styles.foot} ${styles.foot_left} ${styles.foot_back} ${styles.foot_3}`}
          ></div>
          <div
            className={`${styles.foot} ${styles.foot_right} ${styles.foot_back} ${styles.foot_4}`}
          ></div>

          <div className={`${styles.tail} ${styles.test}`}></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
