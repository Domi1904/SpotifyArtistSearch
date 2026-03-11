import { useState, useCallback } from 'react';
import './index.css';
import type { Artist } from './types/spotify';
import { spotifyApi } from './api/spotifyApi';
import { SearchInput } from './components/SearchInput';
import { EmptyState } from './components/EmptyState';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    if (artists.length === 0) {
      alert('Keine Artists zum Exportieren!');
      return;
    }
    await spotifyApi.exportArtistsCsv(artists);
  };

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setArtists([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const result = await spotifyApi.searchArtists(query, 10);
      setArtists(result);
    } catch (err: any) {
      setError('Suche fehlgeschlagen. Bitte versuche es erneut.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="app-container">
      <h1>Spotify Artist Suche</h1>
      
      <SearchInput onSearch={handleSearch} />

      {loading && <LoadingSpinner />}
      {error && (
        <div className="error">
          <p>{error}</p>
          <button 
            className="retry-btn"
            style={{
              background: '#a855f7',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
            onClick={() => handleSearch(artists[0]?.name)}
          >
            Erneut versuchen
          </button>
        </div>
      )}
      
      {!loading && !error && artists.length === 0 && <EmptyState />}
      
      {!loading && !error && artists.length > 0 && (
        <>
          <div style={{ 
            textAlign: 'center', 
            margin: '2rem 0', 
            padding: '1rem'
          }}>
            <button
              onClick={handleExport}
              disabled={loading}
              style={{
                background: '#a855f7',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(168, 85, 247, 0.4)'
              }}
              onMouseOver={(e) => {
                (e.target as HTMLButtonElement).style.background = '#9333ea';
                (e.target as HTMLButtonElement).style.transform = 'translateY(4px)';
              }}
              onMouseOut={(e) => {
                (e.target as HTMLButtonElement).style.background = '#a855f7';
                (e.target as HTMLButtonElement).style.transform = 'none';
              }}
            >
              Artists als CSV exportieren
            </button>
          </div>
        <div className="artists-grid">
          {artists.map((artist) => (
            <div key={artist.id} className="artist-card">
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div 
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '12px',
                    background: artist.imageUrl ? 'none' : 'linear-gradient(45deg, #a855f7, #ec4899)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.8)'
                  }}
                >
                  {artist.imageUrl ? (
                    <img 
                      src={artist.imageUrl} 
                      alt={artist.name} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        borderRadius: '12px' 
                      }} 
                    />
                  ) : (
                    'No Image'
                  )}
                </div>
                
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 'bold', 
                    margin: '0 0 0.5rem 0',
                    color: 'white'
                  }}>
                    {artist.name}
                  </h3>
                  
                  <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                    {artist.genres.length > 0 && (
                      <p style={{ margin: '0.25rem 0' }}>
                        Genres: {artist.genres.slice(0, 3).join(', ')}
                      </p>
                    )}
                    {artist.popularity !== null && (
                      <p style={{ margin: '0.25rem 0' }}>
                        Popularity: {artist.popularity}/100
                      </p>
                    )}
                    {artist.followers && (
                      <p style={{ margin: '0.25rem 0' }}>
                        Followers: {artist.followers.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </>
      )}
    </div>
  );
}

export default App;
