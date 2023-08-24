import Navigation from "../components/Navigation";
import useCounter from "../counter-hook";

function Counter() {
  const [count1, increment1, decrement1] = useCounter(0, 1);
  const [count2, increment2, decrement2] = useCounter(0, 5);

  return (
    <>
      <div>
        <p>you clicked {count1} times</p>

        <button onClick={increment1}>Increment</button>
        <button onClick={decrement1}>Decrement</button>
      </div>
      <div>
        <p>you clicked {count2} times</p>

        <button onClick={increment2}>Increment</button>
        <button onClick={decrement2}>Decrement</button>
      </div>
      <Navigation />
    </>
  );
}

export default Counter;
