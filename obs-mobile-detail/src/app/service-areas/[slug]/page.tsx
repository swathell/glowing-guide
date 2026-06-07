import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AreaTemplate } from "@/components/sections/area-template";
import { serviceAreas } from "@/data/areas";

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = serviceAreas.find((entry) => entry.slug === slug);
  if (!area) {
    return {};
  }

  return {
    title: `Mobile Car Detailing in ${area.name}`,
    description: `Professional mobile detailing in ${area.name} with interior, exterior, protection, and specialty services.`
  };
}

export default async function ServiceAreaPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = serviceAreas.find((entry) => entry.slug === slug);
  if (!area) {
    notFound();
  }

  return <AreaTemplate areaName={area.name} />;
}
