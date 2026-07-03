# Compass 9, High School Path Planner (MVP)

A website for incoming/current 8th graders that helps them find a field that fits,
explore real careers, and get a personalized year-by-year high school plan
(AP roadmap + SAT target + clubs).

> **Name is a placeholder.** To rename, change `appName` at the top of
> [`js/data.js`](js/data.js). It updates the header, footer, and page title everywhere.

## What's built (MVP scope)

- **Homepage** with both entry points ("Take the quiz" / "I already know my interest")
- **Quiz**, 12 questions, one per screen, progress bar, mixed interest + strength questions
- **Quiz results**, top 2-3 major matches with a personalized "why this fits you"
- **Field selection** (Option B), browse all 7 fields
- **Career list** (shared by both paths), jobs with salary + hours preview
- **Results Hub** (the core page) with all four sections:
  - Career snapshot (salary range, hours, day-in-the-life, region note)
  - Year-by-year AP class roadmap
  - Target SAT score range + PSAT/SAT timing
  - Recommended extracurriculars

7 fields covered (spec asked for 4-6): Business & Finance, Medicine & Health,
Engineering, Computer Science, Law & Pre-Law, Social Sciences, Arts & Design.

## Tech

- Plain **HTML / CSS / JavaScript**. No framework, no build step, **no backend**.
- Single-page app using **hash routing** (`#/careers/business`, etc.) so the Back
  button works and it deploys to GitHub Pages with zero config.
- All content lives in [`js/data.js`](js/data.js) and [`js/quiz.js`](js/quiz.js).

> **Why `data.js` instead of `data.json`?** The spec called for hardcoded data in a
> JSON file. We load it as a `.js` file (a plain JS object) instead of fetching a
> `.json` file so the site also works when opened directly from a `file://` URL for
> local testing, `fetch()` on `file://` is blocked by browsers. The data is still a
> single, plain, editable object; it's just as easy to edit. It works identically on
> GitHub Pages.

## Run locally

Just open `index.html` in a browser, that's it (no server needed).

Or, to serve it like production:

```bash
# from this folder
python -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a GitHub repo and push this folder's contents to it.
2. Repo **Settings → Pages → Build and deployment → Source: "Deploy from a branch"**.
3. Pick your branch (e.g. `main`) and folder `/ (root)`. Save.
4. Your site goes live at `https://<username>.github.io/<repo>/` in a minute or two.

The included `.nojekyll` file tells GitHub Pages to serve the files as-is.

## Editing content (no coding needed for most changes)

- **Careers, salaries, hours, descriptions, AP roadmaps, SAT ranges, clubs:**
  edit [`js/data.js`](js/data.js). Each field (`major`) is one object.
- **Quiz questions / scoring:** edit [`js/quiz.js`](js/quiz.js). Each option adds
  points to one or more field keys (`business`, `medicine`, `engineering`, `cs`,
  `law`, `social`, `arts`). Top scorers become the student's matches.
- **Look & feel:** edit [`css/styles.css`](css/styles.css) (colors are CSS variables
  at the very top).

## ⚠️ Before the teacher pilot, verify the AP prerequisites

The year-by-year sequencing is standard for most public high schools, but the
**exact prerequisite chains** (e.g. whether AP Bio requires Chemistry first) need to
be confirmed against the actual **Bellevue High School** course catalog at
`bsd405.org` before students schedule real classes. This caveat is displayed on
every roadmap in the app.

## Phase 2 (not built yet, per spec)

- Save quiz responses to a database (Firebase/Supabase) for teacher review
- In-site feedback form
- More majors/careers
- Multiple high schools' catalogs (school dropdown)
- Accounts / saved results
