import { ReactNode } from "react";
import { Container } from "@/components/ui/container";

export function PageHero({
  eyebrow,
  title,
  body,
  actions
}: {
  eyebrow: string;
  title: string;
  body: string;
  actions?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/8 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(184,98,47,0.16),transparent_34%),linear-gradient(115deg,transparent_0_54%,rgba(184,98,47,0.08)_54.1%_54.4%,transparent_54.5%_100%)]" />
      <Container className="relative">
        <div className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display-title mt-4 text-obs-fog">{title}</h1>
          <p className="copy-muted mt-6 max-w-2xl">{body}</p>
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </Container>
    </section>
  );
}
