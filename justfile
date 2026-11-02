# Default recipe lists available commands
default:
    @just --list

# Format Markdown, YAML, and JSON files
fmt:
    dprint fmt

# Run static analysis and formatting checks
check:
    dprint check
    zola check --skip-external-links

# Check all links (internal and external)
check-links:
    lychee --root-dir public public/

# Build static site
build:
    zola build

# Run local development server
serve:
    zola serve
