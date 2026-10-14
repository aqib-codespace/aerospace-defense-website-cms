import Link from "next/link";
import { Inbox, ArrowRight, CalendarClock, LayoutTemplate, Settings as SettingsIcon } from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import Panel from "@/components/admin/ui/Panel";
import Badge from "@/components/admin/ui/Badge";
import Button from "@/components/admin/ui/Button";
import EmptyState from "@/components/admin/ui/EmptyState";
import NavIcon from "@/components/admin/ui/NavIcon";
import { requireAdmin } from "@/lib/auth/dal";
import { getDashboardStats, getLeads, getRecentActivity } from "@/db/queries/admin";
import { COLLECTIONS } from "@/lib/admin/collections";
import { LEAD_STATUSES } from "@/config/site";
import { formatDateTime } from "@/lib/utils";

export const metadata = { title: "Dashboard" };

function statusMeta(status) {
  return LEAD_STATUSES.find((entry) => entry.value === status) ?? { label: status, tone: "gray" };
}

export default async function AdminDashboardPage() {
  const [admin, stats, leads, activity] = await Promise.all([
    requireAdmin(),
    getDashboardStats(),
    getLeads(),
    getRecentActivity(6),
  ]);

  const recentLeads = leads.slice(0, 6);

  return (
    <>
      <PageHeader
        title={`Welcome back, ${admin.name.split(" ")[0]}`}
        description="Everything on the public site is editable from here. RFQs arrive in the inbox; content lives in the sections below."
        actions={
          <Button href="/admin/leads" variant="secondary">
            <Inbox className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            Open RFQ inbox
          </Button>
        }
      />

      {/* RFQ pipeline summary — the metric that pays for the site. */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/admin/leads?status=new"
          className="group rounded-[2px] border border-brand/30 bg-brand-light p-5 transition-colors hover:border-brand"
        >
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-brand">
            Awaiting review
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-ink">
            {stats.newLeads}
          </p>
          <p className="mt-0.5 text-[0.8rem] text-steel-600">New RFQs</p>
        </Link>

        <div className="rounded-[2px] border border-steel-200 bg-white p-5">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-steel-400">
            All time
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-ink">
            {stats.totalLeads}
          </p>
          <p className="mt-0.5 text-[0.8rem] text-steel-600">Total RFQs</p>
        </div>

        <div className="rounded-[2px] border border-steel-200 bg-white p-5">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-steel-400">
            Content
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-ink">
            {stats.blocks}
          </p>
          <p className="mt-0.5 text-[0.8rem] text-steel-600">Editable sections</p>
        </div>

        <Link
          href="/admin/media"
          className="group rounded-[2px] border border-steel-200 bg-white p-5 transition-colors hover:border-brand/40"
        >
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-steel-400">
            Library
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-ink">{stats.media}</p>
          <p className="mt-0.5 text-[0.8rem] text-steel-600">Images</p>
        </Link>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel
          className="lg:col-span-2"
          title="Latest RFQs"
          description={`${stats.totalLeads} total · ${stats.newLeads} awaiting review`}
          actions={
            <Button href="/admin/leads" variant="ghost" size="sm">
              View all
            </Button>
          }
          padded={false}
        >
          {recentLeads.length === 0 ? (
            <EmptyState
              className="m-5"
              icon={Inbox}
              title="No RFQs yet"
              description="Submissions from the website's RFQ form appear here the moment they arrive, with any uploaded drawing attached."
            />
          ) : (
            <ul className="divide-y divide-steel-100">
              {recentLeads.map((lead) => {
                const meta = statusMeta(lead.status);
                return (
                  <li key={lead.id}>
                    <Link
                      href={`/admin/leads#lead-${lead.id}`}
                      className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-steel-50"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-2 truncate text-[0.85rem] font-semibold text-ink">
                          {lead.details?.company || lead.name}
                          <Badge tone={meta.tone}>{meta.label}</Badge>
                        </p>
                        <p className="mt-0.5 truncate font-mono text-[0.72rem] text-steel-500">
                          {[lead.serviceNeeded, lead.details?.material, lead.details?.quantity]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      </div>
                      <span className="hidden shrink-0 font-mono text-[0.7rem] text-steel-400 sm:block">
                        {formatDateTime(lead.createdAt)}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>

        <div className="space-y-6">
          <Panel title="Content lists" padded={false}>
            <ul className="divide-y divide-steel-100">
              {COLLECTIONS.map((collection) => (
                <li key={collection.slug}>
                  <Link
                    href={`/admin/collections/${collection.slug}`}
                    className="group flex items-center gap-3 px-5 py-3 text-[0.85rem] text-steel-600 transition-colors hover:bg-steel-50 hover:text-ink"
                  >
                    <NavIcon
                      name={collection.icon}
                      className="h-4 w-4 shrink-0 text-steel-400 group-hover:text-brand"
                    />
                    <span className="flex-1">{collection.label}</span>
                    <span className="font-mono text-[0.72rem] text-steel-400">
                      {stats.collections?.[collection.slug] ?? 0}
                    </span>
                    <ArrowRight
                      className="h-3.5 w-3.5 text-steel-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Quick actions" padded={false}>
            <ul className="divide-y divide-steel-100">
              <li>
                <Link
                  href="/admin/content/hero"
                  className="group flex items-center gap-3 px-5 py-3 text-[0.85rem] text-steel-600 hover:bg-steel-50 hover:text-ink"
                >
                  <LayoutTemplate className="h-4 w-4 text-steel-400 group-hover:text-brand" strokeWidth={2} />
                  Edit the hero
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/settings"
                  className="group flex items-center gap-3 px-5 py-3 text-[0.85rem] text-steel-600 hover:bg-steel-50 hover:text-ink"
                >
                  <SettingsIcon className="h-4 w-4 text-steel-400 group-hover:text-brand" strokeWidth={2} />
                  Brand, contact, and SEO
                </Link>
              </li>
            </ul>
          </Panel>

          <Panel title="Recent changes" padded={false}>
            {activity.length === 0 ? (
              <p className="px-5 py-6 text-xs text-steel-400">Edits you make will be logged here.</p>
            ) : (
              <ul className="divide-y divide-steel-100">
                {activity.map((entry) => (
                  <li key={entry.id} className="px-5 py-3">
                    <p className="text-[0.82rem] text-steel-700">{entry.summary}</p>
                    <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[0.68rem] text-steel-400">
                      <CalendarClock className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                      {formatDateTime(entry.created_at)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </div>
    </>
  );
}
