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
    <section className="border-b border-white/8 py-20 md:py-28">
      <Container>
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
