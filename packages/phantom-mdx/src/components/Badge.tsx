import { BADGE_TONES } from "../schema.ts";

export function Badge({ label, tone }: { label: string; tone?: string }) {
  const resolved = (BADGE_TONES as readonly string[]).includes(tone ?? "") ? tone : "neutral";
  return <span className={`ph-badge ph-badge-${resolved}`}>{label}</span>;
}
