import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getBreedById, clearBreedById } from "../../redux/actions";

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
  const { id, name, height, weight, lifespan, temperaments, image } = breed ?? breedDefault;
  useEffect(() => {
    dispatch(getBreedById(paramId));

    return () => dispatch(clearBreedById());
  }, []);

  return (
    <>
      <Navbar />

      <div style={{ display: "flex", gap: ".5rem", padding: "2rem" }}>
        <span>Home</span>
        <span> > </span>
        <Link to="/main">Volver</Link>
      </div>

      <div style={{ margin: "0 auto", width: "300px" }}>
        <img src={image} />
        <br></br>
        <br></br>
        <p>ID: {id ?? ""}</p>
        <p>Name: {name ?? ""}</p>
        <p>Height: {height ?? ""}</p>
        <p>Weight:{weight?.length > 0 ? `${weight[0]} - ${weight[1]}` : null}</p>
        <p>Lifespan: {lifespan ?? ""}</p>
        <ul>
          {temperaments?.length > 0
            ? temperaments.map((temper) => <li key={temper}>{temper}</li>)
            : "No tempers registered"}
        </ul>
      </div>
    </>
  );
};

export default Detail;
