import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';
import { Spinner } from '../components/Spinner';
import { SoundwaveSwirl } from '../components/SoundwaveSwirl';
import { normalize } from '../utils/string';

/* ── Types ────────────────────────────────────────────────── */
interface SearchResult {
  id: number;
  title: string;
  cover_image: string;
  year: string;
  label: string[];
}
interface SearchResponse {
  results: SearchResult[];
  pagination: { items: number };
}
interface Track {
  position: string;
  title: string;
  duration: string;
}
interface ReleaseDetail {
  id: number;
  title: string;
  artists: { name: string }[];
  labels: { name: string; catno: string }[];
  year: number;
  formats: { name: string; descriptions: string[] }[];
  images: { uri: string; type: string }[];
  tracklist: Track[];
  genres: string[];
  styles: string[];
}
interface ItunesResult {
  previewUrl: string;
  trackName: string;
  artistName: string;
  collectionName: string;
}

/* ── Hooks ─────────────────────────────────────────────────── */
function useDiscogsSearch(query: string) {
  return useQuery({
    queryKey: ['discogs-search', query],
    queryFn: () =>
      api.get<SearchResponse>(
        `/api/discogs/search?q=${encodeURIComponent(query)}&type=release&format=Vinyl`,
      ),
    enabled: query.length > 1,
    staleTime: 1000 * 60 * 5,
  });
}

function useReleaseDetail(id: number | null) {
  return useQuery({
    queryKey: ['discogs-release', id],
    queryFn: () => api.get<ReleaseDetail>(`/api/discogs/release/${id}`),
    enabled: id !== null,
    staleTime: 1000 * 60 * 10,
  });
}

function useItunesPreview(artist: string, albumTitle: string, enabled: boolean) {
  return useQuery({
    queryKey: ['itunes-preview', artist, albumTitle],
    queryFn: async () => {
      const url = `https://itunes.apple.com/search?term=${encodeURIComponent(`${artist} ${albumTitle}`)}&media=music&entity=song&limit=25`;
      const res = await fetch(url);
      const data = (await res.json()) as { results: ItunesResult[] };
      const withPreview = data.results.filter((r) => r.previewUrl);
      if (!withPreview.length) throw new Error('No preview found');
      const albumNorm = normalize(albumTitle);
      return (
        withPreview.find(
          (r) =>
            normalize(r.collectionName).includes(albumNorm) ||
            albumNorm.includes(normalize(r.collectionName)),
        ) ?? withPreview[0]
      );
    },
    enabled,
    staleTime: 1000 * 60 * 10,
    retry: false,
  });
}

/* ── SearchIcon ─────────────────────────────────────────────── */
function SearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>
  );
}

/* ── AlbumSleeve — cover art + vinyl disc ───────────────────── */
function AlbumSleeve({ coverImage, title }: { coverImage?: string; title: string }) {
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState(false);
  return (
    <div className="sleeve">
      <div className="vinyl" />
      <div className="sleeve-art">
        {!err && coverImage ? (
          <>
            {!loaded && <div style={{ position: 'absolute', inset: 0, background: 'var(--ink)' }} />}
            <img
              src={coverImage}
              alt={title}
              onLoad={() => setLoaded(true)}
              onError={() => setErr(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: loaded ? 'block' : 'none' }}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}

/* ── AudioPreview ───────────────────────────────────────────── */
function AudioPreview({ artist, albumTitle }: { artist: string; albumTitle: string }) {
  const { data, isLoading, isError } = useItunesPreview(artist, albumTitle, true);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  function toggle() {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play(); setPlaying(true); }
  }

  if (isLoading) {
    return (
      <div className="preview-bar">
        <Spinner size="sm" />
        <span className="pmeta">Loading preview…</span>
      </div>
    );
  }
  if (isError || !data) {
    return (
      <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-faint)', marginTop: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        No preview available
      </p>
    );
  }
  return (
    <div className="preview-bar">
      <button className="play" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
        {playing ? '⏸' : '▶'}
      </button>
      <div className="pmeta">
        <b>{data.trackName}</b>
        {data.artistName}
      </div>
      {playing && (
        <div className="wave" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} style={{ animationDelay: `${i * 80}ms` }} />
          ))}
        </div>
      )}
      <audio ref={audioRef} src={data.previewUrl} onEnded={() => setPlaying(false)} />
    </div>
  );
}

