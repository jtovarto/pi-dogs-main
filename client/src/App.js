import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Main from "./Pages/Main";
import Detail from "./Pages/Detail";
import FormCreate from "./Pages/FormCreate";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<FormCreate/>} />
      </Routes>
    </div>
  );
}

export default App;
