import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function withAuth(Component) {
  return (props) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();
    useEffect(() => {
      if (!isLoggedIn) {
        navigate("/login");
      }
    }, [isLoggedIn, navigate]);

    return <Component {...props} />;
  };
}

export default withAuth;
