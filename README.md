# DeNoble Tech — Developer Portfolio (Plain HTML/CSS/JavaScript)

No build tools, no npm, no terminal required. Just open `index.html`.

## How to run it

**Easiest way:** double-click `index.html` — it opens in your browser and works.

**Recommended way** (fixes a couple of small things browsers restrict when
opening files directly, like some fetch/font behavior): install the
**"Live Server"** extension in VS Code, right-click `index.html`, choose
**"Open with Live Server"**. It'll open at `http://127.0.0.1:5500` and
auto-reloads whenever you save a file.

Either way — no `npm install`, no terminal commands, nothing to break.

## File structure

```
index.html         The page structure (mostly empty containers —
                    content is filled in by JavaScript)
css/style.css       All styling: colors, layout, animations, dark/light mode
js/data.js          ALL YOUR CONTENT — name, bio, skills, projects, etc.
js/icons.js         Small inline icon set for the Services section
js/app.js           Renders everything from data.js, handles the theme
                    toggle, mobile menu, project search/filter, contact
                    form, and the project/blog detail popups
images/brand/       Your logo files
favicon-32.png, icon-192.png, apple-touch-icon.png, og-image.jpg
                    Browser tab icon, home-screen icons, social share image
```

## Before you go live

1. **`js/data.js`** — this is the only file you need to edit for content.
   Fill in your bio further, add real projects, etc.
2. **Profile photo**: put your photo at `images/profile.jpg`, then set
   `profile.photo = 'images/profile.jpg'` in `js/data.js`.
3. **CV**: put your PDF at `cv/resume.pdf`, then set
   `profile.cvUrl = 'cv/resume.pdf'` in `js/data.js`.

## Adding a project

Open `js/data.js`, find the `projects` array, find the first entry with
`title: ''`, and fill it in:

```js
{
  id: 1,
  title: 'Dialysis Center Dashboard',
  category: 'Full-Stack Web Application',
  description: 'A short one-sentence summary shown on the card.',
  longDescription: 'A longer paragraph shown when someone clicks the card.',
  image: 'images/projects/dialysis-dashboard.png',
  technologies: ['HTML', 'CSS', 'JavaScript'],
  features: ['Patient management', 'Appointment scheduling'],
  challenges: 'Optional paragraph about a technical decision.',
  liveUrl: '',   // leave blank until deployed
  githubUrl: '', // leave blank if you don't have one yet
  featured: true,
}
```

Save the file, refresh the browser — the card, the category filter, the
search, and the click-to-expand detail popup all update automatically.
Put project screenshots in `images/projects/`.

## Contact form

The form validates on the page and sends real email directly from the
browser using **EmailJS** — no backend server to run or host.

1. Sign up free at [emailjs.com](https://www.emailjs.com)
2. Connect your Gmail as an "Email Service"
3. Create an "Email Template" with variables `{{from_name}}`,
   `{{from_email}}`, `{{subject}}`, `{{message}}`, `{{to_email}}`
4. Open `js/app.js`, find `EMAILJS_CONFIG` near the top of the "CONTACT"
   section, and fill in your three keys:
   ```js
   const EMAILJS_CONFIG = {
     serviceId: 'service_xxxxxxx',
     templateId: 'template_xxxxxxx',
     publicKey: 'xxxxxxxxxxxxxxx',
   };
   ```
5. Save, refresh. Submitting the form now sends real email — nothing
   opens on the visitor's device. Free tier covers 200 emails/month.

If you skip this setup, the form falls back to opening the visitor's own
email client with the message pre-filled — it still works, just less smooth.

## Design

- **Colors**: gold, white, and emerald green — a dark luxury theme by
  default, with a light mode toggle (saved in the browser, persists
  between visits).
- **Type**: Playfair Display (headings), Inter (body text).
- **Motion**: hero entrance animation, scroll-reveal on every section,
  a gold shimmer sweep on the primary button, staggered project cards,
  a gold accent line on the footer. All of it respects
  "reduce motion" accessibility settings automatically.

## Deploying

This is a static site — no server needed. Drag the whole folder into
[Netlify Drop](https://app.netlify.com/drop), or push it to GitHub and
enable GitHub Pages, or upload it to any web host. It just works as-is.

**One thing to update once you have a domain:** open `index.html` and
change the `og:image` and `twitter:image` meta tags to an absolute URL
(e.g. `https://yourdomain.com/og-image.jpg`) — social platforms require
a full URL, not a relative path, to show the preview image correctly.
