import { toParagraphs } from "@/lib/utils";

/**
 * Renders a legal content block. The body is stored as one text field and split
 * on blank lines, so an admin edits it like a document instead of managing a
 * list of paragraph rows.
 */
export default function LegalDocument({ block }) {
  if (!block) return null;

  return (
    <>
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-brand">Document</p>
      <h1 className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">{block.heading}</h1>
      {block.updatedAt && (
        <p className="mt-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-steel-400">
          Revision date · {block.updatedAt}
        </p>
      )}
      <div className="mt-8 space-y-5 border-t border-steel-200 pt-8">
        {toParagraphs(block.body).map((paragraph) => (
          <p key={paragraph} className="leading-relaxed text-steel-600">
            {paragraph}
          </p>
        ))}
      </div>
    </>
  );
}
