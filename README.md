# Evvee

Nigeria's event vendor marketplace — clean React rebuild of the original single-file prototype.

**Stack:** Vite + React 18 · Tailwind CSS · Framer Motion · GSAP · react-icons

No backend is wired up yet — all vendors, categories, testimonials, and blog posts live in
`src/data/*.js` as mock data, and auth/saved-vendors/bookings are in-memory only
(`src/context/AppContext.jsx`). Swap that file's functions for real API/Supabase calls
whenever you're ready; no component needs to change.

## Project structure

```
src/
  components/
    layout/     Navbar, Footer, CookieConsent, ChatWidget ("Feranmi")
    sections/   Hero, CategoryGrid, VendorGrid, VendorCard, TestimonialTicker,
                HowItWorks, BlogSection, ListBusinessCTA, LocationPicker
    modals/     AuthModal, CategoryModal, BlogModal, SavedVendorsModal,
                BookingsModal, BusinessOnboardingModal, LegalModal
    ui/         Modal, Reveal (scroll-in-view animation wrapper)
  context/      AppContext.jsx — auth, saved vendors, bookings, modal state
  data/         mock vendors, categories, states, testimonials, blog posts
  App.jsx       assembles everything
  main.jsx      entry point
```

## Running it from Termux

```bash
pkg install nodejs-lts git   # if you haven't already
cd evvee
npm install
npm run dev -- --host        # --host makes it reachable at http://<phone-ip>:5173
```

Open the printed URL in your phone's browser (or on another device on the same
network) to preview.

## Pushing to GitHub

```bash
git init                     # skip if already a repo
git add .
git commit -m "Initial React rebuild"
git branch -M main
git remote add origin https://github.com/<your-username>/evvee.git
git push -u origin main
```

If Termux doesn't have a credential helper set up, use a GitHub personal access
token as the password when prompted, or `gh auth login` if you have the GitHub CLI
installed (`pkg install gh`).

## Deploying to Vercel

1. Go to vercel.com → **Add New… → Project**.
2. Import the `evvee` GitHub repo.
3. Vercel auto-detects Vite — framework preset **Vite**, build command
   `npm run build`, output directory `dist`. Leave the defaults.
4. Deploy. Every push to `main` redeploys automatically.

## Next steps

- Wire `AppContext.jsx` up to Supabase (or your backend of choice) for real auth,
  vendor data, and saved/booking persistence.
- Replace the mock vendor photos in `src/data/vendors.js` with real listings.
- Add real category landing pages if you want shareable URLs per category
  (currently category browsing opens as a modal, matching the original UX).
