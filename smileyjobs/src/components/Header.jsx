import React from 'react';
import { Button } from '@relume_io/relume-ui';
import logo from "../assets/Blue.png"

const Header1Defaults = {
  heading: "Welcome to SmileyJobs",
  description:
    "Belong & Smile” At Smiley Jobs, we believe in the power of belonging and a perfect fit. Our dedication goes beyond the resume; we value our candidates as much as our clients. We're committed to putting a smile on faces — not just for the roles we fill but for the relationships we build.",
//   buttons: [{ title: "Button" }, { title: "Button", variant: "secondary" }],
  image: {
    src: logo,
    alt: "Placeholder image",
  },
};

const Header1 = (props) => {
  const { heading, description, buttons, image } = {
    ...Header1Defaults,
    ...props,
  };

  return (
    <section className="px-[5%] py-16 md:py-20 lg:py-24 border border-b-blue border-t-white">
      <div className="max-w-screen-2xl container mx-auto xl:px-24m ">
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center ">
          <div>
            <h1 className="mb-5 text-3xl font-bold md:mb-6 md:text-8xl lg:text-7xl">{heading}</h1>
            <p className="md:text-md">{description}</p>
            <div className="mt-6 flex gap-x-4 md:mt-8">
              {/* {buttons.map((button, index) => (
                <Button key={index} {...button}>
                  {button.title}
                </Button>
              ))} */}
            </div>
          </div>
          <div className='hidden md:block'>
            <img src={image.src} className="w-[450px] object-cover" alt={image.alt} />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Header1 };
