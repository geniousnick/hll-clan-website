import Link from "next/link";
import Image from "next/image";
import { translations, Lang } from "@/data/translations";

interface FooterProps {
  lang: Lang;
}

export default function Footer({ lang }: FooterProps) {
  const t = translations[lang];
  const nav = t.nav;
  const footer = t.footer;

  const navLinks = [
    { href: "/", label: nav.home },
    { href: "/roster", label: nav.roster },
    { href: "/matches", label: nav.matches },
    { href: "/recrutement", label: nav.recruitment },
  ];

  return (
    <footer className="bg-[#080908] border-t border-[#1E2318] mt-auto">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 flex-shrink-0">
                <Image
                  src="/images/logo-l9o.png"
                  alt="La 9ème Ombre [L9O]"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-[#E8E4DA] font-display text-lg tracking-widest">
                  LA 9ÈME OMBRE
                </p>
                <p className="text-[#8A8C85] text-xs font-mono tracking-[0.3em]">
                  [L9O] · HELL LET LOOSE
                </p>
              </div>
            </div>
            <p className="text-[#5A5C50] text-sm leading-relaxed max-w-xs">
              {footer.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-[#C45C1A] font-display text-base tracking-widest mb-5 uppercase">
              {footer.quickLinks}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#8A8C85] hover:text-[#E8E4DA] text-sm tracking-wider uppercase transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-3 h-px bg-[#3A3B33] group-hover:bg-[#C45C1A] transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Discord CTA */}
          <div>
            <h3 className="text-[#C45C1A] font-display text-base tracking-widest mb-5 uppercase">
              {footer.social}
            </h3>
            <a
              href="LIEN_DISCORD_ICI"
              target="_blank"
              rel="noopener noreferrer"
              id="footer-discord-btn"
              className="group inline-flex items-center gap-3 bg-[#161A13] border border-[#3A3B33] hover:border-[#5865F2] text-[#8A8C85] hover:text-white px-5 py-3 rounded transition-all duration-300 hover:bg-[#5865F2]/10"
            >
              <svg
                className="text-[#5865F2]"
                width="20"
                height="15"
                viewBox="0 0 71 55"
                fill="currentColor"
              >
                <path d="M60.1 4.9A58.5 58.5 0 0045.6 1a.22.22 0 00-.23.11 40.8 40.8 0 00-1.8 3.7 54 54 0 00-16.2 0A37.4 37.4 0 0025.5 1.1a.23.23 0 00-.23-.1A58.3 58.3 0 0010.8 4.9C10.7 5 10.6 5 10.6 5.1 1.5 18.7-0.9 32 0.3 45c0 .1.1.1.1.2a58.8 58.8 0 0017.7 9 .23.23 0 00.25-.09 42 42 0 003.6-5.9.23.23 0 00-.12-.32 38.7 38.7 0 01-5.5-2.6.23.23 0 01-.02-.39c.37-.28.74-.57 1.1-.86a.22.22 0 01.23-.03c11.5 5.3 24 5.3 35.4 0a.22.22 0 01.23.02c.36.3.73.59 1.1.87a.23.23 0 01-.02.39 36 36 0 01-5.5 2.6.23.23 0 00-.12.32 47.1 47.1 0 003.6 5.9.22.22 0 00.25.09A58.6 58.6 0 0070.6 45.1c.1-.1.1-.1.1-.2 1.5-15.4-2.5-28.5-10.6-40.1 0-.1-.1-.1-.1-.1zM23.7 37.3c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.6 0 6.5 3.3 6.4 7.2 0 4-2.8 7.2-6.4 7.2zm23.6 0c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.6 0 6.5 3.3 6.4 7.2 0 4-2.8 7.2-6.4 7.2z" />
              </svg>
              <span className="font-medium text-sm">Discord</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1E2318]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[#3A3B33] text-xs font-mono">
            © {new Date().getFullYear()} La 9ème Ombre [L9O]. {footer.rights}
          </p>
          <p className="text-[#3A3B33] text-xs font-mono">
            Hell Let Loose — Team Competitive Website
          </p>
        </div>
      </div>
    </footer>
  );
}
