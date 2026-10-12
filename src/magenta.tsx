import { createRoot } from "react-dom/client";
import { MagentaTBC } from "./pages/MagentaTBC";
import "./index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<MagentaTBC />);
}
