# Behnam Firouzi — Personal Research Portfolio

A responsive, dependency-free academic website for Behnam Firouzi. It presents the complete research portfolio rather than a single project and includes a searchable archive of 16 journal articles and two conference contributions.

## Included sections

- Personal academic profile and verified scholarly links
- Six connected research themes
- Published, active, emerging, and foundational research projects
- Searchable and filterable publication archive
- Research trajectory and methods
- Contact section
- Light and dark themes
- Responsive desktop, tablet, and mobile layouts
- Open Graph social preview, favicon, sitemap, robots file, and custom 404 page

## Important: “personal” versus “private”

This package is designed as a **personal academic website**.

An ordinary GitHub Pages website at `YOUR-USERNAME.github.io` is public on the internet. Making the repository private does not make a standard personal GitHub Pages website access-restricted. GitHub’s private Pages access control is available only for eligible organization project sites on GitHub Enterprise Cloud.

For a genuinely private draft:

1. Keep the repository private.
2. Leave GitHub Pages disabled.
3. Preview the website locally using `preview.bat`, `preview.sh`, or a local editor such as VS Code Live Server.

Read [`PRIVACY.md`](PRIVACY.md) before publishing. Do not use a JavaScript password screen as security; it only hides the page visually and does not protect its files.

## Publish as a personal GitHub Pages site

### 1. Repository name

The repository must be named exactly:

```text
YOUR-GITHUB-USERNAME.github.io
```

For example, only when the GitHub username is exactly `behnamfirouzi`:

```text
behnamfirouzi.github.io
```

### 2. Upload the files

Upload the **contents** of this folder to the repository root. `index.html` must be at the top level, not inside a nested folder.

Using the GitHub website:

1. Open the new repository.
2. Select **Add file → Upload files**.
3. Upload all files and folders from this package.
4. Commit to the `main` branch.
5. Open **Settings → Pages**.
6. Under **Build and deployment**, select **Deploy from a branch**.
7. Select `main` and `/ (root)`, then save.

Using Git:

```bash
git init
git add .
git commit -m "Create personal academic website"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/YOUR-GITHUB-USERNAME.github.io.git
git push -u origin main
```

Then configure **Settings → Pages → Deploy from a branch → main → / (root)**.

## Preview privately on your computer

### Windows

Double-click:

```text
preview.bat
```

Then open:

```text
http://localhost:8000
```

### macOS or Linux

Run:

```bash
chmod +x preview.sh
./preview.sh
```

Then open:

```text
http://localhost:8000
```

Both scripts use Python’s built-in local web server. Stop the server with `Ctrl+C`.

## Update publications

The archive is stored in:

```text
publications.js
```

Each publication is one JavaScript object. Add new records near the beginning of the array so the list remains newest-first. The website automatically updates the article and conference counters.

Example:

```javascript
{
  year: 2027,
  type: "Journal article",
  category: "waves-curved",
  categoryLabel: "Wave propagation & periodic structures",
  title: "Exact article title",
  authors: "Author One and Behnam Firouzi",
  venue: "Journal Name, volume, pages or article number",
  doi: "10.xxxx/xxxxx",
  url: "https://doi.org/10.xxxx/xxxxx",
  summary: "One-sentence description of the contribution.",
  featured: true,
  openAccess: true
}
```

Supported category values:

```text
waves-curved
mems-nonlinear
energy-harvesting
optimization-diagnostics
ai-robotics
conference
```

## Update the website address

The metadata currently assumes:

```text
https://behnamfirouzi.github.io/
```

When the GitHub username differs, update this address in:

- `index.html` (`og:url` and `og:image`)
- `sitemap.xml`
- `robots.txt`
- `404.html` if publishing as a project site rather than a user site

## Add a CV

Place the PDF at:

```text
assets/Behnam_Firouzi_CV.pdf
```

Then add a button where desired:

```html
<a class="button button-secondary"
   href="assets/Behnam_Firouzi_CV.pdf"
   target="_blank"
   rel="noopener noreferrer">
  Download CV ↗
</a>
```

Only upload a CV that contains information you are comfortable publishing publicly.

## Add a portrait

The current design intentionally uses a `BF` monogram, so a portrait is optional. Store a portrait in `assets/` and add an `<img>` element only when you prefer a photograph.

## File structure

```text
.
├── index.html
├── publications.js
├── styles.css
├── script.js
├── 404.html
├── PRIVACY.md
├── README.md
├── robots.txt
├── sitemap.xml
├── preview.bat
├── preview.sh
├── .nojekyll
├── LICENSE
├── privacy
│   ├── noindex-meta-snippet.html
│   └── robots-private.txt
└── assets
    ├── favicon.svg
    ├── social-preview.svg
    └── social-preview.png
```

## Publication and copyright practice

Link publications to DOI or institutional records. Upload manuscript PDFs only when the applicable journal policy and author rights permit redistribution. Never commit passwords, private correspondence, unpublished datasets, personal identifiers, API keys, confidential project files, or restricted partner information.

## Sources used to assemble the scholarly record

- Google Scholar profile supplied by Behnam Firouzi
- Aalborg University Research Portal
- ResearchGate publication profile
- DOI and publisher records for bibliographic verification

Before a major public launch, compare `publications.js` against the live Google Scholar profile and add any newly indexed work.
