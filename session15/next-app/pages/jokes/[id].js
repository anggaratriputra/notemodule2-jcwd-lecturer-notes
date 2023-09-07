import { Heading, ListItem, UnorderedList } from "@chakra-ui/react";

export async function getStaticPaths() {
  const res = await fetch(
    "https://v2.jokeapi.dev/joke/Programming?type=twopart&idRange=0-10&amount=5"
  );
  const { jokes } = await res.json();

  return {
    paths: jokes.map((joke) => {
      return {
        params: {
          id: joke.id.toString(),
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://v2.jokeapi.dev/joke/Any?idRange=${params.id}`
  );
  const data = await res.json();
  return {
    props: {
      data,
    },
    revalidate: 10,
  };
}

export default function StaticJokes({ data }) {
  return (
    <>
      <main>
        <Heading>Here are some jokes</Heading>
        <UnorderedList>
          <ListItem key={data.id}>
            {data.setup}
            <br />
            {data.delivery}
          </ListItem>
        </UnorderedList>
      </main>
    </>
  );
}
