import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import List from "./pages/List";
import Counter from "./pages/Counter";

function App() {
  const [text, setText] = useState("Halo");

  return (
    <div className="App">
      <button
        onClick={() => {
          setText("updated");
        }}
      >
        update text
      </button>
      <Routes>
        <Route path="/" element={<Home text={text} />} />
        <Route path="about" element={<About text={text} />} />
        <Route path="list" element={<List />} />
        <Route path="counter" element={<Counter />} />
      </Routes>
    </div>
  );
}

export default App;
