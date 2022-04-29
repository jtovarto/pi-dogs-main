import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import FormCreate from "./pages/FormCreate";
import Notification from "./components/Notifications";
import { useSelector } from "react-redux";

function App() {

  const theme = useSelector((state) => state.theme);

  return (
    <div className={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<FormCreate />} />
      </Routes>

      <Notification />
    </div>
  );
}

export default App;
