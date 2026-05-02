# Where Does Sex Live?

A tiny single-page microsite for collecting opinions about where sex sits on Maslow's hierarchy of needs. Pure HTML/CSS/JS, no build step.

## Files

- `index.html` — the whole site, single file
- `Code.gs` — Google Apps Script that receives form submissions and writes them to a Google Sheet
- `README.md` — this file

## Deploy to GitHub Pages

1. Create a new public repo on GitHub (e.g. `where-does-sex-live`)
2. Drop `index.html` into the repo root and push
3. In the repo: **Settings → Pages → Source: `main` branch, `/root` folder → Save**
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute or two

That's it for hosting. Now wire up the form.

## Wire up the Google Sheet

1. Create a new Google Sheet. Name it whatever you like.
2. In the first row, add these column headers (exactly, left to right):
   ```
   timestamp	selected_levels	why_humans	why_you	satisfaction	age	gender	relationship	email	user_agent
   ```
3. **Extensions → Apps Script**. Delete the placeholder `myFunction` and paste the contents of `Code.gs` (included next to this README).
4. Click **Deploy → New deployment**:
   - **Type:** Web app
   - **Description:** anything
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Click **Deploy**, authorise it (Google will warn you it's an unverified app — that's fine, it's your own script), and copy the **Web app URL** at the end.
6. Open `index.html`, find the line near the bottom of the `<script>`:
   ```js
   const SHEET_ENDPOINT = "";
   ```
   Paste your URL between the quotes.
7. Commit and push. Done.

While `SHEET_ENDPOINT` is empty the form gracefully falls back to saving each submission to the browser's `localStorage` so you can still test the flow. Console-log will tell you it's doing this.

## Updating the script later

If you change `Code.gs` and want the changes live, you have to **Deploy → Manage deployments → pencil icon → New version → Deploy**. (Re-saving alone doesn't republish.)

## Anatomy of the page

- **Pyramid:** SVG, five paths. `pointerdown` / `pointermove` / `pointerup` for unified mouse + touch painting. `touch-action: none` on the SVG stops the page scrolling while you paint on mobile. Each level is also a focusable `role="button"` element so keyboard users can `Tab` to it and press `Space` / `Enter` to toggle.
- **Form:** standard HTML, custom slider, three optional dropdowns. Submits as JSON `text/plain` (avoids the CORS preflight that Apps Script can't handle).
- **Styling:** Fraunces (serif headings, drop cap) + Inter (body), warm cream/terracotta/burgundy palette, paper-grain via CSS gradients, subtle pop animations. Respects `prefers-reduced-motion`.

## Accessibility notes

- Visible focus rings on all interactive elements
- `aria-pressed` on each pyramid level reflects selected state
- `aria-live` polite tally + thank-you message
- Reduced-motion users see no animations
- Colour contrast ratios meet WCAG AA on body text and buttons
