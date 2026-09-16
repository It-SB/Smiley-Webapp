import React, { useState } from "react";

/* -------------------------------------------------------------------------
   Brand tokens
   navy   #082744      deep navy #05192C
   yellow #FFD824      muted     #9FB3C8
   ------------------------------------------------------------------------- */

const VALUES = [
  {
    title: "Pride and accountability",
    body: "Proud to be accountable to the best version of ourselves.",
  },
  {
    title: "Smiles and positivity",
    body: "In every interaction, something worth smiling about.",
  },
  {
    title: "People driven",
    body: "We contribute to a shared sense of belonging and community.",
  },
  {
    title: "Relentless",
    body: "We don't rest until we win.",
  },
  {
    title: "Leaders",
    body: "We lead by example.",
  },
  {
    title: "Problem solvers",
    body: "We solve problems before they exist.",
  },
];

const TEAM = [
  {
    name: "Courtney",
    role: "Employee Happiness Advocate",
    image: "",
  },
  { name: "Team member", role: "Recruitment Consultant", image: "" },
  { name: "Team member", role: "Talent Partner", image: "" },
  { name: "Team member", role: "Client Success", image: "" },
];

const APPROACH = [
  {
    label: "Live Pulse",
    body: "Real-time feedback at every stage of the hire.",
  },
  {
    label: "Life-Long Career Development",
    body: "We stay with candidates well past the placement.",
  },
  {
    label: "Alignment and Transparency",
    body: "Everyone sees the same brief, the same shortlist, the same timeline.",
  },
  { label: "Cultural Fit", body: "We hire for how a team actually works." },
  {
    label: "Talent Pool",
    body: "A vetted local and global bench, ready early.",
  },
  {
    label: "Quality Assurance",
    body: "Every shortlist is checked before it reaches you.",
  },
  {
    label: "Risk Absorption",
    body: "We carry the risk of a hire that doesn't land.",
  },
  {
    label: "Payment Terms",
    body: "Terms that flex to how your business pays.",
  },
];

const SOLUTIONS = [
  { label: "Permanent Placements", body: "Full-time hires, end to end." },
  { label: "Contracting", body: "Skilled people on short and fixed terms." },
  {
    label: "Executive Search",
    body: "Discreet searches for senior and board roles.",
  },
  { label: "Payroll", body: "We employ and pay, you manage the work." },
  { label: "HR Software", body: "Tools to run people processes in one place." },
  {
    label: "EEA Reporting",
    body: "Employment equity reporting, prepared and filed.",
  },
  { label: "Multi-Hire", body: "Volume hiring for new teams and new sites." },
  {
    label: "Career Development",
    body: "Coaching and upskilling for placed candidates.",
  },
];

/* ------------------------------------------------------------------------- */

const SectionLabel = ({ children }) => (
  <p className="text-[#FFD824] text-sm font-medium tracking-wide">{children}</p>
);

const Wheel = ({ title, items }) => {
  const [active, setActive] = useState(null);
  const current = active === null ? null : items[active];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
      <div>
        <h2 className="text-4xl sm:text-5xl font-bold leading-[1.05] text-[#FFD824]">
          {title}
        </h2>
        <p className="mt-6 max-w-sm text-[#9FB3C8] leading-relaxed">
          Tap any part of the wheel to see what it means in practice.
        </p>

        {/* Mobile list — the wheel is decorative below lg */}
        <ul className="mt-8 space-y-4 lg:hidden">
          {items.map((item) => (
            <li key={item.label} className="border-l-2 border-[#FFD824] pl-4">
              <p className="font-semibold text-white">{item.label}</p>
              <p className="text-sm text-[#9FB3C8] mt-1">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Wheel */}
      <div className="relative mx-auto hidden lg:block w-full max-w-[520px] aspect-square">
        <div className="absolute inset-[12%] rounded-full bg-white/5" />
        <div className="absolute inset-[24%] rounded-full bg-white/5" />

        {items.map((item, index) => {
          const angle = (-90 + index * 45) * (Math.PI / 180);
          const radius = 40; // % from centre
          const left = 50 + radius * Math.cos(angle);
          const top = 50 + radius * Math.sin(angle);
          const isActive = active === index;

          return (
            <button
              key={item.label}
              type="button"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(isActive ? null : index)}
              style={{ left: `${left}%`, top: `${top}%` }}
              className={`absolute w-[27%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full px-3
                text-xs font-semibold leading-tight transition-all duration-300
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD824]
                ${
                  isActive
                    ? "bg-[#FFD824] text-[#082744] scale-110"
                    : "bg-[#05192C] text-[#FFD824] hover:scale-105"
                }`}
            >
              {item.label}
            </button>
          );
        })}

        {/* Hub */}
        <div className="absolute left-1/2 top-1/2 flex w-[36%] aspect-square -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#FFD824] bg-[#05192C] p-4 text-center">
          {current ? (
            <p className="text-[11px] leading-snug text-white">
              {current.body}
            </p>
          ) : (
            <p className="text-lg font-bold text-[#FFD824]">
              smiley
              <span className="block text-[10px] tracking-[0.3em] text-white">
                JOBS
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const handleResumeUpload = () => {
  // Create the iframe
  const iframe = document.createElement("iframe");
  iframe.src = "https://it-sb.github.io/SmileyUpload/";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";

  // Create the modal container
  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100vw";
  modal.style.height = "100vh";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  modal.style.backdropFilter = "blur(10px)"; // Blurred background
  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
  modal.style.zIndex = "1000";

  // Create a container for the iframe
  const iframeContainer = document.createElement("div");
  iframeContainer.style.width = "80%"; // Adjust as needed
  iframeContainer.style.height = "80%"; // Adjust as needed
  iframeContainer.style.backgroundColor = "#ffffff"; // White background for the iframe
  iframeContainer.style.borderRadius = "10px"; // Rounded corners
  iframeContainer.style.overflow = "hidden";
  iframeContainer.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.3)";

  iframeContainer.appendChild(iframe);
  modal.appendChild(iframeContainer);

  // Append the modal to the body
  document.body.appendChild(modal);

  // Close modal on click outside the iframe container
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      document.body.removeChild(modal);
    }
  });
};

/* ------------------------------------------------------------------------- */

const About = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
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
                You're subscribed. Look out for the next one.
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
    </div>
  );
};

export default About;
