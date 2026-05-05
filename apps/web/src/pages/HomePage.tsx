import { useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';
import { Spinner } from '../components/Spinner';

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

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square rounded-xl bg-gray-800 animate-pulse"
          style={{ animationDelay: `${i * 40}ms` }}
        />
      ))}
    </div>
  );
}

function AlbumCard({
  album,
  index,
  onClick,
}: {
  album: SearchResult;
  index: number;
  onClick: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <button
      onClick={onClick}
      className="group relative aspect-square rounded-xl overflow-hidden animate-fade-up text-left w-full"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {!imgError && album.cover_image ? (
        <>
          {!loaded && <div className="absolute inset-0 bg-gray-800 animate-pulse" />}
          <img
            src={album.cover_image}
            alt={album.title}
            onLoad={() => setLoaded(true)}
            onError={() => setImgError(true)}
            className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </>
      ) : (
        <div className="h-full w-full bg-gray-800 flex items-center justify-center">
          <svg className="w-10 h-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
        <p className="text-sm font-semibold leading-tight line-clamp-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          {album.title}
        </p>
        {album.year && (
          <p className="text-xs text-gray-400 mt-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
            {album.year}
          </p>
        )}
      </div>
    </button>
  );
}

interface ItunesResult {
  previewUrl: string;
  trackName: string;
  artistName: string;
  collectionName: string;
}

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function useItunesPreview(artist: string, albumTitle: string, enabled: boolean) {
  return useQuery({
    queryKey: ['itunes-preview', artist, albumTitle],
    queryFn: async () => {
      const term = `${artist} ${albumTitle}`;
      const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&entity=song&limit=25`;
      const res = await fetch(url);
      const data = await res.json() as { results: ItunesResult[] };
      const withPreview = data.results.filter((r) => r.previewUrl);
      if (!withPreview.length) throw new Error('No preview found');

      const albumNorm = normalize(albumTitle);
      // prefer tracks whose collectionName matches the album
      const fromAlbum = withPreview.find((r) =>
        normalize(r.collectionName).includes(albumNorm) ||
        albumNorm.includes(normalize(r.collectionName)),
      );
      return fromAlbum ?? withPreview[0];
    },
    enabled,
    staleTime: 1000 * 60 * 10,
    retry: false,
  });
}

function AudioPreview({ artist, albumTitle }: { artist: string; albumTitle: string }) {
  const { data, isLoading, isError } = useItunesPreview(artist, albumTitle, true);

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 rounded-xl bg-gray-800 px-4 py-3 animate-pulse">
        <Spinner size="sm" />
        <span className="text-sm text-gray-400">Loading preview…</span>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <p className="text-sm text-gray-500 text-center py-2">No preview available for this album.</p>
    );
  }

  return (
    <div className="rounded-xl bg-gray-800 px-4 py-3 space-y-1 animate-fade-up">
      <p className="text-xs text-gray-400 truncate">
        <span className="text-orange-400">{data.trackName}</span> — {data.artistName}
      </p>
      <audio
        src={data.previewUrl}
        controls
        autoPlay
        className="w-full h-8"
      />
    </div>
  );
}

function AlbumModal({ id, onClose }: { id: number; onClose: () => void }) {
  const { data, isLoading } = useReleaseDetail(id);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const cover = data?.images?.find((i) => i.type === 'primary')?.uri ?? data?.images?.[0]?.uri;
  const artist = data?.artists?.map((a) => a.name).join(', ');
  const format = data?.formats?.map((f) => [f.name, ...(f.descriptions ?? [])].join(' ')).join(', ');
  const albumTitle = data?.title ?? '';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-up"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-gray-800 p-2 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : data ? (
          <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="shrink-0 mx-auto sm:mx-0">
                <button
                  onClick={() => setPlaying(true)}
                  className="group relative w-48 h-48 rounded-xl overflow-hidden shadow-lg focus:outline-none"
                  title="Play preview"
                >
                  {cover ? (
                    <img src={cover} alt={data.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  ) : (
                    <div className="h-full w-full bg-gray-800 flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="rounded-full bg-white/90 p-3 shadow-lg">
                      <svg className="w-8 h-8 text-gray-900 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>

              <div className="flex-1 min-w-0 space-y-4">
                <div>
                  <h2 className="text-xl font-bold leading-tight">{data.title}</h2>
                  {artist && <p className="text-orange-400 font-medium mt-1">{artist}</p>}
                  <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-400">
                    {data.year && <span>{data.year}</span>}
                    {data.labels?.[0] && <span>· {data.labels[0].name}</span>}
                    {format && <span>· {format}</span>}
                  </div>
                </div>

                {(data.genres?.length > 0 || data.styles?.length > 0) && (
                  <div className="flex flex-wrap gap-1.5">
                    {[...data.genres, ...data.styles].map((tag) => (
                      <span key={tag} className="rounded-full bg-gray-800 px-2.5 py-0.5 text-xs text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {data.tracklist?.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Tracklist</h3>
                    <ol className="space-y-1">
                      {data.tracklist.map((track, i) => (
                        <li key={i} className="flex justify-between gap-2 text-sm py-1 border-b border-gray-800 last:border-0">
                          <span className="flex gap-2 min-w-0">
                            <span className="text-gray-600 w-6 shrink-0">{track.position || i + 1}</span>
                            <span className="truncate">{track.title}</span>
                          </span>
                          {track.duration && <span className="text-gray-500 shrink-0">{track.duration}</span>}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>

            {playing && <AudioPreview artist={artist ?? ''} albumTitle={albumTitle} />}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function HomePage() {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data, isFetching, isError } = useDiscogsSearch(query);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInput(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setQuery(value.trim()), 400);
  }

  return (
    <div className="space-y-8">
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Search vinyl records, artists…"
          className="w-full rounded-xl bg-gray-900 px-4 py-3 pr-10 text-white placeholder-gray-500 outline-none ring-1 ring-gray-700 focus:ring-orange-400 transition-all"
        />
        {isFetching && (
          <Spinner size="sm" className="absolute right-3 top-1/2 -translate-y-1/2" />
        )}
      </div>

      {isError && <p className="text-red-400 text-sm">Search failed. Try again.</p>}

      {data && !isFetching && (
        <p className="text-gray-500 text-sm">{data.pagination.items.toLocaleString()} results</p>
      )}

      {isFetching && <SkeletonGrid />}

      {!isFetching && data?.results && (
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
          {data.results.map((album, i) => (
            <AlbumCard
              key={album.id}
              album={album}
              index={i}
              onClick={() => setSelectedId(album.id)}
            />
          ))}
        </div>
      )}

      {!query && !data && !isFetching && (
        <p className="text-gray-600 text-center py-20">Search for a vinyl record to get started.</p>
      )}

      {selectedId !== null && (
        <AlbumModal id={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
}
