"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ExternalLink, LogOut } from "lucide-react";
import BrandMark from "@/components/ui/BrandMark";
import NavIcon from "@/components/admin/ui/NavIcon";
import { cn } from "@/lib/utils";
import { logout } from "./actions";

function NavLink({ link, onNavigate }) {
  const pathname = usePathname();

  // `exact` keeps the dashboard from matching every /admin/* route.
  const isActive = link.exact
    ? pathname === link.href
    : pathname === link.href || pathname.startsWith(`${link.href}/`);

  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group flex items-center gap-2.5 border-l-2 py-2 pl-2.5 pr-2 text-[0.82rem] transition-colors",
        isActive
          ? "border-brand bg-white/[0.07] font-semibold text-white"
          : "border-transparent text-white/55 hover:bg-white/[0.04] hover:text-white",
      )}
    >
      <NavIcon
        name={link.icon}
        className={cn(
          "h-4 w-4 shrink-0 transition-colors",
          isActive ? "text-accent" : "text-white/40 group-hover:text-white/70",
        )}
      />
      <span className="truncate">{link.label}</span>
      {link.badge > 0 && (
        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-[2px] bg-accent px-1.5 font-mono text-[0.65rem] font-medium text-ink">
          {link.badge}
        </span>
      )}
    </Link>
  );
}

/**
 * Admin navigation: a permanent dark rail on desktop, a slide-in sheet on
 * mobile. Nav data is passed in as plain objects (icons by name) so the server
 * layout can build it from the same registries that generate the forms.
 */
export default function AdminSidebar({ sections, admin, company, site }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const nav = (
    <>
      <div className="mb-5 flex items-center gap-3 px-1.5">
        <BrandMark className="h-9 w-9" />
        <div className="min-w-0">
          <p className="truncate text-[0.85rem] font-semibold text-white">{company}</p>
          <p className="truncate font-mono text-[0.68rem] text-white/40">{admin.email}</p>
        </div>
      </div>

      {/*
       * Which shop is being edited. Essential once one panel can serve many:
       * an operator account with access to every site must never have to guess
       * whose content is on screen.
       */}
      {site && (
        <div className="mb-6 rounded-[2px] border border-white/10 bg-white/[0.04] px-3 py-2">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/35">
            Editing site
          </p>
          <p className="mt-0.5 truncate font-mono text-[0.78rem] font-medium text-accent">
            {site.slug}
          </p>
        </div>
      )}

      <nav className="flex-1 space-y-6 overflow-y-auto pb-4">
        {sections.map((section) => (
          <div key={section.heading}>
            <p className="mb-1.5 px-2.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/30">
              {section.heading}
            </p>
            <ul className="space-y-0.5">
              {section.links.map((link) => (
                <li key={link.href}>
                  <NavLink link={link} onNavigate={close} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="space-y-0.5 border-t border-white/10 pt-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 rounded-[2px] py-2 pl-2.5 pr-3 text-[0.82rem] text-white/55 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="h-4 w-4 shrink-0 text-white/40" strokeWidth={2} aria-hidden="true" />
          View live site
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="flex w-full items-center gap-2.5 rounded-[2px] py-2 pl-2.5 pr-3 text-[0.82rem] text-white/55 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-4 w-4 shrink-0 text-white/40" strokeWidth={2} aria-hidden="true" />
            Sign out
          </button>
        </form>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-steel-200 bg-white px-4 py-3 lg:hidden">
        <span className="flex items-center gap-2.5">
          <BrandMark className="h-8 w-8" />
          <span className="text-sm font-semibold text-ink">Admin</span>
        </span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open admin menu"
          className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-steel-200 text-steel-700"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          />
          <div className="surface-graphite absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col px-4 py-5">
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-[2px] text-white/60 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            {nav}
          </div>
        </div>
      )}

      {/* Desktop rail */}
      <aside className="surface-graphite sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-white/10 lg:flex">
        <div className="blueprint flex h-full flex-col px-4 py-6">{nav}</div>
      </aside>
    </>
  );
}
