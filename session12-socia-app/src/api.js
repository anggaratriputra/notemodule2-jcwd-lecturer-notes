import axios from "axios";

let baseURL = "http://localhost:3001";
if (process.env.NODE_ENV === "production") {
  baseURL = "https://my-json-server.typicode.com/ridhozhr10/notemodule2-jcwd";
}

const api = axios.create({
  baseURL,
});

export default api;
