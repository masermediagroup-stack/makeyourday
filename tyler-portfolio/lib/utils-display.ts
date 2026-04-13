export function getInitials(text: string, max = 3): string {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, max)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, max);
}
