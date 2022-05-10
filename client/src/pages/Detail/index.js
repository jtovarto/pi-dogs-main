import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import Navbar from "../../components/Navbar";
import { getBreedById, clearBreedById } from "../../redux/actions";
import useLang from "../../utils/Lang/useLang";

const Detail = () => {
  const breedDefault = {
    id: "",
    name: "",
    height: [],
    weight: [],
    lifespan: [],
    temperaments: [],
    image: "",
  };
  const { id: paramId } = useParams();
  const dispatch = useDispatch();
  const breed = useSelector((state) => state.breed);
  const { name, height, weight, lifespan, temperaments, image } =
    breed ?? breedDefault;

  useEffect(() => {
    dispatch(getBreedById(paramId));
    return () => dispatch(clearBreedById());
  }, [dispatch, paramId]);

  const { translate } = useLang();

  return (
    <>
      <div
        className={styles.bg_mask}
        style={{ backgroundImage: `url('${image}')` }}
      ></div>
      <div className={styles.bg_mask1}></div>

      <Navbar />

      <div className={styles.container}>
        <div
          className={styles.card}
          style={{ backgroundImage: `url('${image}')` }}
        >
          <div className={styles.top}>
            <h1>{name}</h1>
            <div>
              {temperaments?.length > 0 ? (
                temperaments.map((temper) => (
                  <span key={`detail${temper}`}>{temper}</span>
                ))
              ) : (
                <span>{translate("No tempers registered")}</span>
              )}
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.item}>
              <span>{translate("Height")}</span>
              <span>{height}</span>
            </div>
            <div className={styles.item}>
              <span>{translate("Weight")}</span>
              <span>{weight.join(" - ")}</span>
            </div>
            <div className={styles.item}>
              <span>{translate("Life span")}</span>
              <span>{lifespan}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
