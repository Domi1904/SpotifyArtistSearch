import axios from 'axios';
import type { Artist } from '../types/spotify';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/spotify';

export const spotifyApi = {
  searchArtists: async (query: string, limit = 10): Promise<Artist[]> => {
    const { data } = await axios.get<Artist[]>(`${API_BASE}/artists`, {
      params: { query, limit },
    });
    return data;
  },

  exportArtistsCsv: async (artists: Artist[]): Promise<void> => {
    const response = await axios.post(`${API_BASE}/artists/export`, 
      { artists }, 
      { responseType: 'blob' }  // ← WICHTIG für File-Download!
    );

    // Blob → Download
    const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const filename = `spotify-artists-${new Date().toISOString().slice(0,10)}.csv`;
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },
};
