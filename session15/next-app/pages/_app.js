import "@/styles/globals.css";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Box>
        <Link href={"/client-jokes"}>client site jokes</Link>
        <Link href={"/server-jokes"}>server site jokes</Link>
        <Link href="/jokes/1">SSG Jokes</Link>
      </Box>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
