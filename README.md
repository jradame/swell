# SWELL
# Swell – Surf Session Tracker

Swell is a simple surf session tracker that lets you log spots, conditions, and notes, then see your sessions over time. It’s designed as a focused, dark-mode web app that could evolve into a native experience. [web:324][web:329]

## Features

- Log sessions with spot, date, wave height, duration, board, and notes. [web:329]
- View a history of past sessions as clean, dark navy cards. [web:329]
- See progress over time with:
  - Sessions per month bar chart
  - Total wave height logged line chart [web:296]
- Consistent dark UI, card styling, and minimal footer across pages. [web:329][web:332]

## Tech Stack

- React (Vite) [web:324]
- React Router for client-side routing [web:324]
- Context API for session state
- Recharts for data visualization [web:296][web:300]
- CSS Modules for component-scoped styling

## Project Goals

- Practice designing and building a small, opinionated product from scratch, from HiFi wireframes to live UI. [web:324][web:326]
- Demonstrate end-to-end thinking suitable for a junior frontend / UI-focused portfolio. [web:324][web:327]
- Create a base that could later plug into live surf data and potentially ship as a native app. [web:329][web:335]

## App Structure

- `Home` – Intro hero, quick stats, and spot conditions widget (design intent). [web:332]
- `Log Session` – Form to capture spot, date, wave height, duration, board, and notes.
- `History` – Session list rendered as cards with key stats and notes.
- `Progress` – Charts aggregating sessions by month to show trends over time. [web:296]
- `Navbar` / `Footer` – Shared shell for navigation and a minimal app footer.

Sessions are stored in a shared `SessionContext`, and pages read/write from that context instead of passing props deeply.

## Running Locally

1. Clone the repo.
2. Install dependencies:

```bash
npm install

Start the dev server:
npm run dev

Open the local URL printed in your terminal (usually http://localhost:5173). [web:313]

Scripts
npm run dev – Start the Vite dev server.

npm run build – Create a production build.

npm run preview – Preview the production build locally. [web:324]

Possible Next Steps
Persist sessions with localStorage or a simple backend so data survives refreshes. [web:325]

Integrate a surf conditions API to attach real swell data to each session. [web:335]

Add authentication and multi-user support.

Explore a native version using React Native or Expo with the same visual system. [web:329]

License
This project is for personal portfolio and learning purposes. 