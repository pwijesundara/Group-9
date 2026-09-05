import { Link } from "react-router-dom";

const TEAL_DARK = "#122d3a";
const GOLD = "#c9a227";

const cols = [
  {
    title: "Hospital",
    links: [
      { label: "Home",             to: "/" },
      { label: "About Us",         to: "/about/overview" },
      { label: "History",          to: "/about/history" },
      { label: "Vision & Mission", to: "/about/vision-mission" },
      { label: "Leadership",       to: "/about/leadership" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "OPD Services",       to: "/services" },//table added
      { label: "Inpatient Care",     to: "/services" },
      { label: "Emergency Services", to: "/services" },
      { label: "Laboratory",         to: "/services" },
      { label: "Radiology",          to: "/services" },
    ],
  },
  {
    title: "Patients",
    links: [
      { label: "Find a Doctor",    to: "/doctors" },
      
      
    ],
  },
];

export default function Footer() {
  return (
    <footer className="text-white py-12 px-4" style={{ background: TEAL_DARK }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div>
            <Link to="/" className="font-bold text-lg mb-2 block hover:opacity-80 transition-opacity">
              National Hospital Galle
            </Link>
            <p className="text-xs text-white/60 leading-relaxed mb-4">
              Southern Sri Lanka's premiere tertiary care institution, serving the community
              with compassion since 1949.
            </p>
            <div className="text-xs text-white/40">
              © 2026 National Hospital Galle · Ministry of Health, Sri Lanka
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <p className="font-semibold text-sm mb-4 tracking-wide" style={{ color: GOLD }}>
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label} className={link.isSpecial ? "pt-1" : ""}>
                    {link.isSpecial ? (
                      <Link
                        to={link.to}
                        className="inline-block px-3 py-1 rounded text-white text-xs font-semibold transition-all duration-300 transform hover:-translate-y-0.5 hover:brightness-110 hover:shadow-md hover:shadow-black/30 active:translate-y-0"
                        style={{ background: GOLD }}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <Link
                        to={link.to}
                        className="text-xs text-white/60 hover:text-white transition-colors duration-150 block w-fit"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal Footer Bottom Row */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <span>National Hospital Galle · ISO Accredited · Tertiary Teaching Hospital</span>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white/70 transition-colors">Terms of Use</Link>
            {/* <Link to="/sitemap" className="hover:text-white/70 transition-colors">Sitemap</Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}