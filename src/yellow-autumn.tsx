import { createRoot } from "react-dom/client";
import { YellowAutumn } from "./pages/YellowAutumn";
import "./index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<YellowAutumn />);
}
