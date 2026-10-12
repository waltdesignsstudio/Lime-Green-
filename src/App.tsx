import React, { useState, useEffect } from "react";
import { RedHome } from "./pages/RedHome";
import { DenimBlue } from "./pages/DenimBlue";
import { MagentaTBC } from "./pages/MagentaTBC";
import { YellowAutumn } from "./pages/YellowAutumn";
import { PageTransitionLoader } from "./components/PageTransitionLoader";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"red" | "denim" | "magenta" | "yellow">(() => {
    if (typeof window === "undefined") return "red";
    const path = window.location.pathname.toLowerCase();
    const search = new URLSearchParams(window.location.search);
    const p = search.get("page");

    if (p === "denim" || path.includes("denim-blue")) return "denim";
    if (p === "magenta" || path.includes("magenta")) return "magenta";
    if (p === "yellow" || path.includes("yellow-autumn")) return "yellow";
    return "red";
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const search = new URLSearchParams(window.location.search);
      const p = search.get("page");
      if (p === "denim" || path.includes("denim-blue")) setCurrentPage("denim");
      else if (p === "magenta" || path.includes("magenta")) setCurrentPage("magenta");
      else if (p === "yellow" || path.includes("yellow-autumn")) setCurrentPage("yellow");
      else setCurrentPage("red");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleNavigate = (pageId: string, href: string) => {
    setIsTransitioning(true);

    setTimeout(() => {
      // In SPA environment or dev server, push state and switch page component
      let targetPage: "red" | "denim" | "magenta" | "yellow" = "red";
      if (pageId === "denim") targetPage = "denim";
      else if (pageId === "magenta") targetPage = "magenta";
      else if (pageId === "yellow") targetPage = "yellow";

      setCurrentPage(targetPage);
      try {
        window.history.pushState({}, "", href);
      } catch {
        // Fallback
      }
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 700);
  };

  return (
    <>
      <PageTransitionLoader isLoading={isTransitioning} />
      {currentPage === "red" && <RedHome onNavigatePage={handleNavigate} />}
      {currentPage === "denim" && <DenimBlue onNavigatePage={handleNavigate} />}
      {currentPage === "magenta" && <MagentaTBC onNavigatePage={handleNavigate} />}
      {currentPage === "yellow" && <YellowAutumn onNavigatePage={handleNavigate} />}
    </>
  );
}
