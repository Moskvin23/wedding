# Wedding Invitation — Pavlo & Alona

A single-page wedding invitation built from a custom Figma design. Responsive layout, scroll-driven animations, and an RSVP form that saves responses to Google Sheets.

<p align="center">
  <a href="https://wedding-invitation-p-a.netlify.app/"><strong>View live site →</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white" alt="Vite 5" />
  <img src="https://img.shields.io/badge/CSS-Custom-1572B6?logo=css3&logoColor=white" alt="CSS" />
  <img src="https://img.shields.io/badge/Deploy-Netlify-00C7B7?logo=netlify&logoColor=white" alt="Netlify" />
</p>

---

## Links

| | |
|---|---|
| **Live demo** | [wedding-invitation-p-a.netlify.app](https://wedding-invitation-p-a.netlify.app/) |
| **Figma — Web** | [Wedding invitation (desktop)](https://www.figma.com/design/3IsbI4bAZjuJ597C6Jvic8/Wedding-invitation?node-id=24-7078&t=ZgLijubcfMsAFEx6-1) |
| **Figma — Mobile** | [Wedding invitation (mobile)](https://www.figma.com/design/3IsbI4bAZjuJ597C6Jvic8/Wedding-invitation?node-id=142-3670&t=ZgLijubcfMsAFEx6-1) |

---

## Overview

The site guides guests through the wedding day: hero, welcome message with video, venue and map, photo gallery, calendar highlight, two-day schedule, dress code palette, and RSVP questionnaire. Content is driven from a single data module so copy and assets stay easy to update.

**Design → code:** Layout, typography, spacing, and color were implemented to match the Figma frames for both breakpoints (desktop and mobile).

---

## Features

- **Pixel-faithful responsive UI** — Separate mobile copy and layout tweaks where the design diverges
- **Scroll reveal animations** — Sections fade and translate on scroll via a custom hook (paused while form fields are focused)
- **RSVP form** — Attendance, guest count, drinks, menu notes, transport, overnight stay; submissions sent to **Google Sheets** through **Google Apps Script**
- **Interactive calendar** — Wedding date highlighted in a custom calendar block
- **Dress code** — Color swatches from the design system
- **External map** — One-tap link to Google Maps for the venue
- **Centralized content** — All text, schedule, and media paths in `src/data/weddingData.js`

---

## Tech stack

| Layer | Choice |
|-------|--------|
| UI | React 19 |
| Build | Vite 5 |
| Styling | Plain CSS (`App.css`, `index.css`) |
| Backend (RSVP) | Google Apps Script → Google Sheets |
| Hosting | [Netlify](https://wedding-invitation-p-a.netlify.app/) |

---

## Project structure

```
src/
├── App.jsx              # Page composition
├── App.css              # Component & responsive styles
├── data/
│   └── weddingData.js   # Copy, schedule, dress code, asset paths
├── components/          # One component per section
│   ├── HeroSection.jsx
│   ├── WelcomeSection.jsx
│   ├── LocationSection.jsx
│   ├── VenuePhotosSection.jsx
│   ├── CalendarSection.jsx
│   ├── ScheduleSection.jsx
│   ├── DressCodeSection.jsx
│   ├── RSVPSection.jsx
│   └── FooterSection.jsx
└── hooks/
    ├── useScrollReveal.js    # Scroll-based section motion
    └── useFormFocusLock.js   # Disables scroll FX while typing

scripts/
└── rsvp-google-apps-script.gs   # Sheet endpoint for RSVP POST
```

---

## Getting started

**Requirements:** Node.js 18+

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## RSVP setup (optional)

To use your own Google Sheet for form responses:

1. Create a Google Sheet and open **Extensions → Apps Script**
2. Paste `scripts/rsvp-google-apps-script.gs` and deploy as a **Web app** (execute as *Me*, access *Anyone*)
3. Set the deployed URL in `RSVPSection.jsx` (`SCRIPT_URL`)

---

## License

Private project — wedding invitation for personal use. Design and assets belong to the authors unless otherwise noted.
