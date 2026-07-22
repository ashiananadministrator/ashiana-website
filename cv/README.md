# CV Subwebsite Setup & Deployment Guide

This directory contains the source code for the CV subwebsite intended to be hosted at `cv.ashianasociety.com`.

## Repository Structure

- `index.html`: Main HTML markup containing the sections (Hero, About, Experience, Skills, Projects, Contact).
- `style.css`: Modern visual styling including dark/light modes, scroll animations, and a print stylesheet.
- `script.js`: Interactive functionality (typing effect, skills progress bar animation, projects filtering, smooth scroll).
- `profile.png`: Profile avatar placeholder.

---

## Hosting & Subdomain Setup (`cv.ashianasociety.com`)

GitHub Pages does not natively support serving multiple subdomains (e.g. `ashianasociety.com` and `cv.ashianasociety.com`) from a single repository unless you use DNS-level proxies/workers.

Here are the three best options for deploying this CV subwebsite:

### Option A: Cloudflare Pages / Vercel (Recommended Monorepo Setup)

If you host your main website on Cloudflare Pages or Vercel:
1. Connect this repository to your Cloudflare Pages / Vercel account.
2. **Main Domain Setup:** Set the build directory of your main deployment to the root directory `.` and bind it to `ashianasociety.com`.
3. **Subdomain Setup:** Create a second project/site connected to the *same* repository.
   - Set the **Root Directory** of this second project to `cv/`.
   - Bind this project to `cv.ashianasociety.com`.
   - Vercel or Cloudflare will automatically build and host the subdomain from this folder!

### Option B: Separate GitHub Repositories (Standard GitHub Pages Setup)

If you prefer standard GitHub Pages hosting without external platforms:
1. Create a **new GitHub repository** named `cv` or `ashiana-cv` in your GitHub account.
2. Copy all files inside this `cv/` directory (i.e. `index.html`, `style.css`, `script.js`, `profile.png`) into the root of that new repository.
3. Add a file named `CNAME` in the root of the new repository containing exactly:
   ```
   cv.ashianasociety.com
   ```
4. Enable GitHub Pages in that repository's settings (pointing to the `main` branch).
5. In your DNS provider (Cloudflare, GoDaddy, Namecheap, etc.), add a CNAME record:
   - **Type:** `CNAME`
   - **Name:** `cv`
   - **Target:** `<your-github-username>.github.io`

### Option C: Custom VPS (Nginx Setup)

If hosting on a custom virtual private server with Nginx, add a server block in your Nginx config:

```nginx
# Main website block
server {
    listen 80;
    server_name ashianasociety.com www.ashianasociety.com;
    root /var/www/ashiana-website;
    index index.html;
}

# CV Subdomain block
server {
    listen 80;
    server_name cv.ashianasociety.com;
    root /var/www/ashiana-website/cv;
    index index.html;
}
```

---

## Customizing the CV

To update the content, simply edit the text directly in the `cv/index.html` file.
To replace the profile picture, overwrite `cv/profile.png` with your desired photo.
