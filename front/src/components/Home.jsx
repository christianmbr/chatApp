import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.localStorage.getItem("access-token")) {
      navigate("/app");
    } else {
      navigate("login");
    }
  }, []);
  return <h1>This is the Home page</h1>;
}
