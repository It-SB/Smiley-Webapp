import React from "react";
import { BiEnvelope, BiMap, BiMessageDetail, BiPhone } from "react-icons/bi";

const Contact24Defaults = {
  //   tagline: "Tagline",
  heading: "Contact us",
  //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  contacts: [
    {
      icon: <BiEnvelope className="size-12" />,
      title: "Email",
      description: "Send us your query anytime!",
      link: {
        label: "Lwando@smileyjobs.co",
        // url: "#",
      },
    },
    // {
    //   icon: <BiMessageDetail className="size-12" />,
    //   title: "Live chat",
    //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.",
    //   link: {
    //     label: "Start new chat",
    //     url: "#",
    //   },
    // },
    {
      icon: <BiPhone className="size-12" />,
      title: "Phone",
      description: "Mon to Fri 9am to 6pm",
      link: {
        label: "061 533 7963",
        // url: "#",
      },
    },
    {
      icon: <BiMap className="size-12" />,
      title: "Office",
      description: "18th floor, Green Park Corner ",
      link: {
        label: "3 Lower Road Morningside, Sandton",
        // url: "#",
      },
    },
  ],
};

const Contact24 = (props) => {
  const { tagline, heading, description, contacts } = {
    ...Contact24Defaults,
    ...props,
  };

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="max-w-screen-2xl container mx-auto xl:px-24 md:py-20 py-14 px-4">
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-4xl">
            {heading}
          </h2>
          <p className="md:text-md">{description}</p>
        </div>
        <div className="grid grid-cols-1 items-start justify-start gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-4">
          {contacts.map((contact, index) => (
            <div key={index}>
              <div className="mb-5 md:mb-6">{contact.icon}</div>
              <h3 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                {contact.title}
              </h3>
              <p className="mb-5 md:mb-6">{contact.description}</p>
              <a className="underline" href={contact.link.url}>
                {contact.link.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Contact24 };
