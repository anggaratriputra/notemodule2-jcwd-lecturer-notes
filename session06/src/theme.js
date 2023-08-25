import { extendTheme } from "@chakra-ui/react";

const colors = {
  merah: {
    900: "#ff0000",
    800: "#ff6666",
    700: "#ffcccc",
  },
};

const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  colors,
});

export default theme;
