import Link from "next/link";
import {
  Inbox,
  Phone,
  Mail,
  Building2,
  Ruler,
  Package,
  Atom,
  Clock,
  FileText,
  Download,
  ShieldAlert,
} from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import Badge from "@/components/admin/ui/Badge";
import EmptyState from "@/components/admin/ui/EmptyState";
import DeleteButton from "@/components/admin/DeleteButton";
import { getLeads } from "@/db/queries/admin";
import { LEAD_STATUSES } from "@/config/site";
import { formatDateTime, telHref, cn } from "@/lib/utils";
import LeadStatusSelect from "./LeadStatusSelect";
import { deleteLead } from "./actions";

export const metadata = { title: "RFQ Inbox" };

function Spec({ icon: Icon, label, children }) {
  if (!children) return null;

  return (
    <div className="flex min-w-0 gap-2.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-steel-400" strokeWidth={2} aria-hidden="true" />
      <div className="min-w-0">
        <p className="font-mono text-[0.64rem] uppercase tracking-[0.12em] text-steel-400">
          {label}
        </p>
        <div className="mt-0.5 truncate text-[0.84rem] text-steel-800">{children}</div>
      </div>
    </div>
  );
}

export default async function LeadsPage({ searchParams }) {
  const { status } = await searchParams;
  const active = LEAD_STATUSES.some((entry) => entry.value === status) ? status : null;

  // Fetch all so the filter tabs can show live counts, then narrow in memory.
  const all = await getLeads();
  const leads = active ? all.filter((lead) => lead.status === active) : all;

  const tabs = [
    { value: null, label: "All", count: all.length, href: "/admin/leads" },
    ...LEAD_STATUSES.map((entry) => ({
      value: entry.value,
      label: entry.label,
      count: all.filter((lead) => lead.status === entry.value).length,
      href: `/admin/leads?status=${entry.value}`,
    })),
  ];

  return (
    <>
      <PageHeader
        title="RFQ Inbox"
        description="Every quote request from the website. Move each one along the pipeline so nothing is quoted twice or dropped."
      />

      <div className="mb-6 flex flex-wrap gap-1.5">
        {tabs.map((tab) => {
          const isActive = tab.value === active;
          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={cn(
                "inline-flex items-center gap-2 rounded-[2px] px-3.5 py-2 text-[0.8rem] font-semibold transition-colors",
                isActive
                  ? "bg-ink text-white"
                  : "border border-steel-200 bg-white text-steel-600 hover:border-steel-300",
              )}
            >
              {tab.label}
              <span
                className={cn(
                  "rounded-[2px] px-1.5 font-mono text-[0.68rem]",
                  isActive ? "bg-white/15" : "bg-steel-100 text-steel-500",
                )}
              >
                {tab.count}
              </span>
            </Link>
          );
        })}
      </div>

      {leads.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title={active ? `No RFQs in “${active}”` : "No RFQs yet"}
          description={
            active
              ? "Try a different filter to see the rest of the inbox."
              : "When a buyer submits the RFQ form, the request appears here with any uploaded drawing attached."
          }
        />
      ) : (
        <ul className="space-y-4">
          {leads.map((lead) => {
            const meta =
              LEAD_STATUSES.find((entry) => entry.value === lead.status) ?? {
                label: lead.status,
                tone: "gray",
              };
            const d = lead.details ?? {};

            return (
              <li
                key={lead.id}
                id={`lead-${lead.id}`}
                className="scroll-mt-24 rounded-[2px] border border-steel-200 bg-white shadow-panel"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-steel-100 px-5 py-4">
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2 text-[0.95rem] font-semibold text-ink">
                      {d.company || lead.name}
                      <Badge tone={meta.tone}>{meta.label}</Badge>
                      {d.ndaRequired && (
                        <Badge tone="amber">
                          <ShieldAlert className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
                          NDA requested
                        </Badge>
                      )}
                    </p>
                    <p className="mt-0.5 font-mono text-[0.7rem] text-steel-400">
                      {lead.name} · received {formatDateTime(lead.createdAt)}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <LeadStatusSelect id={lead.id} status={lead.status} />
                    <DeleteButton
                      action={deleteLead}
                      compact
                      hidden={{ id: lead.id }}
                      label="Delete RFQ"
                      confirmMessage={`Delete the RFQ from ${d.company || lead.name}? This cannot be undone.`}
                    />
                  </div>
                </div>

                <div className="grid gap-4 px-5 py-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Spec icon={Phone} label="Phone">
                    <a href={telHref(lead.phone)} className="font-semibold text-brand hover:underline">
                      {lead.phone}
                    </a>
                  </Spec>
                  <Spec icon={Mail} label="Email">
                    <a href={`mailto:${lead.email}`} className="text-brand hover:underline">
                      {lead.email}
                    </a>
                  </Spec>
                  <Spec icon={Building2} label="Industry">
                    {d.industry}
                  </Spec>
                  <Spec icon={FileText} label="Service">
                    {lead.serviceNeeded}
                  </Spec>
                  <Spec icon={Atom} label="Material">
                    {d.material}
                  </Spec>
                  <Spec icon={Package} label="Quantity / EAU">
                    {d.quantity}
                  </Spec>
                  <Spec icon={Ruler} label="Tolerance">
                    <span className="tabular font-mono">{d.tolerance}</span>
                  </Spec>
                  <Spec icon={Clock} label="Required date">
                    {d.timeline}
                  </Spec>
                </div>

                {lead.comments && (
                  <div className="mx-5 mb-4 border-l-2 border-steel-300 bg-steel-50 px-4 py-3">
                    <p className="font-mono text-[0.64rem] uppercase tracking-[0.12em] text-steel-400">
                      Project description
                    </p>
                    <p className="mt-1.5 whitespace-pre-line text-[0.85rem] leading-relaxed text-steel-700">
                      {lead.comments}
                    </p>
                  </div>
                )}

                {d.notes && (
                  <div className="mx-5 mb-4 text-[0.82rem] text-steel-600">
                    <span className="font-mono text-[0.64rem] uppercase tracking-[0.12em] text-steel-400">
                      Notes ·{" "}
                    </span>
                    {d.notes}
                  </div>
                )}

                {lead.attachmentPath && (
                  <div className="mx-5 mb-5">
                    {/*
                     * Links through /api/admin/rfq-file, which verifies the path
                     * belongs to a lead on this site and then issues a 2-minute
                     * signed URL. The bucket itself is private — drawings can
                     * carry controlled technical data.
                     */}
                    <a
                      href={`/api/admin/rfq-file?path=${encodeURIComponent(lead.attachmentPath)}`}
                      className="inline-flex items-center gap-2.5 rounded-[2px] border border-brand/30 bg-brand-light px-4 py-2.5 text-[0.84rem] font-semibold text-brand-dark transition-colors hover:border-brand"
                    >
                      <Download className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                      {lead.attachmentName ?? "Download drawing"}
                      <span className="font-mono text-[0.66rem] font-normal text-steel-500">
                        private · signed link
                      </span>
                    </a>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
