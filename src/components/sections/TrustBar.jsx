import Container from "@/components/ui/Container";

/**
 * Scrolling band of approvals directly under the hero.
 *
 * The track holds the list twice and translates -50%, so the loop is seamless
 * with no JavaScript. The animation stops entirely under prefers-reduced-motion
 * while the text stays readable — the content is never motion-dependent.
 */
export default function TrustBar({ trustBar }) {
  const items = trustBar?.items ?? [];
  if (items.length === 0) return null;

  return (
    <section aria-label="Certifications and approvals" className="border-b border-steel-200 bg-white py-8">
      <Container>
        {trustBar.heading && (
          <p className="mb-6 text-center font-mono text-[0.68rem] uppercase tracking-[0.2em] text-steel-400">
            {trustBar.heading}
          </p>
        )}

        <div className="marquee-mask flex overflow-hidden">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1 ? "true" : undefined}
              className="marquee-track flex shrink-0 items-center"
            >
              {items.map((item) => (
                <li
                  key={`${copy}-${item}`}
                  className="flex items-center gap-6 pr-6 sm:gap-10 sm:pr-10"
                >
                  <span className="font-mono text-[0.8rem] font-medium uppercase tracking-[0.1em] text-steel-600 sm:text-[0.88rem]">
                    {item}
                  </span>
                  <span aria-hidden="true" className="h-3.5 w-px bg-steel-300" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </Container>
    </section>
  );
}
