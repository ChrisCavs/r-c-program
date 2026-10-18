# Wedding program

A small, mobile-friendly website for our wedding program. No build tools, packages, or external fonts are required.

## Preview locally

From this directory, run `python3 -m http.server 8000 --bind 127.0.0.1` and open the local server in your browser. Use a server rather than opening the HTML file directly so that the program content can load.

## Edit the program

Update `program.json`. Content was imported from **Wedding Program Draft** in Google Docs on October 15, 2026. A notice identifies it as a work in progress. Sections open individually; the section menu and expand-all button help guests follow the ceremony.

- `couple`: names or page title.
- `occasion`: date and location; use `\n` for a new line.
- `welcome`: an array of opening paragraphs; `thanks`: closing note.
- `draftMessage`: notice while planning; set to `""` when ready.
- `events`: ordered objects with `title`, optional `time`, and `paragraphs` (an array of text paragraphs).
- `people`: objects with `role` and `name` for the wedding party and other participants.

For example, an event can look like `{ "title": "Processional", "paragraphs": ["Music and participants"] }`.

Import notes: the source's section order and wording are retained. A duplicated sentence fragment after the bride's entrance and an internal editorial parenthesis about an appendix were omitted from the guest page. The seven vow labels and their descriptions are separated for readability. Names, date, and venue were not inferred.

The website uses a reviewed copy of the program. It does not automatically sync changes from Google Docs. Only put information in this repository that you want publicly visible.

The section picker stays fixed at the top of the screen. Jumping to a section opens it and positions the heading below the navigation. Expand/collapse icons occupy a consistent right-hand column, including on narrow screens.

## Section images

Each section supports at most one optional `image` object. Use locally stored files under `assets/` with a verified reuse license; the Pages workflow includes that directory. Include `src`, descriptive `alt`, `width`, `height`, `author`, `source` (original image page URL), `license`, and `licenseUrl`; `caption` is optional. Images load lazily and display linked photographer and license credits. Do not describe third-party ceremony images as photographs of our wedding.

## Publish on GitHub Pages

1. Push these files to the `main` branch of `ChrisCavs/r-c-program`.
2. In the repository's **Settings → Pages**, choose **GitHub Actions** as the source.
3. The **Publish wedding program** workflow deploys every push to `main`; it can also be run manually from Actions.
4. After a successful deployment, the expected site address is `https://chriscavs.github.io/r-c-program/` (unless a custom domain is configured).

The workflow uploads only the four public site files. No credentials belong in the site or program file.
