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
<<<<<<< Updated upstream
    <div className="w-full h-screen">
      <Suspense fallback={<div>Loading About Page...</div>}>
        <AboutIframe />
      </Suspense>
=======
    <div className="bg-[#082744] text-white font-[Outfit,system-ui,sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');`}</style>

      {/* HERO ---------------------------------------------------------- */}

      <header className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(#FFD824 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-screen-xl mx-auto px-6 xl:px-16 py-24 sm:py-32">
          <SectionLabel>Who we are</SectionLabel>

          <h1 className="mt-6 max-w-4xl text-4xl sm:text-6xl font-bold leading-[1.05] tracking-tight">
            In recruitment we are the partners who win for both candidates and
            clients.
          </h1>

          <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-[#9FB3C8]">
            We are where opportunity meets expertise. Both locally and globally,
            our commitment is to forge meaningful connections that steer
            lifelong careers and help organisations reach their aspired
            potential.
          </p>

          <div className="mt-16 max-w-2xl border-l-4 border-[#FFD824] pl-6 sm:pl-8">
            <p className="text-sm font-medium text-[#FFD824]">
              Our big hairy audacious goal
            </p>
            <p className="mt-3 text-2xl sm:text-3xl font-semibold leading-snug">
              Introduce 100% of our candidates into the right roles the first
              time. Every time. Again and again.
            </p>
          </div>
        </div>
      </header>

      {/* VALUES -------------------------------------------------------- */}

      <section className="bg-[#05192C]">
        <div className="max-w-screen-xl mx-auto px-6 xl:px-16 py-24">
          <SectionLabel>Company culture</SectionLabel>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold">How we work</h2>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
            {VALUES.map((value) => (
              <div key={value.title} className="border-t border-white/15 pt-6">
                <h3 className="text-lg font-semibold text-[#FFD824]">
                  {value.title}
                </h3>
                <p className="mt-3 text-[#9FB3C8] leading-relaxed">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM ---------------------------------------------------------- */}

      <section className="max-w-screen-xl mx-auto px-6 xl:px-16 py-24">
        <SectionLabel>The people</SectionLabel>
        <h2 className="mt-4 text-3xl sm:text-4xl font-bold">Our team</h2>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map((person, index) => (
            <article key={index} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#05192C]">
                {person.image ? (
                  <img
                    src={person.image}
                    alt={person.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-5xl font-bold text-[#FFD824]/40">
                      {person.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              <h3 className="mt-5 font-semibold">{person.name}</h3>
              <p className="text-sm text-[#9FB3C8]">{person.role}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CV CTA -------------------------------------------------------- */}

      <section className="bg-[#FFD824] text-[#082744]">
        <div className="max-w-screen-xl mx-auto px-6 xl:px-16 py-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          <h2 className="max-w-xl text-3xl sm:text-4xl font-bold leading-tight">
            We are working for you. Drop your CV here or create a profile.
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a
              onClick={handleResumeUpload}
              className="rounded-md bg-[#082744] px-8 py-4 text-center font-medium text-white transition hover:opacity-90 active:scale-[0.98]"
            >
              Upload your CV
            </a>
            <a
              href="https://smileyjobs.co/create-profile"
              className="rounded-md border-2 border-[#082744] px-8 py-4 text-center font-medium transition hover:bg-[#082744] hover:text-white active:scale-[0.98]"
            >
              Create a profile
            </a>
          </div>
        </div>
      </section>

      {/* APPROACH ------------------------------------------------------ */}

      <section className="max-w-screen-xl mx-auto px-6 xl:px-16 py-24">
        <Wheel title="Our approach" items={APPROACH} />
      </section>

      {/* SOLUTIONS ----------------------------------------------------- */}

      <section className="bg-[#05192ca4]">
        <div className="max-w-screen-xl mx-auto px-6 xl:px-16 py-24">
          <Wheel title="Our solutions" items={SOLUTIONS} />
        </div>
      </section>

      {/* CONTACT + NEWSLETTER ------------------------------------------ */}

      <section className="max-w-screen-xl mx-auto px-6 xl:px-16 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold">Find us</h2>

            <address className="mt-6 space-y-4 not-italic text-[#9FB3C8]">
              <p className="max-w-xs leading-relaxed">
                18th floor, Green Park Corner, 3 Lower Road, Morningside,
                Sandton
              </p>
              <p>
                <a
                  href="tel:0615336736"
                  className="transition hover:text-[#FFD824]"
                >
                  061 533 6736
                </a>
              </p>
              <p>
                <a
                  href="mailto:Lemogang@smileyjobs.co"
                  className="transition hover:text-[#FFD824]"
                >
                  Lemogang@smileyjobs.co
                </a>
              </p>
            </address>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Newsletter</h2>
            <p className="mt-4 max-w-sm text-[#9FB3C8] leading-relaxed">
              Keep up to date with the latest news from SmileyJobs.
            </p>

            {subscribed ? (
              <p className="mt-8 font-medium text-[#FFD824]">
                You are subscribed. Look out for the next one.
              </p>
            ) : (
              <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email address"
                  className="flex-1 rounded-md border border-white/20 bg-transparent px-4 py-3 text-white placeholder:text-white/40 focus:border-[#FFD824] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleSubscribe}
                  className="rounded-md bg-[#FFD824] px-6 py-3 font-medium text-[#082744] transition hover:opacity-90 active:scale-[0.98]"
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
>>>>>>> Stashed changes
    </div>
  );
};

export default About;
// This code defines a React component that renders an iframe for the About page.