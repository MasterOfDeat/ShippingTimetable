export const ports: Record<string, string> = {
  CNSHA: "Шанхай",
  CNNGB: "Нинбо",
  NLRTM: "Роттердам",
};

export function getPortName(code: string) {
  return ports[code] ?? code;
}