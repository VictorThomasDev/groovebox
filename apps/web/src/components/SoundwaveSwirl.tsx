export function SoundwaveSwirl() {
  const w = 720, h = 720;
  const cx = 200, cy = 360;
  const radius = 280;
  const turns = 1.4;
  const count = 96;
  const bars: React.SVGProps<SVGLineElement>[] = [];

  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const angle = t * Math.PI * 2 * turns - Math.PI * 0.6;
    const r = radius * (0.55 + 0.45 * Math.sin(t * Math.PI * 1.4));
    const x = cx + Math.cos(angle) * r + t * 280;
    const y = cy + Math.sin(angle) * r;
    const dx = -Math.sin(angle) * r;
    const dy = Math.cos(angle) * r;
    const tlen = Math.hypot(dx, dy) || 1;
    const px = -dy / tlen;
    const py = dx / tlen;
    const barLen = 38 + 18 * Math.sin(t * Math.PI * 5);
    const half = barLen / 2;
    const isAccent = i % 9 === 0;
    bars.push(
      <line
        key={i}
        x1={x - px * half} y1={y - py * half}
        x2={x + px * half} y2={y + py * half}
        stroke={isAccent ? 'var(--lavender-deep)' : 'var(--lavender)'}
        strokeWidth={isAccent ? 7 : 6}
        strokeLinecap="round"
        opacity={0.95}
      />,
    );
  }

  return (
    <svg
      className="hero-wave"
      viewBox={`0 0 ${w} ${h}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {bars}
    </svg>
  );
}
