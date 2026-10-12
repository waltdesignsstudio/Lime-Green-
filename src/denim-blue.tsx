import { createRoot } from "react-dom/client";
import { DenimBlue } from "./pages/DenimBlue";
import "./index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<DenimBlue />);
}
