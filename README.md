# Swell V2

Surf session tracker — rebuilt from the ground up.

## Live

[swell-beta.vercel.app](https://swell-beta.vercel.app)

## Stack

- React 18 + Vite
- React Router v6
- Open-Meteo Marine + Weather API (live swell and wind data)
- localStorage for session persistence (no backend yet)
- Syne + DM Sans + DM Mono via Google Fonts

## Setup

```bash
npm install
npm run dev
```

No new dependencies needed — same stack as V1.

## What changed from V1

- Bottom nav on mobile, sidebar on desktop (fully responsive)
- Live swell and wind data via Open-Meteo Marine + Weather API
- Conditions widget on home screen with spot dropdown
- Wave heights in feet, wind in knots, last-updated timestamp on conditions card
- Quality badge (Clean / Fair / Blown / Flat) calculated from real wave + wind data
- Spot selection tied to SPOTS data with lat/lng coordinates
- Session rating (1-5 stars) added to the log form
- Board selection dropdown with common options
- Home is a real dashboard — conditions widget, stat cards, recent sessions
- History has filter chips (All / This month / Best rated / Biggest waves)
- Session cards show all fields with color-coded pills
- Delete confirmation modal
- Progress page has streak calc, monthly bar chart, top spots bar chart
- Empty states throughout
- Syne for display type, DM Sans for body, DM Mono for numbers

## Design system

Gold `#C9A96E` owns brand moments — headings, CTAs, labels.
Blue `#38bdf8` owns data — wave heights, periods, wind speed, stats.

## File structure

```
src/
  App.jsx                  — routing + responsive nav (sidebar/bottom bar)
  main.jsx                 — entry point
  context/
    SessionContext.jsx     — session state + localStorage
  data/
    spots.js               — 10 surf spots with lat/lng
  pages/
    Home.jsx               — dashboard + live conditions
    LogSession.jsx         — session entry form
    History.jsx            — session list with filters
    Progress.jsx           — streak, stats, charts
  styles/
    global.css
    variables.css
index.html
```

## Coming up

- React Native conversion via Expo (App Store)
- User auth + cross-device sync (Clerk)
- Custom spot entry with map picker
- Session detail / edit view
- Water temperature from Open-Meteo Marine