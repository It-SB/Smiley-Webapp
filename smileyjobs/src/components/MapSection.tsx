import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";
import map from "../assets/img/hero/map2.png";
import Card from "./globe";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  buttons: (ButtonProps & { title: string; link?: string })[];
  image: ImageProps;
};

export type Layout192Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Layout192 = (props: Layout192Props) => {
  const { tagline, heading, description, buttons, image } = {
    ...Layout192Defaults,
    ...props,
  };

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28 border-b border-blue mb-10">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-10 ">
          <div className="order-2 md:order-1">
            <Card />
          </div>
          <div className="order-1 lg:order-2">
            {/* <p className="mb-3 font-semibold md:mb-4">{tagline}</p> */}
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-7xl">{heading}</h2>
            <p className="md:text-md">{description}</p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              {buttons.map((button, index) => {
                // If the button has a link, render it as <a> wrapped Button, else just a Button
                if (button.link) {
                  return (
                    <a
                      key={index}
                      href={button.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button {...button}>{button.title}</Button>
                    </a>
                  );
                }
                return (
                  <Button key={index} {...button}>
                    {button.title}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Layout192Defaults: Props = {
  tagline: "Tagline",
  heading: "Expanding Our Presence",
  description:
    "SmileyJobs is actively planning to grow our global presence, with ambitions to expand into new regions and industries. Our commitment is to connect even more talent with opportunities worldwide, building on our foundation across North America, South America, Europe, Africa, Asia, and Australia.",
  buttons: [
    { title: "Learn more", variant: "secondary", link: "/about" },
    // {
    //   title: "Get Started",
    //   variant: "link",
    //   size: "link",
    //   iconRight: <RxChevronRight />,
    // },
  ],
  image: {
    src: map,
    alt: "Relume placeholder image",
  },
};

export default Layout192;
