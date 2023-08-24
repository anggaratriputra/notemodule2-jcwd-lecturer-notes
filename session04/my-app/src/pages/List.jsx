import { useRef, useState } from "react";
import Navigation from "../components/Navigation";

function List() {
  const [shopItems, setShopItems] = useState(["sayur", "buah", "telur"]);
  const h1Ref = useRef();

  return (
    <div>
      <h1 ref={h1Ref}>list belanja</h1>
      <button
        onClick={() => {
          setShopItems([...shopItems, "item baru"]);
          console.log(h1Ref.current);
        }}
      >
        add item
      </button>
      {shopItems.map((item, index) => {
        item = "- " + item;
        return <p key={item + index}>{item}</p>;
      })}

      <ul>
        {shopItems.map((item, index) => (
          <li key={item + index}>{item}</li>
        ))}
      </ul>
      <Navigation />
    </div>
  );
}

export default List;
