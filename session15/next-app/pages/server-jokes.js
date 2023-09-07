import { Heading, ListItem, UnorderedList } from "@chakra-ui/react";

export async function getServerSideProps(context) {
  let jokes = [];
  try {
    const res = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?type=twopart&idRange=0-10&amount=5"
    );
    const response = await res.json();
    jokes = response.jokes;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      data: jokes,
    },
  };
}

export default function ServerJokes({ data }) {
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
