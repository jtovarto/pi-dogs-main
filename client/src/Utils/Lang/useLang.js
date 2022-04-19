import { useEffect, useState } from "react";
import Langs from "./langs.js";

function useLang() {
  const [lang, setLang] = useState("es");
  const [langFile, setLangFile] = useState({});

  useEffect(() => {
    setLangFile(Langs[lang]);
  }, [lang]);
  return [
    lang,
    setLang,
    function (key) {
      return langFile[key] ?? key;
    },
  ];
}

export default useLang;
