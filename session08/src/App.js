import { useState, createContext, useContext } from "react";
import "./App.css";
import Counter from "./features/counter/Counter";

const GlobalData = createContext("data");

function A() {
  const { data } = useContext(GlobalData);
  return (
    <div
      onClick={() => {
        localStorage.setItem("varku", "world hello");
      }}
    >
      component A {data}
    </div>
  );
}

function B() {
  const { data, setData } = useContext(GlobalData);
  return (
    <>
      <div
        onClick={() => {
          setData("data changed");
          localStorage.setItem("varku", "hello world");
        }}
      >
        component B {data}
      </div>
      <button
        onClick={() => {
          localStorage.removeItem("varku");
        }}
      >
        hapus varku
      </button>
    </>
  );
}

function App() {
  const [data, setData] = useState(localStorage.getItem("varku"));
  return (
    <GlobalData.Provider value={{ data, setData }}>
      <Counter />
    </GlobalData.Provider>
  );
}

export default App;
