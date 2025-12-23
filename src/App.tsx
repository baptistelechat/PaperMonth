import { Generator } from "@/pages/Generator";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    // Intégration de Umami Analytics uniquement en production (BUILD)
    if (import.meta.env.PROD) {
      const scriptId = "umami-script";
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.defer = true;
        script.src = "https://cloud.umami.is/script.js";
        script.setAttribute(
          "data-website-id",
          "221a0cc9-934f-4b41-807b-886273162aca"
        );
        document.head.appendChild(script);
      }
    }
  }, []);

  return <Generator />;
}
