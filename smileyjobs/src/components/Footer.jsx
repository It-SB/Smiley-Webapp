import { FaXTwitter } from "react-icons/fa6";
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from "react-icons/bi";
import logoImg from "/Smiley Jobs Logo.png";

export const Footer3 = (props) => {
  const {
    logo,
    address,
    contact,
    columnLinks,
    socialMediaLinks,
    footerText,
    footerLinks,
  } = {
    ...Footer3Defaults,
    ...props,
  };

  return (
    <footer className="bg-gradient-to-t from-gray-50 via-white to-white px-[5%] py-12 md:py-18 lg:py-20 border-t border-gray-200">
      <div className="container mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-[1.2fr_1fr] lg:gap-x-12 pb-12 md:pb-18 lg:pb-20">
          {/* Left Section */}
          <div>
            {/* Logo */}
            <div className="mb-6 md:mb-8 w-24 h-24 rounded-full bg-white shadow flex items-center justify-center">
              <a href={logo.url}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="inline-block w-20 h-20 object-contain"
                />
              </a>
            </div>

            {/* Address & Contact */}
            <div className="mb-6 md:mb-8 text-gray-700">
              <div>
                <p className="mb-1 text-sm font-semibold text-gray-900">
                  {address.label}
                </p>
                <p className="mb-5 text-sm md:mb-6">{address.value}</p>
              </div>
              <div>
                <p className="mb-1 text-sm font-semibold text-gray-900">
                  {contact.label}
                </p>
                <div className="flex flex-col text-sm md:mb-6 gap-1">
                  <a
                    href={`tel:${contact.phone}`}
                    className="hover:text-primary transition"
                  >
                    {contact.phone}
                  </a>
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-primary transition"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-x-3 mt-4">
              {socialMediaLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label || "Social link"}
                  className="bg-gray-100 hover:bg-primary hover:text-white transition rounded-full p-2"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right Section (Links) */}
          <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-8 md:gap-y-4">
            {columnLinks.map((column, index) => (
              <div key={index}>
                {column.title && (
                  <h4 className="mb-3 text-base font-bold text-gray-900">
                    {column.title}
                  </h4>
                )}
                <ul>
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="py-1">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-700 hover:text-primary transition font-medium px-2 py-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {link.icon && <span>{link.icon}</span>}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gray-200" />

        {/* Bottom Row */}
        <div className="flex flex-col-reverse items-start justify-between pb-4 pt-6 text-sm md:flex-row md:items-center md:pb-0 md:pt-8">
          <p className="mt-8 md:mt-0 text-gray-500">{footerText}</p>
          <ul className="grid grid-flow-row grid-cols-[max-content] justify-center gap-y-4 text-sm md:grid-flow-col md:gap-x-6 md:gap-y-0">
            {footerLinks.map((link, index) => (
              <li
                key={index}
                className="underline hover:text-primary transition"
              >
                <a href={link.url}>{link.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export const Footer3Defaults = {
  logo: {
    url: "#",
    src: logoImg,
    alt: "Logo image",
  },
  address: {
    label: "Address:",
    value: "18th floor, Green Park Corner 3 Lower Road Morningside, Sandton",
  },
  contact: {
    label: "Contact:",
    phone: "061 533 6736",
    email: "Lemogang@smileyjobs.co",
  },
  columnLinks: [
    {
      links: [],
    },
    {
      links: [
        { title: "About Us", url: "/about" },
        { title: "Services", url: "/services" },
        { title: "Contact Us", url: "/contact" },
        {
          title: "Privacy Policy",
          url: "/smileyjobs/public/assets/documents/Smiley_Jobs_POPIA_Privacy_Policy.pdf",
        },
        {
          title: "Terms of Use",
          url: "/smileyjobs/public/assets/documents/Smiley_Jobs_Terms_of_Use.pdf",
        },
        {
          title: "Cookie Policy",
          url: "/smileyjobs/public/assets/documents/Smiley_Jobs_Cookie_Policy.pdf",
        },
        {
          title: "PAIA Manual",
          url: "/smileyjobs/public/assets/documents/Smiley_Jobs_PAIA_Manual.pdf",
        },
      ],
    },
  ],
  socialMediaLinks: [
    {
      url: "https://www.facebook.com/people/Smiley-Jobs/61555739846518/",
      icon: <BiLogoFacebookCircle className="size-6" />,
      label: "Facebook",
    },
    {
      url: "https://www.instagram.com/smiley_jobs",
      icon: <BiLogoInstagram className="size-6" />,
      label: "Instagram",
    },
    // {
    //   url: "https://twitter.com/",
    //   icon: <FaXTwitter className="size-6 p-0.5" />,
    //   label: "Twitter",
    // },
    {
      url: "https://za.linkedin.com/company/smiley-jobs",
      icon: <BiLogoLinkedinSquare className="size-6" />,
      label: "LinkedIn",
    },
    // {
    //   url: "https://www.youtube.com/",
    //   icon: <BiLogoYoutube className="size-6" />,
    //   label: "YouTube",
    // },
  ],
  footerText: "© 2025 SmileyJobs. All rights reserved.",
  footerLinks: [],
};