import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../logo.svg";
import Navigation from "../components/Navigation";

function Home({ text }) {
  const [counter, setCounter] = useState(0);
  const [dataDiri, setDataDiri] = useState({ nama: "ridho", umur: 20 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((c) => c + 1);
      console.log("test");
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function handleClick() {
    setCounter((c) => c + 1);

    setDataDiri((data) => {
      const copy = { ...data };
      copy.umur = data.umur + 1;
      return copy;
    });
  }

  return (
    <>
      <main>
        <h2>welcome to homepage</h2>
        <p>you can do this, i believe in you</p>
        <p>{counter}</p>
        <p>{text}</p>
        <p>
          nama: {dataDiri.nama}
          <br />
          umur: {dataDiri.umur}
        </p>
        <div>
          <button onClick={handleClick}>increment</button>
        </div>
        <img src="/assets/logo.svg" className="App-logo" alt="logo" />
        <img src={Logo} className="App-logo" alt="logo" />
      </main>
      <Navigation />
    </>
  );
}

export default Home;
