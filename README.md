# ThesisHub - Professional Thesis Writing Service Website

A static website for a thesis writing service where users can browse professionally written thesis samples, explore details, and enquire about getting their own thesis written.

## Live Site

**https://kndnkmr.github.io/thesis-website/**

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Home page with hero section, how it works, featured theses, and why choose us |
| `gallery.html` | Thesis gallery with 12 samples across 6 subject categories with filtering |
| `thesis-detail.html` | Dynamic thesis detail page with abstract, methodology, findings, and sidebar |
| `contact.html` | Enquiry form (powered by Web3Forms) + direct contact info + FAQ |
| `about.html` | About page with stats, story, values, team profiles, and testimonials |

## Features

- Responsive design (mobile, tablet, desktop)
- Working contact form via [Web3Forms](https://web3forms.com) — submissions sent to email
- WhatsApp click-to-chat floating button on all pages
- Category-based filtering on the gallery page
- Dynamic thesis detail loading from JavaScript data
- SEO optimized with meta descriptions, keywords, Open Graph tags
- Sitemap.xml and robots.txt for search engine indexing
- Mobile hamburger navigation menu
- Smooth animations and hover effects

## Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom properties, flexbox, grid, responsive breakpoints
- **Vanilla JavaScript** — no frameworks or dependencies
- **Web3Forms** — contact form backend (free)
- **GitHub Pages** — hosting (free)

## Project Structure

```
├── index.html          # Home page
├── gallery.html        # Thesis gallery with filters
├── thesis-detail.html  # Individual thesis detail page
├── contact.html        # Contact form and info
├── about.html          # About us page
├── sitemap.xml         # Sitemap for search engines
├── robots.txt          # Search engine crawl rules
├── css/
│   └── styles.css      # All styles (responsive)
└── js/
    └── main.js         # Interactivity (nav, filters, form, dynamic content)
```

## Setup & Development

No build tools or dependencies needed. To run locally:

```bash
cd "Public website"
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

## Deployment

Hosted on GitHub Pages. Any push to the `main` branch auto-deploys within 1-2 minutes.

```bash
git add -A
git commit -m "Your message"
git push
```

## Configuration

- **Contact email:** Update in `contact.html` (contact info section + footer) and all other page footers
- **Phone/WhatsApp:** Update in `contact.html` and all page footers
- **WhatsApp message:** Update the `wa.me` URL in all HTML files
- **Web3Forms key:** Located in `contact.html` as a hidden form field
- **Domain:** Update URLs in `sitemap.xml`, `robots.txt`, and Open Graph meta tags when you add a custom domain

## License

All rights reserved.
