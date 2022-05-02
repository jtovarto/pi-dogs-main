import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import FormCreate from "./pages/FormCreate";
import Notification from "./components/Notifications";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import NotFound from "./pages/NotFound";


function App() {
  const theme = useSelector((state) => state.theme);
  const lang = useSelector((state) => state.language);
  const [stateLang, setlang] = useState(lang);

  useEffect(() => {
    if (lang !== stateLang) {
      setlang(lang);
    }
  }, [lang, stateLang]);

  return (
    <div className={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<FormCreate />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>

      <Notification />
    </div>
  );
}

export default App;
