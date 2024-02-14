import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateToken } from "../middleware/auth.js";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    validateToken().then((isLoged) => {
      isLoged ? navigate("/app") : navigate("/login");
    });
  }, []);
  return <h1>This is the Home page</h1>;
}
