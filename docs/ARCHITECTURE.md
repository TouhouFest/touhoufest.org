# TouhouFest Website Architecture & Design Pipeline

This document outlines the core architectural patterns, file structure, and design token pipeline used across the TouhouFest static website repository (`Zola 0.19+` + `Bulma 1.0+` + `Dart Sass / Grass`).

---

## 1. High-Level Directory Structure

```text
touhoufest.org/
├── config.toml           # Core site configuration, event dates, socials, & Zola settings
├── content/              # Markdown pages and sections (_index.md, staff.md, etc.)
├── data/                 # YAML data sources (applications.yml, exhibitors.yml, hotels.yml, schedule.yml)
├── docs/                 # Engineering, design, and content best practices documentation
├── sass/                 # SASS design system (`style.scss` entrypoint and modular partials)
├── static/               # Static raw assets (SVGs, PNGs, WOFF2 webfonts)
└── templates/            # HTML layouts, Tera macros, and Markdown shortcodes
    ├── base.html         # Global HTML wrapper (`<head>`, SEO/OG tags, header, footer)
    ├── index.html        # Homepage layout extending `base.html`
    ├── nav.html          # Global responsive navigation bar
    ├── footer.html       # Global responsive footer & copyright
    ├── macros/           # Shared Tera template helpers (`assets.html`, `event.html`, `grid.html`, `icons.html`)
    └── shortcodes/       # UI component templates invoked directly from Markdown content
```

---

## 2. SASS Design System & Token Architecture

All styles are compiled from a single entrypoint: `sass/style.scss`. To ensure clean inheritance, fast build times (~150ms in Zola `grass`), and predictable CSS overrides, SASS imports must strictly follow our 9-layer hierarchy:

```scss
// 0. Vendored Bulma Framework (Single-File SCSS Partial for fast builds)
@use 'bulma';

// 1. Core Design Tokens and Variables (Figma Frame 118 exact tokens)
@use 'variables' as *;

// 1.5. Self-Hosted Webfonts (@font-face definitions)
@use 'fonts';

// 2. Typography Rules and Scale (.title, .content, headings, body copy)
@use 'typography';

// 3. Button Styles (.button.is-primary, .button.is-gohei, pill variants)
@use 'buttons';

// 4. Global UI Components (Header, Navbar, Footer, Hero, Cards, & Grids)
@use 'components';

// 5. Figma Dev Mode Responsive Modules (Sections, Pricing, Applications, FAQ, Gallery)
@use 'modules';

// 6. Website Atoms & UI Components (Tags, Badges, DropDowns, Tab Buttons, Warnings)
@use 'atoms';

// 7. Embedded FontAwesome Icons (SVG Data URIs as mask-images)
@use 'icons';
```

### Key Rules for Modifying SASS
1. **Never drop un-vendored external SASS frameworks into `sass/`:** Multi-directory nested frameworks without leading underscores (`_`) cause Zola's internal compiler (`grass`) to emit dozens of unwanted CSS output files or crash on complex multi-module `@forward` resolutions during `zola serve`. Always vendor external frameworks as single-file partials (`e.g., _bulma.scss`).
2. **Strict Separation of Concerns:**
   * `_variables.scss`: Pure token declarations (`$color-dark-purple: #221a28;`, `$font-size-h1: 56px;`). Do not output CSS rules here.
   * `_components.scss`: Sitewide global structures (`.navbar`, `.footer-main`, `.hero-section-main`).
   * `_modules.scss`: Specific Dev Mode module cards and page-level layouts (`.discord-module-card`, `.pricing-schedule-table`, `.exhibitor-grid-container`).
   * `_atoms.scss`: Small atomic UI controls (`.badge-pill`, `.tab-item`, `.faq-accordion-item`).

---

## 3. Data-Driven Components (`/data/*.yml`)

To cleanly separate presentation (`templates/shortcodes/`) from information (`data/`), convention schedules, applications, hotel blocks, and exhibitor listings are stored in YAML format:
* `data/applications.yml`: Stores department card metadata (`title`, `slug`, `icon`, `button_text`, `open_date`, `close_date`, `url`).
* `data/schedule.yml`: Stores time blocks (`day_1`, `day_2`, `day_3`) across convention halls (`Stage`, `Main`, `Panel A/B`).
* `data/hotels.yml`: Stores partner hotel details (`name`, `price`, `distance`, `booking_url`, `badge_tag`).

Templates consume these data sources via Tera's `load_data(path=...)` function, iterating over items to generate responsive grids automatically without hardcoding markup in Markdown.
