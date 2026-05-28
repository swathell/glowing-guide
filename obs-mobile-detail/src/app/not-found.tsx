import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="py-32">
      <Container>
        <p className="eyebrow">404</p>
        <h1 className="display-title mt-4 text-obs-fog">That page is not in the shell yet.</h1>
        <p className="copy-muted mt-6 max-w-xl">
          The routing structure is in place, but this path does not currently map to a built page.
        </p>
        <Link href="/" className="button-primary mt-8">
          Back to home
        </Link>
      </Container>
    </section>
  );
}
