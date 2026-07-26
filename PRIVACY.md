# Privacy and access-control guide

## What ordinary GitHub Pages can and cannot do

A personal GitHub Pages website such as:

```text
https://YOUR-USERNAME.github.io/
```

is a public website. A private source repository is not equivalent to a private website. Once standard GitHub Pages publishes the content, people can access the generated site without being invited to the repository.

GitHub documents access-controlled Pages sites for eligible **organization project sites using GitHub Enterprise Cloud**. This is not the normal configuration for a personal `username.github.io` website.

Official references:

- https://docs.github.com/en/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages

## Recommended modes

### Mode A — Private working draft

Use this while building the website:

- Create a private GitHub repository.
- Do not enable GitHub Pages.
- Preview locally using `preview.bat` or `preview.sh`.
- Share screenshots or selected files manually when feedback is needed.

This is the safest standard-GitHub workflow.

### Mode B — Public personal academic website

Use this when ready to publish:

- Use a repository named `YOUR-USERNAME.github.io`.
- Enable GitHub Pages.
- Assume every committed website file is public.
- Include only published work and high-level descriptions of active research.

The supplied website is written for this mode. Active and emerging projects are intentionally described at a high level.

### Mode C — Access-controlled organizational Pages site

This requires an eligible organization on GitHub Enterprise Cloud and an organization project Pages site. Configure site visibility through the organization and repository settings according to GitHub’s current documentation.

### Mode D — Private hosting outside ordinary GitHub Pages

For a genuinely password-protected personal site without GitHub Enterprise, use a hosting platform that provides authentication or place the site behind a properly configured identity-aware proxy. The public GitHub Pages origin must not remain available as an unprotected alternative.

## “Noindex” is not privacy

Search-engine exclusion can reduce discoverability, but it is not access control. Anyone with the address may still open, copy, or share the page.

The `privacy/` folder includes optional snippets:

- `robots-private.txt`: asks compliant crawlers not to index the site.
- `noindex-meta-snippet.html`: a `<meta>` tag that asks search engines not to index a page.

These controls are appropriate only for an **unlisted draft that contains no confidential information**.

## JavaScript password screens are not security

Do not protect a static GitHub Pages site by putting a password prompt in JavaScript. The browser must receive the HTML, JavaScript, and assets before it can display the prompt, so the protected content remains retrievable from the public site.

## Pre-publication checklist

- Remove private phone numbers and home addresses.
- Do not publish passport details, CPR numbers, signatures, or employment documents.
- Do not publish unpublished partner data, laboratory credentials, internal reports, or review correspondence.
- Do not commit API keys, access tokens, passwords, `.env` files, SSH keys, or cloud credentials.
- Confirm that every uploaded manuscript may legally be redistributed.
- Keep active-project summaries high-level unless collaborators and partners have approved disclosure.
- Review repository history as well as current files; deleting a secret in a later commit does not remove it from earlier commits.

## Current package status

The package contains public scholarly links, bibliographic metadata, an institutional email address, and high-level research descriptions. It does not include a portrait, CV, unpublished numerical data, source notebooks, confidential partner files, or authentication credentials.
