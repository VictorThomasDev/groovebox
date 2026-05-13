const GENRES = [
  { label: 'Funk', count: 0, pct: 0, color: 'var(--primary)' },
  { label: 'Soul', count: 0, pct: 0, color: 'var(--tangerine)' },
  { label: 'Disco', count: 0, pct: 0, color: 'var(--mustard)' },
  { label: 'Jazz', count: 0, pct: 0, color: 'var(--lavender-deep)' },
  { label: 'Pop', count: 0, pct: 0, color: 'var(--teal)' },
];

const DECADES = ['60s', '70s', '80s', '90s', '00s'];

export function StatsPage() {
  return (
    <>
      <div className="section-head">
        <h1>Collec<em>tion</em><br /><u>Stats</u></h1>
        <div className="info">
          Insights about<br />your vinyl library
        </div>
      </div>

      <div className="stats-grid">
        {/* Records count */}
        <div className="stat-card big accent">
          <h3>Total Records</h3>
          <div className="num">
            0
            <small>Add records to see your stats grow</small>
          </div>
        </div>

        {/* Spend */}
        <div className="stat-card big">
          <h3>Total Invested</h3>
          <div className="num">
            €0
            <small>Average €0 / record</small>
          </div>
        </div>

        {/* Hours */}
        <div className="stat-card big accent2">
          <h3>Listening Time</h3>
          <div className="num">
            0h
            <small>Based on tracklist durations</small>
          </div>
        </div>

        {/* Genre bars */}
        <div className="stat-card wide">
          <h3>By Genre</h3>
          <div className="bar-row">
            {GENRES.map((g) => (
              <div key={g.label} className="row">
                <span className="label">{g.label}</span>
                <div className="bar">
                  <div style={{ width: `${g.pct}%`, background: g.color }} />
                </div>
                <span className="count">{g.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Condition bars */}
        <div className="stat-card med">
          <h3>By Condition</h3>
          <div className="bar-row">
            {[
              { label: 'MINT', cls: 'm', pct: 0, count: 0 },
              { label: 'NEAR MINT', cls: 'nm', pct: 0, count: 0 },
              { label: 'VG+', cls: 'vgp', pct: 0, count: 0 },
              { label: 'VG', cls: 'vg', pct: 0, count: 0 },
            ].map((c) => (
              <div key={c.label} className="row">
                <span className="label" style={{ fontSize: 12 }}>{c.label}</span>
                <div className="bar">
                  <div style={{ width: `${c.pct}%`, background: 'var(--ink)' }} />
                </div>
                <span className="count">{c.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top labels */}
        <div className="stat-card med">
          <h3>Top Labels</h3>
          <div style={{ marginTop: 8, color: 'var(--ink-faint)', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            No data yet
          </div>
        </div>

        {/* Decade grid */}
        <div className="stat-card full">
          <h3>By Decade</h3>
          <div className="decade-grid">
            {DECADES.map((d) => (
              <div key={d} className="decade">
                <div className="label">{d}</div>
                <div className="v">0</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
