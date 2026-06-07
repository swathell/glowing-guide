export function hasEnvVars(names: string[]) {
  return names.every((name) => {
    const value = process.env[name];
    return typeof value === "string" && value.length > 0;
  });
}

export function missingEnvVars(names: string[]) {
  return names.filter((name) => {
    const value = process.env[name];
    return !(typeof value === "string" && value.length > 0);
  });
}
