import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import FormCreate from "./pages/FormCreate";
import Notification from "./components/Notifications";

function App() {
  return (
    <div className="App">
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
