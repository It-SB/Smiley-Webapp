import React from "react";

const WebView = () => {
  const handleNavigation = (url) => {
    document.querySelector('iframe').src = url;
  };
  
  return (
    <div style={{ height: '100vh', width: '100%', overflow: 'hidden', margin: 0 }}>
      <iframe
        src="https://it-sb.github.io/SJ_interface/about.html"
        style={{
          border: 'none',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          display: 'block'
        }}
        title="About Page"
        onLoad={() => {
          const iframe = document.querySelector('iframe');
          iframe.contentWindow.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
              e.preventDefault();
              handleNavigation(e.target.href);
            }
          });
        }}
      />
    </div>
  );
  
};

export default WebView;
