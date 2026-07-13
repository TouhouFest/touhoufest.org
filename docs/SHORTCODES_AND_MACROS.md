# Markdown Shortcodes & Shared Tera Macros

This document outlines the conventions and architectural rules for writing content pages (`content/**/*.md`), invoking shortcodes, and maintaining shared Tera macro libraries in the TouhouFest repository.

---

## 1. Shortcode Conventions (`templates/shortcodes/*.html`)

Shortcodes are Tera templates inside `templates/shortcodes/` that content editors invoke directly from within Markdown (`.md`) files to render responsive Figma Dev Mode UI components without writing raw HTML inside content files.

### Invocation Syntax inside Markdown (`content/**/*.md`)
* **Self-Closing Shortcodes:**
  ```jinja2
  {{ hero_card(title="2026 Weekend Pass", subtitle="Experience three days of doujin music...", image="/hero.png", url="//registration.touhoufest.org/...", button_text="Buy badge") }}
  ```
* **Body-Block Shortcodes:**
  ```jinja2
  {% warning_display(title="Notice to Attendees") %}
  Please be aware of our updated prop and bag check policies for the 2026 festival season.
  {% endwarning_display %}
  ```

---

## 2. Shared Tera Macros vs. Shortcodes (`Why grid::state_card?`)

In Zola, **shortcodes are ONLY registered and executable from within Markdown content files (`.md`).** If one shortcode template (`e.g., shortcodes/exhibitors_grid.html`) attempts to call another shortcode using `{{ grid_state_card(...) }}`, Zola will throw an error: `Error: Function 'grid_state_card' not found`.

To share reusable UI logic across multiple shortcodes or global layouts (`base.html`, `section.html`), functions must be defined as **Tera macros** inside `templates/macros/` and explicitly imported inside the calling template:

```jinja2
{% import "macros/grid.html" as grid %}
{% import "macros/event.html" as event %}

{% set phase = event::get_phase() %}
{% if phase == "after" %}
  {{ grid::state_card(title="Applications Closed", message="Our 2026 application window has concluded.") }}
{% endif %}
```

---

## 3. Sitewide Event Phase Lifecycle (`event::get_phase()`)

To eliminate manual sitewide code edits before, during, and after the convention, all application listings (`applications_grid`), hotel cards (`hotels_grid`), exhibitor grids (`exhibitors_grid`), and schedule tables (`schedule_grid`) derive their visual state dynamically from `config.toml`:

```toml
[extra.event]
name = "TouhouFest 2026"
year = 2026
start_date = "2026-06-19T14:00:00-07:00"
end_date = "2026-06-21T18:00:00-07:00"
# Phase ("before", "during", "after") or empty "" to auto-derive based on current system timestamp
phase = ""
```

### The `event::get_phase()` Evaluation Logic (`templates/macros/event.html`)
1. **Manual Override:** If `config.extra.event.phase` is set explicitly to `"before"`, `"during"`, or `"after"`, the macro returns that string immediately.
2. **Automated Timestamp Comparison:** If `phase = ""`, the macro compares the current system timestamp (`now() | date(format="%s")`) against `start_date` and `end_date`:
   * If `now < start_date` -> returns `"before"` (`Shows open applications, hotel booking links, and schedule teasers`).
   * If `start_date <= now <= end_date` -> returns `"during"` (`Highlights live schedule tables and real-time maps`).
   * If `now > end_date` -> returns `"after"` (`Displays grid::state_card(...) closed notices across all grids automatically`).

---

## 4. Zero Inline Styles Rule

**Strict Rule: Never use inline `style="..."` attributes inside templates, shortcodes, or Markdown content (`unless dynamically computing background images or positioning matrices`).**

* **Why?** Inline styles bypass CSS class overrides, bloat HTML markup, complicate dark/light theme switching, and make sitewide typography audits impossible.
* **Requirement:** If a layout requires padding, borders, background gradients, or flex positioning, define a clean semantic class right inside `sass/_modules.scss` (`or _components.scss / _atoms.scss`) and apply the class attribute cleanly to the DOM element:
  ```html
  <!-- CORRECT -->
  <div class="discord-module-card">...</div>

  <!-- INCORRECT -->
  <div style="background-color: #5865f2; border-radius: 12px; padding: 24px;">...</div>
  ```
