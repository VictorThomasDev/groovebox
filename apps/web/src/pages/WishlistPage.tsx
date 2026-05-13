export function WishlistPage() {
  return (
    <>
      <div className="section-head">
        <h1>Wish<em>list</em></h1>
        <div className="info">
          Records you want<br />to track down
        </div>
      </div>

      <div className="wishlist-grid">
        <div className="empty" style={{ padding: '60px 0', textAlign: 'left' }}>
          <div className="display" style={{ fontSize: 48 }}>
            Nothing yet
          </div>
          <p style={{ marginTop: 12, fontStyle: 'italic', color: 'var(--ink-soft)' }}>
            Search the Discogs catalogue on the home page and add records to your wishlist.
          </p>
        </div>
      </div>
    </>
  );
}
