import { lazy, Suspense } from "react";

const AboutIframe = () => (
  <iframe
    src="/h_page/about.html"
    title="About Page"
    loading="lazy"
    width="100%"
    height="100%"
    className="border-none"
  />
);

const About = () => {
  return (
    <div className="w-full h-screen">
      <Suspense fallback={<div>Loading About Page...</div>}>
        <AboutIframe />
      </Suspense>
    </div>
  );
};

export default About;
// This code defines a React component that renders an iframe for the About page.