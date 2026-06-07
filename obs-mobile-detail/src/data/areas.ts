export const serviceAreas = [
  "toronto",
  "mississauga",
  "brampton",
  "vaughan",
  "markham",
  "oakville"
].map((slug) => ({
  slug,
  name: slug.replace("-", " ").replace(/\b\w/g, (m) => m.toUpperCase())
}));
