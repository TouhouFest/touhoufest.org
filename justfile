# Default recipe lists available commands
default:
    @just --list

# Format Markdown, YAML, and JSON files
fmt:
    dprint fmt

# Run static analysis and formatting checks
check:
    dprint check
    zola check

# Check all links (internal and external)
check-links:
    lychee --root-dir public public/

# Build static site
build:
    zola build

# Compile SASS stylesheets using grass
sass:
    grass sass/style.scss static/style.css

# Run local development server
serve:
    zola serve
