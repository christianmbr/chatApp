import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (isAuth) {
        navigate("/app");
      }
    },
    [isAuth]
  );
  return <h1>This is the Home page</h1>;
}
