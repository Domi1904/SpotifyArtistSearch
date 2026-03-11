Spotify Artist Search App
Full-Stack-Anwendung mit NestJS Backend (Spotify BFF) + React/TypeScript Frontend.


# 1. Root-Verzeichnis erstellen .env
    echo "SPOTIFY_CLIENT_ID=deine_id" >> .env
    echo "SPOTIFY_CLIENT_SECRET=dein_secret" >> .env


# 2. NPM install in beiden Verzeichnissen 

    npm install

spotify-bff -> Backend NestJS
spotify-frontend -> Frontend React/Vite

# 3. Docker compose ausführen 

    docker compose up --build

URLs:

Frontend: http://localhost:5173 <br>    
Backend: http://localhost:3000  <br>

Frontend (React/TS) ──POST/GET──> Backend (NestJS BFF) ──> Spotify Web API

