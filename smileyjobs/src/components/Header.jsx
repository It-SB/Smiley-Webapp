"use client"

import React, { useEffect, useRef } from "react"
import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import { Button } from "@relume_io/relume-ui"
import logo from "../assets/Blue.png"

const Header1Defaults = {
  heading: "Welcome to SmileyJobs",
  tagline: "Belong & Smile",
  paragraphs: [
    "At SmileyJobs, we believe in the power of belonging and a perfect fit.",
    "Our dedication goes beyond the resume; we value our candidates as much as our clients.",
    "We are committed to putting a smile on faces — not just for the roles we fill but for the relationships we build.",
  ],
  buttons: [],
  image: {
    src: logo,
    alt: "SmileyJobs logo",
  },
}

const Header1 = (props) => {
  const { heading, tagline, paragraphs, buttons, image } = {
    ...Header1Defaults,
    ...props,
  }

  const headingRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const node = headingRef.current
    if (!node || hasAnimated.current) return

    // Guard: StrictMode runs effects twice in dev, which would split the text twice.
    hasAnimated.current = true

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    const reveal = () => {
      node.style.visibility = "visible"
    }

    if (prefersReducedMotion) {
      reveal()
      return
    }

    // Safety net: if fonts never resolve or the split fails, still show the heading.
    const fallback = window.setTimeout(reveal, 1500)

    document.fonts.ready
      .then(() => {
        if (!headingRef.current) return
        reveal()

        const { words } = splitText(headingRef.current)

        animate(
          words,
          { opacity: [0, 1], y: [10, 0] },
          {
            type: "spring",
            duration: 2,
            bounce: 0,
            delay: stagger(0.05),
          }
        )
      })
      .catch(reveal)
      .finally(() => window.clearTimeout(fallback))

    return () => window.clearTimeout(fallback)
  }, [])

  return (
    <section className="bg-gradient-to-b from-yellow-200 via-white to-white text-blue">
      <div className="container mx-auto px-[5%] py-16 md:py-20 lg:py-24 xl:px-24">
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-12 md:gap-y-16 lg:grid-cols-2">
          <div>
            <h1
              ref={headingRef}
              className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:mb-8 md:text-6xl lg:text-7xl"
              style={{ visibility: "hidden" }}
            >
              {heading}
            </h1>

            {tagline && (
              <p className="mb-6 text-xl font-semibold md:text-2xl">
                &ldquo;{tagline}&rdquo;
              </p>
            )}

            <div className="max-w-[60ch] space-y-4 text-base leading-relaxed md:text-lg">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {buttons.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-4 md:mt-10">
                {buttons.map((button, index) => (
                  <Button key={index} {...button}>
                    {button.title}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              src={image.src}
              alt={image.alt}
              width={450}
              height={450}
              className="h-auto w-full max-w-[280px] object-contain sm:max-w-[360px] lg:max-w-[450px]"
            />
          </div>
        </div>
      </div>

      <style>{`
        .split-word {
          display: inline-block;
          will-change: transform, opacity;
        }
      `}</style>
    </section>
  )
}

export { Header1 }