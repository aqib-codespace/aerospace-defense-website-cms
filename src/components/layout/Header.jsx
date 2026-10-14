"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail, Lock, ArrowRight } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { NAV_LINKS } from "@/config/site";
import { cn, telHref } from "@/lib/utils";

/**
 * Sticky header: a graphite utility bar carrying the compliance markers a buyer
 * checks first (CAGE code, ITAR status, RFQ contact), then the navigation row.
 *
 * The utility bar stays visible rather than collapsing on scroll — for this
 * audience those identifiers are the credential, not decoration.
 */
export default function Header({ settings }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = NAV_LINKS.filter(
    (link) => !link.requiresFinancing || settings.financingEnabled,
  );
  const rfqHref = settings.scheduleUrl || "#rfq";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility bar */}
      <div className="hidden bg-ink text-white/70 lg:block">
        <Container className="flex items-center justify-between gap-6 py-2 font-mono text-[0.68rem] tracking-wide">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5 text-brand">
              <Lock className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
              ITAR REGISTERED
            </span>
            <span className="text-white/25">|</span>
            <span>{settings.tagline}</span>
            <span className="text-white/25">|</span>
            <span>
              {settings.addressLine1}, {settings.addressLine2}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${settings.email}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Mail className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
              {settings.email}
            </a>
            <a
              href={telHref(settings.phone)}
              className="inline-flex items-center gap-1.5 font-medium text-white transition-colors hover:text-brand"
            >
              <Phone className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
              {settings.phone}
            </a>
          </div>
        </Container>
      </div>

      {/* Navigation row */}
      <div
        className={cn(
          "border-b bg-white transition-shadow duration-200",
          scrolled ? "border-steel-200 shadow-panel" : "border-steel-200/70",
        )}
      >
        <Container className="flex items-center justify-between gap-6 py-3">
          <Logo settings={settings} />

          <nav aria-label="Main" className="hidden items-center xl:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3.5 py-2 text-[0.82rem] font-medium text-steel-600 transition-colors hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <Button href={rfqHref} size="md" className="hidden sm:inline-flex">
              Request RFQ
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
            </Button>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-steel-300 text-ink transition-colors hover:border-brand hover:text-brand xl:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-steel-200 bg-white px-5 pb-12 pt-2 xl:hidden"
      >
        <nav aria-label="Mobile" className="divide-y divide-steel-100">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-4 text-[1.05rem] font-medium text-ink"
            >
              {link.label}
              <span className="font-mono text-[0.7rem] text-steel-300">
                {String(index + 1).padStart(2, "0")}
              </span>
            </Link>
          ))}
        </nav>

        <div className="mt-8 space-y-2.5">
          <Button href={rfqHref} full onClick={() => setOpen(false)}>
            Request RFQ
          </Button>
          <Button href={telHref(settings.phone)} variant="outline" full>
            <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            {settings.phone}
          </Button>
        </div>

        <dl className="mt-8 space-y-2 font-mono text-[0.72rem] text-steel-500">
          <div className="flex gap-2">
            <dt className="text-brand">ITAR</dt>
            <dd>Registered</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-brand">QMS</dt>
            <dd>{settings.tagline}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-brand">LOC</dt>
            <dd>
              {settings.addressLine1}, {settings.addressLine2}
            </dd>
          </div>
        </dl>
      </div>
    </header>
  );
}