/* ── Detail Modal ───────────────────────────────────────────── */
function DetailModal({ id, onClose }: { id: number; onClose: () => void }) {
  const { data, isLoading } = useReleaseDetail(id);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const cover = data?.images?.find((i) => i.type === 'primary')?.uri ?? data?.images?.[0]?.uri;
  const artist = data?.artists?.map((a) => a.name).join(', ') ?? '';
  const format = data?.formats?.map((f) => [f.name, ...(f.descriptions ?? [])].join(' ')).join(', ');

  return (
    <div className={`detail-mask open`} onClick={onClose}>
      <div className="detail" onClick={(e) => e.stopPropagation()}>
        <button className="detail-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        </button>

        {isLoading ? (
          <div style={{ gridColumn: '1/-1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 80 }}>
            <Spinner size="lg" />
          </div>
        ) : data ? (
          <>
            <div className="left">
              <div className="sleeve-lg">
                {cover
                  ? <img src={cover} alt={data.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ width: '100%', height: '100%', background: 'var(--ink)' }} />
                }
              </div>
              <h2>{data.title}</h2>
              {artist && <div className="sub">{artist}</div>}
              <div className="row">
                {data.year && <div><b>{data.year}</b>Year</div>}
                {data.labels?.[0] && <div><b>{data.labels[0].name}</b>Label</div>}
                {format && <div style={{ gridColumn: 'span 2' }}><b>{format}</b>Format</div>}
              </div>

              {!showPreview ? (
                <button
                  className="btn btn-primary"
                  style={{ marginTop: 20, width: '100%' }}
                  onClick={() => setShowPreview(true)}
                >
                  ▶ Drop the needle
                </button>
              ) : (
                <AudioPreview artist={artist} albumTitle={data.title} />
              )}
            </div>

            <div className="right">
              {(data.genres?.length > 0 || data.styles?.length > 0) && (
                <div className="tags">
                  {[...data.genres, ...data.styles].map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              )}

              {data.tracklist?.length > 0 && (
                <div className="tracklist">
                  <h4>Tracklist</h4>
                  <ol>
                    {data.tracklist.map((track, i) => (
                      <li key={i}>
                        <span className="pos">{track.position || i + 1}</span>
                        <span>{track.title}</span>
                        {track.duration && <span className="dur">{track.duration}</span>}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

/* ── HomePage ───────────────────────────────────────────────── */
export function HomePage() {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const { data, isFetching, isError } = useDiscogsSearch(query);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInput(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.trim().length > 1) {
      debounceRef.current = setTimeout(() => setQuery(value.trim()), 400);
    } else {
      setQuery('');
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <SoundwaveSwirl />
        <h1>
          Spin the whole<br />
          <em>collection.</em>
        </h1>
      </section>

      {/* Search */}
      <div className="search-wrap">
        <div className="search">
          <div className="search-icon"><SearchIcon /></div>
          <input
            ref={inputRef}
            placeholder="Search Discogs — artist, album, year…"
            value={input}
            onChange={handleChange}
          />
          {input ? (
            <div className="count">
              {isFetching ? 'searching…' : `${(data?.pagination.items ?? 0).toLocaleString()} results`}
            </div>
          ) : (
            <div className="kbds">
              <span className="kbd">/</span>
              <span className="kbd">⌘K</span>
            </div>
          )}
          {input && (
            <button className="clear" onClick={() => { setInput(''); setQuery(''); }} aria-label="Clear">×</button>
          )}
        </div>
      </div>

      <div className="api-hint">
        GET /api/discogs/search?q={input || '…'}&amp;type=release&amp;format=Vinyl
      </div>

      {isError && (
        <div className="api-hint" style={{ color: 'var(--primary)', marginTop: 8 }}>
          Search failed — check API connection
        </div>
      )}

      {/* Empty state */}
      {!query && !isFetching && (
        <div className="home-hint">
          <div>
            <h2>Search the<br /><em>Discogs</em> catalogue.</h2>
            <p>
              Type an artist, album or year above. Click any release to
              see full details and play a 30-second audio preview via iTunes.
            </p>
          </div>
          <div className="badge">
            <div className="lab">Try a query</div>
            <b>Radiohead</b>
            <b>Miles Davis</b>
            <b>1979</b>
          </div>
        </div>
      )}

      {/* Skeleton */}
      {isFetching && (
        <div className="results-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="skeleton" style={{ animationDelay: `${i * 40}ms` }} />
          ))}
        </div>
      )}

      {/* Results */}
      {!isFetching && data?.results && data.results.length > 0 && (
        <div className="results-grid">
          {data.results.map((album, i) => (
            <div
              key={album.id}
              className="card fade-up"
              style={{ animationDelay: `${i * 40}ms` }}
              onClick={() => setSelectedId(album.id)}
            >
              <AlbumSleeve coverImage={album.cover_image} title={album.title} />
              <div className="meta">
                <div className="artist">{album.title.split(' - ')[0]}</div>
                <div className="album">{album.title.split(' - ').slice(1).join(' - ') || album.title}</div>
                <div className="year">{album.year}{album.label?.[0] ? ` · ${album.label[0]}` : ''}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isFetching && query && data?.results?.length === 0 && (
        <div className="empty">
          <div className="display">Nothing for "<span className="key">{query}</span>"</div>
          <p>Try a different spelling or year.</p>
        </div>
      )}

      {selectedId !== null && (
        <DetailModal id={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </>
  );
}
