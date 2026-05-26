import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceTemplate } from "@/components/sections/service-template";
import { serviceCategories } from "@/data/services";

export function generateStaticParams() {
  return serviceCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = serviceCategories.find((entry) => entry.slug === categorySlug);
  if (!category) {
    return {};
  }

  return {
    title: category.name,
    description: category.intro
  };
}

export default async function ServiceCategoryPage({
  params
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = serviceCategories.find((entry) => entry.slug === categorySlug);
  if (!category) {
    notFound();
  }

  return <ServiceTemplate category={category} />;
}
