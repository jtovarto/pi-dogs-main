import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";

const Detail = () => {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex", gap: ".5rem", padding:'2rem' }}>
        <span>Home</span>
        <span>></span>
        <Link to="/main">Volver</Link>
      </div>
    </>
  );
};

export default Detail;
