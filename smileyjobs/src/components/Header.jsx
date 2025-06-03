"use client"

import React, { useEffect, useRef } from "react"
import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import { Button } from "@relume_io/relume-ui"
import logo from "../assets/Blue.png"

const Header1Defaults = {
  heading: "Welcome to SmileyJobs",
  description: (
    <>
      <p className="pt-10">“Belong & Smile”</p>
      <p className="invisible"> jhk</p>
      <p>At SmileyJobs, we believe in the power of belonging and a perfect fit.</p>
      <p className="invisible"> jhk</p>
      <p>Our dedication goes beyond the resume; we value our candidates as much as our clients.</p>
      <p className="invisible"> jhk</p>
      <p>We are committed to putting a smile on faces — not just for the roles we fill but for the relationships we build.</p>
    </>
  ),
  buttons: [
    { title: "Button" },
    { title: "Button", variant: "secondary" },
  ],
  image: {
    src: logo,
    alt: "SmileyJobs logo",
  },
}

const Header1 = (props) => {
  const { heading, description, buttons, image } = {
    ...Header1Defaults,
    ...props,
  }

  const headingRef = useRef(null)

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!headingRef.current) return

      headingRef.current.style.visibility = "visible"

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
  }, [])

  return (
    <section className="px-[5%] py-16 md:py-20 lg:py-24 bg-gradient-to-b from-yellow-200 via-white to-white text-blue border-t-white">
      <div className="max-w-screen-2xl container mx-auto xl:px-24">
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h1
              ref={headingRef}
              className="mb-5 text-3xl font-bold md:mb-6 md:text-8xl lg:text-7xl"
              style={{ visibility: "hidden" }}
            >
              {heading}
            </h1>
            <p className="md:text-md">{description}</p>
            <div className="mt-6 flex gap-x-4 md:mt-8">
              {/* Uncomment to show buttons */}
              {/* {buttons.map((button, index) => (
                <Button key={index} {...button}>
                  {button.title}
                </Button>
              ))} */}
            </div>
          </div>
          <div className="hidden md:block">
            <img src={image.src} className="w-[450px] object-cover" alt={image.alt} />
          </div>
        </div>
      </div>

      <style>{`
        .split-word {
          will-change: transform, opacity;
        }
      `}</style>
    </section>
  )
}

export { Header1 }
