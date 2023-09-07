import { useEffect, useState } from "react";
import { Heading, ListItem, UnorderedList } from "@chakra-ui/react";

export default function ClientJokes() {
  const [data, setData] = useState([]);

  const getJokes = async () => {
    try {
      const res = await fetch(
        "https://v2.jokeapi.dev/joke/Programming?type=twopart&idRange=0-10&amount=5"
      );
      const { jokes } = await res.json();
      setData(jokes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJokes();
  }, []);

  return (
    <>
      <main>
        <Heading>Here are some jokes</Heading>
        <UnorderedList>
          {data.map((joke) => (
            <ListItem key={joke.id}>
              {joke.setup}
              <br />
              {joke.delivery}
            </ListItem>
          ))}
        </UnorderedList>
      </main>
    </>
  );
}
