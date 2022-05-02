import { useEffect, useState } from "react";
import styles from "./index.module.css";

const Error = ({ errors }) => {
  const [error, setError] = useState("");
  useEffect(() => {
    if (errors.length > 0) {
      setError(errors[0]);
      console.log(error);
    }
  }, [error, errors]);
  return error.length > 0 ? (
    <span className={styles.error}>{error}</span>
  ) : null;
};

export default Error;
