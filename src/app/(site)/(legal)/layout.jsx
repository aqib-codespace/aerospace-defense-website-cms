import Container from "@/components/ui/Container";

/** Shared reading frame for the privacy and terms pages. */
export default function LegalLayout({ children }) {
  return (
    <div className="border-b border-slate-200 bg-slate-50/60 py-16 sm:py-20">
      <Container size="narrow">
        <article className="rounded-[2px] border border-steel-200 bg-white p-7 shadow-panel sm:p-12">
          {children}
        </article>
      </Container>
    </div>
  );
}
