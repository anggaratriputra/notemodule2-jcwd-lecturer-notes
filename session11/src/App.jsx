import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setInitialData } from "./slices/users";
import { useToast } from "@chakra-ui/react";
import api from "./api";
import Edit from "./pages/Edit";

function App() {
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    api
      .get("/users")
      .then((res) => {
        dispatch(setInitialData(res.data));
      })
      .catch((error) => {
        dispatch(setInitialData([]));
        toast({
          title: "Something wrong is happening",
          description: error.message,
          status: "error",
        });
      });
  }, [dispatch, toast]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/edit/:userID" element={<Edit />} />
    </Routes>
  );
}

export default App;
