import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useLang from "../../utils/Lang/useLang";

import styles from "./Paginator.module.css";

const Paginator = ({ count, setPage }) => {
  const [, , lang] = useLang();

  const pagesCount = () => {
    const max = Math.ceil(count / 8);
    const pages = [1];
    for (let i = 2; i <= max; i++) {
      pages.push(i);
    }
    return pages.map((value) => (
      <a href="#/" key={"pag" + value} onClick={() => setPage(value)}>
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
