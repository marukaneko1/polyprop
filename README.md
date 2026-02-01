# PolyProp Landing Page

A premium, conversion-focused landing page for PolyProp - a prop firm for prediction markets.

## Tech Stack

- **Next.js 14** (App Router) with TypeScript
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Geist Font** for typography

## Features

- 🎨 Premium dark theme with cyan accent
- 📱 Fully responsive (mobile-first)
- ⚡ Optimized performance with static export
- ♿ Accessible (semantic HTML, ARIA labels)
- 🔍 SEO optimized (metadata, OpenGraph)
- ✨ Smooth scroll animations

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment

### GitHub Pages (Automatic)

This repository is configured to automatically deploy to GitHub Pages via GitHub Actions:

1. Go to your repository Settings → Pages
2. Under "Source", select "GitHub Actions"
3. Push to the `main` branch to trigger deployment
4. Your site will be available at `https://[username].github.io/polyprop/`

### Manual Deployment

1. Build the static site:
   ```bash
   npm run build
   ```

2. The `out` folder contains the static files
3. Upload the contents of `out` to your hosting provider

### Alternative: Vercel (Recommended for Next.js)

For the best Next.js experience, consider deploying to [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Deploy with one click

Vercel provides:
- Automatic deployments on push
- Preview deployments for PRs
- Edge network for fast global performance
- Built-in analytics

## Project Structure

```
polyprop/
├── app/              # Next.js app directory
│   ├── page.tsx      # Homepage
│   ├── layout.tsx    # Root layout
│   └── globals.css   # Global styles
├── components/       # React components
│   ├── ui/           # Reusable UI components
│   └── ...           # Page sections
├── lib/              # Utilities and constants
└── public/           # Static assets
```

## License

Private - All rights reserved
