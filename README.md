# Swell V2

Surf session tracker — rebuilt from the ground up.

## Stack

- React 18 + Vite
- React Router v6
- localStorage for session persistence (no backend yet)
- Barlow Condensed + DM Sans + DM Mono via Google Fonts

## Setup

Drop these files into your existing Swell repo, replacing the old src/ contents.

```bash
npm install
npm run dev
```

No new dependencies needed — same stack as V1.

## What changed from V1

- Bottom nav on mobile, sidebar on desktop (fully responsive)
- Spot selection is now a dropdown tied to SPOTS data
- Session rating (1-5 stars) added to the log form
- Board selection is a dropdown with common options
- Home is a real dashboard — conditions widget, stat cards, recent sessions
- History has filter chips (All / This month / Best rated / Biggest waves)
- Session cards show all fields with color-coded pills
- Delete confirmation modal instead of instant delete
- Progress page has streak calc, monthly bar chart, top spots bar chart
- Empty states throughout — no blank screens
- Barlow Condensed for display type (replaces system fonts)
- DM Sans for body, DM Mono for numbers/data

## File structure

```
src/
  App.jsx                  — routing + responsive nav
  main.jsx                 — entry point
  context/
    SessionContext.jsx     — session state + localStorage
  data/
    spots.js               — surf spot list
  pages/
    Home.jsx
    LogSession.jsx
    History.jsx
    Progress.jsx
  styles/
    global.css
    variables.css
index.html
```

## Coming in V2.1

- Live swell data via Open-Meteo Marine API
- Custom spot entry
- Session detail view
- Export to CSV