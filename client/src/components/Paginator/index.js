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
    if (currentPage > max) {
      setPage(max);
    }
    setTotalPage(pages);
  }, [count, currentPage, setPage]);

  const nextPage = () => {
    if (currentPage < totalPage.length) setPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };
  return (
    <div className={styles.container}>
      <span
        className={`${styles.btn_page_num} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        onClick={() => setPage(1)}
      >
        <span>&lt;&lt;</span>
      </span>
      <span
        className={`${styles.btn_page_num} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        onClick={prevPage}
      >
        <span>&lt;</span>
      </span>

      <div className={styles.page_wrapper}>
        {totalPage.map((value) => (
          <span
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
          </span>
        ))}
      </div>

      <span
        className={`${styles.btn_page_num} ${
          currentPage === totalPage.length ? styles.disabled : ""
        }`}
        onClick={nextPage}
      >
        <span>&gt;</span>
      </span>

      <span
        className={`${styles.btn_page_num} ${
          currentPage === totalPage.length ? styles.disabled : ""
        }`}
        onClick={() => setPage(totalPage.length)}
      >
        <span>&gt;&gt;</span>
      </span>
    </div>
  );
};

export default Paginator;
