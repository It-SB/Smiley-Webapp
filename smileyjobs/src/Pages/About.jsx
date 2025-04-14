import React, { useEffect, useRef } from "react";

const WebView = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const loadContent = async () => {
        try {
          const response = await fetch("/h_page/about.html");
          const html = await response.text();

          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");

          // Add styles with marker
          const styles = doc.querySelectorAll("head link[rel='stylesheet']");
          styles.forEach(style => {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = style.getAttribute("href");
            link.setAttribute("data-added-by-webview", "true");
            document.head.appendChild(link);
          });

          // Inject body content
          containerRef.current.innerHTML = doc.body.innerHTML;

          // Add scripts with marker
          const scripts = doc.querySelectorAll("script");
          scripts.forEach(script => {
            const newScript = document.createElement("script");
            newScript.setAttribute("data-added-by-webview", "true");

            if (script.src) {
              newScript.src = script.src;
            } else {
              newScript.textContent = script.textContent;
            }

            // Important: re-append inside container (for local scripts)
            containerRef.current.appendChild(newScript);
          });
        } catch (error) {
          console.error("Error loading HTML content:", error);
          containerRef.current.innerHTML = "<p>Error loading content. Please try again.</p>";
        }
      };

      loadContent();
    }

    return () => {
      // Cleanup added links
      const addedLinks = document.querySelectorAll("link[data-added-by-webview]");
      addedLinks.forEach(link => link.remove());

      // Cleanup added scripts
      const addedScripts = document.querySelectorAll("script[data-added-by-webview]");
      addedScripts.forEach(script => script.remove());
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-screen overflow-auto">
      <p>Loading content...</p>
    </div>
  );
};

export default WebView;
