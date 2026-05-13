export function Marquee() {
  const block = (
    <span>
      <span><span className="star" aria-hidden="true" /> NEW IN <span className="dot" aria-hidden="true" /></span>
      <span>SOUL <i>·</i> DISCO <i>·</i> FUNK <span className="dot" aria-hidden="true" /></span>
      <span>DROP THE NEEDLE <span className="star" aria-hidden="true" /></span>
      <span><u>GROOVE</u>BOX <span className="dot" aria-hidden="true" /></span>
    </span>
  );
  return (
    <div className="marquee">
      <div className="marquee-track">
        {block}{block}
      </div>
    </div>
  );
}
