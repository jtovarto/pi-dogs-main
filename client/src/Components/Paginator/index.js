import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useLang from "../../Utils/Lang/useLang";

import styles from "./Paginator.module.css";

const Paginator = ({ storeBreeds, setPage }) => {
  const [, , lang] = useLang();

  const [setPageCount] = useState([1]);

  const pagesCount = () => {
    const max = Math.ceil((storeBreeds.length  ?? 0) / 8);
    const pages = [];
    for (let i = 1; i <= max; i++) {
      pages.push(i);
    }
    return pages.map((value) => (
      <a href="#/" key={value} onClick={() => setPage(value)}>
        {value}
      </a>
    ));
  };

  return (
    <div className={styles.container}>
      {/* <a href="#">{lang("First")}</a>
      <a href="#">{lang("Prev")}</a>
      <span>...</span> */}
      {pagesCount()}
      {/* <span>...</span>
      <a href="#">Next</a>
      <a href="#">Last</a> */}
    </div>
  );
};

export default Paginator;
