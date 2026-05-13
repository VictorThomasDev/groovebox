export function CollectionPage() {
  return (
    <>
      <div className="section-head">
        <h1>My<br /><em>Collection</em></h1>
        <div className="info">
          <b>0</b> records<br />
          Connect your library<br />to populate the grid
        </div>
      </div>

      <div className="search-wrap">
        <div className="search">
          <div className="search-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
          </div>
          <input placeholder="Search your collection — artist, album, tag, label…" disabled />
          <div className="count">0 / 0</div>
        </div>
      </div>

      <div className="filter-row">
        <div className="filter-group">
          <span className="filter-group-label">Genre</span>
          {['All', 'Funk', 'Soul', 'Disco', 'Jazz', 'Pop'].map((g) => (
            <button key={g} className={`chip${g === 'All' ? ' on' : ''}`}>{g}</button>
          ))}
        </div>
        <div className="filter-group">
          <span className="filter-group-label">Condition</span>
          {['All', 'MINT', 'NM', 'VG+', 'VG'].map((c) => (
            <button key={c} className={`chip${c === 'All' ? ' on' : ''}`}>{c}</button>
          ))}
        </div>
        <div className="sort">
          Sort
          <select disabled>
            <option>Artist A–Z</option>
            <option>Year (newest)</option>
            <option>Price</option>
          </select>
        </div>
      </div>

      <div className="empty" style={{ borderLeft: '1px solid var(--ink)', maxWidth: 'none', padding: '80px 40px' }}>
        <div className="display">Your vinyl<br />lives here</div>
        <p style={{ marginTop: 16 }}>Add records to your collection to see them displayed here.</p>
      </div>
    </>
  );
}
