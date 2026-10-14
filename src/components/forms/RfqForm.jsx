"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  CircleCheck,
  CircleAlert,
  LoaderCircle,
  ArrowRight,
  Paperclip,
  ShieldAlert,
  X,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { submitRfq } from "@/lib/actions/rfq";
import { cn } from "@/lib/utils";

const CONTROL =
  "w-full rounded-[2px] border bg-white px-3 py-2.5 text-[0.9rem] text-ink transition-colors " +
  "placeholder:text-steel-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15";

function Field({ name, label, error, required, hint, className, children }) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="mb-1.5 flex items-baseline justify-between gap-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-steel-500"
      >
        <span>
          {label}
          {required && <span className="ml-1 text-brand">*</span>}
        </span>
        {hint && <span className="text-[0.66rem] normal-case tracking-normal text-steel-400">{hint}</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-[0.75rem] font-medium text-red-600">
          {Array.isArray(error) ? error[0] : error}
        </p>
      )}
    </div>
  );
}

function Text({ name, error, ...props }) {
  return (
    <input
      id={name}
      name={name}
      aria-invalid={error ? "true" : undefined}
      className={cn(CONTROL, error ? "border-red-300" : "border-steel-300")}
      {...props}
    />
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="xl" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <LoaderCircle className="h-4 w-4 animate-spin" strokeWidth={2.5} aria-hidden="true" />
          Submitting…
        </>
      ) : (
        <>
          Submit RFQ
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
        </>
      )}
    </Button>
  );
}

/**
 * RFQ form.
 *
 * Field order follows how a buyer assembles a quote request: who they are, what
 * the part is, then the commercial constraints. Errors return per-field from the
 * Server Action, so a rejected file never costs the visitor the twelve other
 * fields they filled in.
 *
 * The drawing input is deliberately last and visually separated by the
 * export-control notice — the intent is that nobody uploads controlled data
 * before reading it.
 */
