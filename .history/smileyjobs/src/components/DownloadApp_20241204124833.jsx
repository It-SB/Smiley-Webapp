"use client";

import { Button } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Layout423Defaults } from "./Layout"; // Check this import path

const slideVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    height: "auto",
    y: 0,
  },
};

export const Layout423 = (props) => {
  const { tagline, heading, features, description } = Layout423Defaults;

  const [hoveredFeatureIdx, setHoveredFeatureIdx] = useState(null);

  return (
    <section className="bg-gradient-to-b from-blue via-blue to-white px-[5%] md:px-[25%] ld:px-[25%] text-white py-16 md:py-24 lg:py-28 ">
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-4xl lg:text-6xl ">
            {heading}
          </h2>
          <p className="md:text-md">{description}</p>
        </div>
        <div className="flex flex-col items-stretch justify-between gap-6 md:gap-8 lg:flex-row">
          {features.map((feature, index) => (
            <motion.a
              key={index}
              href={feature.url}
              className="relative flex w-full flex-col overflow-hidden lg:h-full lg:w-1/2 lg:transition-all lg:duration-200 lg:hover:w-[70%]"
              onMouseEnter={() => setHoveredFeatureIdx(index)}
              onMouseLeave={() => setHoveredFeatureIdx(null)}
            >
              <div className="absolute inset-0 flex size-full flex-col items-center justify-center self-start">
                <div className="absolute inset-0" />
                <img
                  src={feature.image.src}
                  alt={feature.image.alt}
                  className="size-full object-cover"
                />
              </div>
              <div className="group relative flex h-full min-h-[70vh] flex-col justify-end p-6 md:p-8">
                <div className="lg:absolute lg:inset-0 lg:z-0 lg:transition-all lg:duration-300 lg:group-hover:bg-black/50" />
                <div className="z-10">
                  <p className="mb-2 font-semibold text-text-alternative">
                    {feature.tagline}
                  </p>
                  <h3 className="text-2xl font-bold text-text-alternative md:text-3xl md:leading-[1.3] lg:text-4xl text-white">
                    {feature.heading}
                  </h3>
                </div>
                <AnimatePresence>
                  {hoveredFeatureIdx === index && (
                    <motion.div
                      className="z-10 hidden lg:block lg:w-[340px]"
                      variants={slideVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="mt-5 text-text-alternative md:mt-6 text-white">
                        {feature.description}
                      </p>
                      <div className="mt-6 md:mt-8">
                        <a
                          href="/app-release.apk"
                          download
                        >
                          <Button
                            variant={feature.button.variant}
                            size={feature.button.size}
                            iconRight={feature.button.iconRight}
                            iconLeft={feature.button.iconLeft}
                            className="text-text-alternative text-white"
                          >
                            {feature.button.label || "Download"}{" "}
                            {/* Added a fallback for button text */}
                          </Button>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="lg:hidden">
                  <p className="mt-5 text-text-alternative md:mt-6">
                    {feature.description}
                  </p>
                  <div className="mt-6 md:mt-8">
                        <a
                          href="/app-release.apk"
                          download
                        >
                          <Button
                            variant={feature.button.variant}
                            size={feature.button.size}
                            iconRight={feature.button.iconRight}
                            iconLeft={feature.button.iconLeft}
                            className="text-text-alternative text-white"
                          >
                            {feature.button.label || "Download"}{" "}
                            {/* Added a fallback for button text */}
                          </Button>
                        </a>
                      </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
