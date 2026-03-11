import axios from 'axios';
import 'dotenv/config.js'; // Lädt .env

const API_BASE = 'http://localhost:3000/api/spotify';
const QUERY = 'metallica';
const LIMIT = 5;

async function testSpotifySearch() {
  try {
    console.log(`Teste Spotify Artist-Suche: "${QUERY}"...\n`);

    const response = await axios.get(`${API_BASE}/artists`, {
      params: { query: QUERY, limit: LIMIT },
    });

    console.log('SUCCESS!');
    console.log(`Gefundene Artists: ${response.data.length}`);
    console.log('\nErste 2 Artists:');
    response.data.slice(0, 2).forEach((artist, idx) => {
      console.log(`  ${idx + 1}. ${artist.name}`);
      console.log(`     Genres: ${artist.genres.join(', ') || 'keine'}`);
      console.log(`     Image: ${artist.imageUrl ? '✓' : '✗'}`);
      console.log(`     Popularity: ${artist.popularity ?? 'N/A'}`);
      console.log('');
    });
  } catch (error) {
    console.error('FEHLER!');
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error('Body:', error.response.data);
    } else {
      console.error('Fehlermeldung:', error.message);
    }
  }
}

testSpotifySearch();