export default function RfqForm({ serviceOptions = [], formNote, successMessage, exportNotice }) {
  const [state, formAction] = useActionState(submitRfq, undefined);
  const [fileName, setFileName] = useState("");
  const errors = state?.errors ?? {};

  if (state?.success) {
    return (
      <div
        role="status"
        className="flex flex-col items-center border border-brand/30 bg-brand-light px-6 py-16 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-[2px] bg-brand text-white">
          <CircleCheck className="h-7 w-7" strokeWidth={2} aria-hidden="true" />
        </span>
        <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-brand">
          RFQ Received
        </p>
        <p className="mt-3 max-w-md text-[0.92rem] leading-relaxed text-steel-700">
          {successMessage}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {/* Honeypot: off-screen rather than display:none, which some bots detect. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company_reference">Company reference</label>
        <input id="company_reference" name="company_reference" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="company" label="Company" required error={errors.company}>
          <Text name="company" error={errors.company} autoComplete="organization" placeholder="Acme Aerostructures" />
        </Field>
        <Field name="name" label="Contact name" required error={errors.name}>
          <Text name="name" error={errors.name} autoComplete="name" placeholder="J. Okafor" />
        </Field>
        <Field name="phone" label="Phone" required error={errors.phone}>
          <Text name="phone" type="tel" error={errors.phone} autoComplete="tel" placeholder="(316) 555-0184" />
        </Field>
        <Field name="email" label="Email" required error={errors.email}>
          <Text name="email" type="email" error={errors.email} autoComplete="email" placeholder="buyer@company.com" />
        </Field>
        <Field name="industry" label="Industry" error={errors.industry}>
          <Text name="industry" error={errors.industry} placeholder="Commercial aerospace" />
        </Field>
        <Field name="serviceNeeded" label="Service required" required error={errors.serviceNeeded}>
          <select
            id="serviceNeeded"
            name="serviceNeeded"
            defaultValue=""
            aria-invalid={errors.serviceNeeded ? "true" : undefined}
            className={cn(CONTROL, errors.serviceNeeded ? "border-red-300" : "border-steel-300")}
          >
            <option value="" disabled>
              Select…
            </option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        name="description"
        label="Part / project description"
        required
        error={errors.description}
        hint="Geometry, function, revision level"
      >
        <textarea
          id="description"
          name="description"
          rows={4}
          aria-invalid={errors.description ? "true" : undefined}
          placeholder="Machined bracket, 6 features to ±0.001 in, revision C. Currently sourced offshore; seeking a domestic second source."
          className={cn(CONTROL, "leading-relaxed", errors.description ? "border-red-300" : "border-steel-300")}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Field name="material" label="Material" error={errors.material}>
          <Text name="material" error={errors.material} placeholder="Ti-6Al-4V" />
        </Field>
        <Field name="quantity" label="Quantity / EAU" error={errors.quantity}>
          <Text name="quantity" error={errors.quantity} placeholder="250 / yr" />
        </Field>
        <Field name="tolerance" label="Tightest tolerance" error={errors.tolerance}>
          <Text name="tolerance" error={errors.tolerance} placeholder="±0.0005 in" />
        </Field>
        <Field name="timeline" label="Required date" error={errors.timeline}>
          <Text name="timeline" error={errors.timeline} placeholder="Q3 2026" />
        </Field>
      </div>

      {/* Export-control notice — deliberately impossible to miss. */}
      {exportNotice && (
        <div className="flex gap-3 border-l-2 border-accent bg-steel-50 p-4">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={2} aria-hidden="true" />
          <div>
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-accent-dark">
              Export control
            </p>
            <p className="mt-1.5 text-[0.82rem] leading-relaxed text-steel-700">{exportNotice}</p>
          </div>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          name="drawing"
          label="Drawing package"
          error={errors.drawing}
          hint="PDF, STEP, DXF, ZIP · max 25MB"
        >
          <label
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-[2px] border border-dashed px-3 py-2.5 transition-colors",
              errors.drawing
                ? "border-red-300 bg-red-50/40"
                : "border-steel-300 bg-steel-50 hover:border-brand hover:bg-brand-light/40",
            )}
          >
            <Paperclip className="h-4 w-4 shrink-0 text-steel-500" strokeWidth={2} aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate font-mono text-[0.78rem] text-steel-600">
              {fileName || "Attach a file…"}
            </span>
            {fileName && (
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  setFileName("");
                  const input = document.getElementById("drawing");
                  if (input) input.value = "";
                }}
                aria-label="Remove attachment"
                className="text-steel-400 hover:text-red-600"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2.5} />
              </button>
            )}
            <input
              id="drawing"
              name="drawing"
              type="file"
              className="hidden"
              onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
            />
          </label>
        </Field>

        <Field name="notes" label="Additional notes" error={errors.notes}>
          <Text name="notes" error={errors.notes} placeholder="Certifications required, packaging, delivery terms" />
        </Field>
      </div>

      <label className="flex cursor-pointer items-start gap-3 border border-steel-200 bg-white p-3.5">
        <input
          type="checkbox"
          name="ndaRequired"
          className="mt-0.5 h-4 w-4 shrink-0 rounded-[2px] border-steel-300 text-brand focus:ring-brand/30"
        />
        <span className="text-[0.85rem] leading-relaxed text-steel-700">
          <span className="font-semibold text-ink">An NDA is required before I send drawings.</span>{" "}
          We will send one for signature before you upload anything controlled.
        </span>
      </label>

      {state?.error && (
        <p className="flex items-start gap-2 border border-red-200 bg-red-50 px-4 py-3 text-[0.85rem] text-red-700">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
          {state.error}
        </p>
      )}

      <div className="flex flex-col gap-4 border-t border-steel-200 pt-5 sm:flex-row sm:items-center">
        <SubmitButton />
        {formNote && (
          <p className="text-[0.75rem] leading-relaxed text-steel-500">{formNote}</p>
        )}
      </div>
    </form>
  );
}
