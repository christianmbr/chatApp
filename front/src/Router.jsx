import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/app/App";
import Login from "./components/Login";
import SigUp from "./components/SigUp";
import Home from "./components/Home";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/sigup" element={<SigUp />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}
