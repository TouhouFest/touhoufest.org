# touhoufest.org

Main website for TouhouFest

## Building
This website uses the static website generator [Zola](https://www.getzola.org/) and builds our SASS framework dependencies directly from git submodules.

### Cloning & Submodule Setup
When cloning or checking out this repository, you **must include submodules** so the SASS stylesheets (`sass/_vendor/bulma`) compile properly:

```sh
# Clone with submodules right from the start:
git clone --recurse-submodules https://github.com/touhoufest/touhoufest.org.git

# Or if you already cloned the repository without submodules, initialize them:
git submodule update --init --recursive
```

### Local Development & Live-Reload
Because Bulma v1.0.4 uses modern Dart Sass modules (`@use`/`@forward`) that exceed Zola's internal `libsass` engine, we use Dart Sass to compile `sass/style.scss` into `static/style.css`.

To start a local development server with **automatic live-reload and real-time SASS recompilation**:

```sh
npm install
npm run dev
# (Runs both `sass --watch` and `zola serve` concurrently)
```

### Static Production Build
To compile the SASS stylesheet and generate the static HTML output into `public/`:

```sh
npm run build
# Or manually:
# npx --yes sass sass/style.scss static/style.css --style=compressed --no-source-map && zola build
```
