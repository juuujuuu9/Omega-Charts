/**
 * Deterministic sparklines for the indicator cards.
 * Illustrative, not market data. Seeded so the markup stays stable across builds.
 */

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Small monotonic-ish sparkline for the indicator cards. */
export function buildSparkline(seed: number, count = 28): number[] {
  const rand = mulberry32(seed);
  const out: number[] = [];
  let v = 0.5;
  for (let i = 0; i < count; i++) {
    v += (rand() - 0.42) * 0.16;
    v = Math.min(1, Math.max(0, v));
    out.push(v);
  }
  return out;
}

/** Turn a 0..1 series into an SVG polyline `points` string. */
export function sparkPoints(values: number[], width: number, height: number, pad = 2): string {
  const step = width / (values.length - 1);
  return values
    .map((v, i) => `${(i * step).toFixed(2)},${(pad + (1 - v) * (height - pad * 2)).toFixed(2)}`)
    .join(' ');
}
