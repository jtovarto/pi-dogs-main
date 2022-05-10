import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeLang } from "../../redux/actions/index.js";
import Langs from "./langs.js";

export const ES = "es";
export const EN = "en";

function useLang() {
  const dispatch = useDispatch();
  const [lang, setLang] = useState(null);

  useEffect(() => {
    let storedLang = localStorage.getItem("lang");
    let currentLang;
    if (storedLang === "") {
      localStorage.setItem("lang", "es");
      currentLang = "es";
    } else if (!lang) {
      currentLang = storedLang;
    } else {
      localStorage.setItem("lang", lang);
      currentLang = lang;
    }
    dispatch(changeLang(currentLang));
    setLang(currentLang);
  }, [lang, dispatch]);

  const toogleLang = function () {
    if (localStorage.getItem("lang") === "es") {
      setLang("en");
    } else {
      setLang("es");
    }
  };

  const translate = function (key) {
    let lang = localStorage.getItem("lang");

    if (!lang) {
      lang = "es";
      localStorage.setItem("lang", lang);
    }
    const langFile = Langs[lang];
    return langFile[key] ?? key;
  };

  return {
    lang,
    toogleLang,
    translate,
  };
}

export default useLang;
