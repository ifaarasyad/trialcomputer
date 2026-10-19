# VIP Computer Care - Website

Plain HTML + CSS + JavaScript. No framework, no build step, no database.

## Run in Visual Studio Code
1. Open this folder in VS Code (File > Open Folder).
2. Install the "Live Server" extension.
3. Right-click `index.html` > "Open with Live Server".
   (Do not double-click the HTML files: the icons need a web server to load.)

## Files
- index.html     Home (hero, specialization, service area, testimonials slider)
- about.html     About (customers, platforms, service cards with popup)
- rates.html     Rates
- contact.html   Contact
- Blog           No page. The Blog button opens https://theacronym.substack.com/welcome
- css/style.css  All colors are at the top (:root)
- js/main.js     Mobile menu, service popup, testimonial slider
- js/theme.js    Light / dark mode toggle (choice is remembered in the browser)
- images/        og-image.png (link preview), kevin-placeholder.svg, logo.svg, icons.svg, hero-couple.svg, desk-mug.svg, desk-notebook.svg
- _headers       Security headers (Netlify / Cloudflare Pages)
- .htaccess      Security headers + 404 + caching (Apache / cPanel hosting, hidden file)
- 404.html       "Page not found" page
- robots.txt, sitemap.xml   For search engines (set your domain first)

## Things to edit
- Phone / WhatsApp number: search for 18606566439 (WhatsApp) and +18606566439 (call)
- Email: search for help@westhartfordtech.com
- Pictures: hero-couple.svg (Home, About), desk-mug.svg (Rates), desk-notebook.svg (Contact)
  are illustrations. To use real photos, add a .jpg/.webp to images/ and change the src in the HTML.
- Icon colors: .c-blue, .c-green, .c-pink ... at the bottom of css/style.css
- Dark mode colors: the :root[data-theme="dark"] block at the bottom of css/style.css
- Blog opens in a new tab. To open in the same tab, remove target="_blank" on the Blog links.

## How to update (no coding needed)
- Phone / email: VS Code > Edit > Replace in Files (Ctrl+Shift+H), search the old value, replace with the new one.
- Rates: open rates.html and change the number / text (look for "EDIT RATES").
- A testimonial: open index.html, find "EDIT TESTIMONIALS", copy one <figure> block, paste, change the text.
- A service: open about.html, find "EDIT SERVICES", copy one card block, paste, change the title and description.
- Who we serve (Residential / Small Business / Non-Profit): open about.html and edit the text under each title.
- After editing, save the file and refresh the browser. To publish, upload the folder again to your host.

## Before going live (checklist)
1. Replace YOUR-DOMAIN.com with the real domain: VS Code > Replace in Files (Ctrl+Shift+H). It appears in robots.txt, sitemap.xml and the <head> of each page.
2. Replace images/kevin-placeholder.svg with a real photo (about.html, "EDIT MEET KEVIN").
3. Read all text once and adjust the wording to Kevin's own voice.
4. Test on a real phone and tablet. Run Lighthouse in Chrome (F12) and aim for 90+.
5. Add the site to Google Business Profile and Google Search Console (submit sitemap.xml).

## Hosting notes
- Apache / LiteSpeed / cPanel hosting: upload everything including the hidden file .htaccess (security headers, 404 page, caching).
  In cPanel File Manager, turn on "Show Hidden Files (dotfiles)" to see it.
- Netlify / Cloudflare Pages: _headers does the same job; 404.html works automatically.
- GitHub Pages: ignores _headers and .htaccess. Fine for a test copy only.
- Test copies (GitHub Pages, Netlify preview): do NOT let them be indexed by Google. Add <meta name="robots" content="noindex"> to the pages of the test copy only.
- Never put passwords, hosting logins or API keys in this folder or in GitHub.

## Deploy
Upload the whole folder to Netlify (drag and drop) or any static host.
Keep `_headers` in the root folder so the security headers are applied.

# trialcomputer

