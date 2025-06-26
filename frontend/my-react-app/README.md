# Space Explorer Web Application

This full-stack web application features:

- Astronomy Picture of the Day (APOD)
- Mars Rover Photos
- Earth Imagery (EPIC)(Coming Soon)
- Near Earth Objects tracking(Coming Soon)
- NASA Image Search(Coming Soon)

Built with **React** for the frontend and **Node.js/Express** for the backend, using NASA's public APIs.

**Deployment:**
- Backend: Deployed on [Render](https://render.com/) — [YOUR_RENDER_URL_HERE]
- Frontend: Deployed on [Vercel](https://vercel.com/) — [YOUR_VERCEL_URL_HERE]

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Features

- **Astronomy Picture of the Day:** You can view NASA's daily featured image with explanations.
- **Mars Rover Photos:** You can Browse images from Curiosity, Opportunity, Spirit, and Perseverance.
- **Earth Imagery:** Coming Soon
- **Near Earth Objects:** Coming Soon.
- **NASA Image Search:** Coming Soon.

---

## Project Structure

```
root/
  backend/         # Express backend server
  frontend/
    my-react-app/  # React frontend application
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Express](https://expressjs.com/en/4x/api.html)
- NASA API Key (free from https://api.nasa.gov/)

---

## Setup Instructions

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Create a `.env` file in the backend directory:**
   ```
   NASA_API_KEY=your_nasa_api_key_here
   PORT=3001
   NODE_ENV=development
   ```
   - Replace `nasa_api_key_here` with your actual NASA API key.
   - The default port is `3001`, but you can change it if needed.

4. **Start the backend server:**
   ```bash
   node server.js
   ```
   - The API will be available at `http://localhost:5001/api`.

---

### Frontend Setup

1. **Navigate to the frontend React app directory:**
   ```bash
   cd frontend/my-react-app
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Start the React development server:**
   ```bash
   yarn start
   # or
   npm start
   ```
   - The app will open at [http://localhost:3000](http://localhost:3000).
   - The frontend is configured to proxy API requests to the backend.

---

## Usage

- Open [http://localhost:3000](http://localhost:3000) in your browser.
- Explore the homepage for featured space content.
- Use the navigation to access APOD, Mars Rover, Earth Imagery, Near Earth Objects, and NASA Image Search.
- If you encounter errors loading data, ensure your backend server is running and your NASA API key is valid.

---

## Environment Variables

**Backend (`backend/.env`):**
- `NASA_API_KEY` (required): Your NASA API key.
- `PORT` (optional): Port for the backend server (default: 3001).
- `NODE_ENV` (optional): Set to `production` for production builds.

**Frontend:** No environment variables are required for local development. The proxy is set in `package.json`.

---

## Available Scripts

### Frontend

- `yarn start` / `npm start` — Start the React development server.
- `yarn build` / `npm run build` — Build the app for production.
- `yarn test` / `npm test` — Run tests.

### Backend

- `node server.js` — Start the backend server.

---

## Deployment

- **Backend:** Deployed on [Render](https://render.com/). [Live API: YOUR_RENDER_URL_HERE]
- **Frontend:** Deployed on [Vercel](https://vercel.com/). [Live App: YOUR_VERCEL_URL_HERE]
- For local production, build the frontend (`yarn build`), then serve the static files from the backend server.
- Set `NODE_ENV=production` in your backend `.env` file.
- The backend will serve the React build and handle API requests if you deploy both together.

---

## Troubleshooting

- **API errors:** Ensure your NASA API key is correct and not rate-limited.
- **CORS issues:** The backend handles CORS for local development.
- **Port conflicts:** Change the `PORT` in `.env` if needed.

---

## License

This project is for educational purposes and is not affiliated with or endorsed by NASA.
