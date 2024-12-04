import { RxChevronRight } from 'react-icons/rx'; // Ensure this import is correct

export const Layout423Defaults = {
  tagline: "Stay Connected",
  heading: "Download Our App",
  features: [
    {
      url: "#",
      heading: "Get it on your laptop",
      description:
        "Download our app on iOS and enjoy seamless access to all our features. Stay updated and connected on the go.",
      image: {
        src: "https://static.vecteezy.com/system/resources/previews/021/515/122/non_2x/ios-icon-logo-software-apple-symbol-with-name-white-design-mobile-illustration-with-black-background-free-vector.jpg",
        alt: "iOS App Icon",
      },
      button: {
        variant: "link",
        size: "link",
        iconRight: <RxChevronRight />,
      },
    },
    {
      url: "#",
      heading: "Get it on Android",
      description:
        "Download our app on Android to experience everything we offer. Easy to use, reliable, and available anytime.",
      image: {
        src: "https://www.goodworklabs.com/wp-content/uploads/2014/05/Android.jpg",
        alt: "Android App Icon",
      },
      button: {
        variant: "link",
        size: "link",
        iconRight: <RxChevronRight />,
      },
    },
  ],
};
