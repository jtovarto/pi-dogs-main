import { useEffect, useState } from "react";
import styles from "./Paginator.module.css";
import icon from "../../assets/images/huella.png";

const Paginator = ({ currentPage, count, setPage }) => {
  const [totalPage, setTotalPage] = useState([1]);

  useEffect(() => {
    const max = Math.ceil(count / 8);
    const pages = [1];
    for (let i = 2; i <= max; i++) {
      pages.push(i);
    }
    setTotalPage(pages);
  }, [count]);

  const nextPage = () => {
    if (currentPage < totalPage.length) setPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };
  return (
    <div className={styles.container}>
      <a
        className={`${styles.btn_page_num} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        href="#/"
        onClick={() => setPage(1)}
      >
        <span>&lt;&lt;</span>
      </a>
      <a
        className={`${styles.btn_page_num} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        href="#/"
        onClick={prevPage}
      >
        <span>&lt;</span>
      </a>

      <div className={styles.page_wrapper}>
        {totalPage.map((value) => (
          <a
            href="#/"
            key={"paginator" + value}
            onClick={() => setPage(value)}
            className={`${styles.btn_page_num} ${
              value === currentPage ? styles.active : null
            }`}
          >
            {value === currentPage ? (
              <img src={icon} className={styles.icon} alt="Footprints png" />
            ) : (
              value
            )}
          </a>
        ))}
      </div>

      <a
        className={`${styles.btn_page_num} ${
          currentPage === totalPage.length ? styles.disabled : ""
        }`}
        href="#/"
        onClick={nextPage}
      >
        <span>&gt;</span>
      </a>
      <a
        className={`${styles.btn_page_num} ${
          currentPage === totalPage.length ? styles.disabled : ""
        }`}
        href="#/"
        onClick={() => setPage(totalPage.length)}
      >
        <span>&gt;&gt;</span>
      </a>
    </div>
  );
};

export default Paginator;
