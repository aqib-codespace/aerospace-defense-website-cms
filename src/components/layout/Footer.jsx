import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import Logo from "@/components/ui/Logo";
import SocialIcon from "@/components/ui/SocialIcon";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { NAV_LINKS, LEGAL_LINKS } from "@/config/site";
import { telHref } from "@/lib/utils";

function ColumnHeading({ children }) {
  return (
    <h2 className="mb-4 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-white/40">
      {children}
    </h2>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <Link href={href} className="text-[0.85rem] text-white/60 transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}

export default function Footer({ settings, footer, capabilities = [], industries = [] }) {
  const links = NAV_LINKS.filter(
    (link) => !link.requiresFinancing || settings.financingEnabled,
  );

  return (
    <footer className="surface-graphite text-white">
      <div className="blueprint">
        {/* Last-chance RFQ band — the footer is still a conversion surface. */}
        <Container className="border-b border-white/10 py-9">
          <div className="flex flex-col items-start gap-5 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-2xl text-lg font-medium leading-snug text-white sm:text-xl">
              Send a drawing package. A quote and engineering review come back within one business
              day.
            </p>
            <div className="flex shrink-0 flex-wrap gap-2.5">
              <Button href={settings.scheduleUrl || "#rfq"} size="md">
                Request RFQ
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
              </Button>
              <Button href={telHref(settings.phone)} variant="outline-light" size="md">
                <Phone className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                {settings.phone}
              </Button>
            </div>
          </div>
        </Container>

        <Container className="py-14">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Logo settings={settings} tone="light" size="lg" />
              <p className="mt-5 max-w-sm text-[0.85rem] leading-relaxed text-white/55">
                {footer?.about}
              </p>

              {settings.socialLinks?.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {settings.socialLinks.map((social) => (
                    <li key={`${social.platform}-${social.url}`}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.platform}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-[2px] border border-white/12 text-white/60 transition-colors hover:border-brand hover:text-white"
                      >
                        <SocialIcon platform={social.platform} />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
              <nav aria-label="Capabilities">
                <ColumnHeading>{footer?.capabilitiesHeading ?? "Capabilities"}</ColumnHeading>
                <ul className="space-y-2.5">
                  {capabilities.slice(0, 7).map((item) => (
                    <FooterLink key={item.id} href="#capabilities">
                      {item.title}
                    </FooterLink>
                  ))}
                </ul>
              </nav>

              <nav aria-label="Industries">
                <ColumnHeading>{footer?.industriesHeading ?? "Industries"}</ColumnHeading>
                <ul className="space-y-2.5">
                  {industries.slice(0, 7).map((item) => (
                    <FooterLink key={item.id} href="#industries">
                      {item.title}
                    </FooterLink>
                  ))}
                </ul>
              </nav>

              <div className="col-span-2 sm:col-span-1">
                <ColumnHeading>{footer?.companyHeading ?? "Company"}</ColumnHeading>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <FooterLink key={link.href} href={link.href}>
                      {link.label}
                    </FooterLink>
                  ))}
                </ul>

                <ul className="mt-6 space-y-3 text-[0.85rem] text-white/60">
                  <li className="flex gap-2.5">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2} aria-hidden="true" />
                    <a href={telHref(settings.phone)} className="font-medium text-white hover:text-brand">
                      {settings.phone}
                    </a>
                  </li>
                  <li className="flex gap-2.5">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2} aria-hidden="true" />
                    <a href={`mailto:${settings.email}`} className="break-all hover:text-white">
                      {settings.email}
                    </a>
                  </li>
                  <li className="flex gap-2.5">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2} aria-hidden="true" />
                    <address className="not-italic">
                      {settings.addressLine1}
                      <br />
                      {settings.addressLine2}
                    </address>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6">
            {footer?.legalNote && (
              <p className="max-w-4xl font-mono text-[0.68rem] leading-relaxed text-white/35">
                {footer.legalNote}
              </p>
            )}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-[0.68rem] text-white/35">
                © {new Date().getFullYear()} {settings.company}
              </p>
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-mono text-[0.68rem] text-white/35 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
