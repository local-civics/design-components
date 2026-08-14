import React from "react";
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin } from "@tabler/icons";
import { builder } from "../../utils/classname/classname";

const LINKS: { label: string; href: string }[] = [
  { label: "About", href: "https://www.localcivics.io" },
  { label: "Terms", href: "https://www.localcivics.io/terms-of-service" },
  { label: "Privacy", href: "https://www.localcivics.io/privacy-policy" },
  { label: "Help Center", href: "https://localcivics.notion.site/Help-Center-b52300f587b64fc0a61f512686e7626d" },
];

const SOCIALS: { label: string; href: string; icon: typeof IconBrandInstagram }[] = [
  { label: "Instagram", href: "https://www.instagram.com/localcivics/", icon: IconBrandInstagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/localcivics", icon: IconBrandLinkedin },
  { label: "Facebook", href: "https://www.facebook.com/localcivics/", icon: IconBrandFacebook },
];

/**
 * FooterProps
 */
export type FooterProps = {
  /** Keeps the old centered, max-width-[64rem] layout. Default is full-width, matching
   * DashboardShell's unconstrained content - only AuthLayout's own fallback page (whose sibling
   * content is still centered the same way) needs to opt back into the constrained look. */
  constrained?: boolean;
};

/**
 * A component for the page footer.
 */
export const Footer = (props: FooterProps) => {
  const linkClassName = builder("text-sm text-slate-500").append("hover:text-slate-700").build();
  const socialClassName = builder("flex h-9 w-9 items-center justify-center rounded-full text-slate-400")
    .append("hover:bg-slate-100 hover:text-slate-600")
    .build();
  const innerClassName = props.constrained
    ? "w-full max-w-[64rem] m-auto flex flex-col gap-6 px-4 py-8 lg:px-0"
    : "flex flex-col gap-6 px-4 py-8";

  return (
    <footer className="w-full border-t border-slate-100">
      <div className={innerClassName}>
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex max-w-xs flex-col gap-2">
            <div className="flex items-center gap-2">
              <img className="w-4" src="https://cdn.localcivics.io/brand/l.png" alt="Local Civics" />
              <span className="text-lg font-bold text-slate-500">PathLink</span>
            </div>
            <p className="text-xs text-slate-400">We connect students to powerful civic learning experiences.</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {LINKS.map((link) => (
              <a key={link.label} className={linkClassName} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col-reverse gap-4 border-t border-slate-100 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} Local Civics. All rights reserved.</p>
          <div className="flex items-center gap-1">
            {SOCIALS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  className={socialClassName}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                >
                  <Icon size={18} stroke={1.5} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};
