# FLIN Chatbot

## Getting Started

### Clone the repository

```bash
git clone https://github.com/muhFaza/flin-chatbot.git
cd flin-chatbot
```

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

This will start the development server at [http://localhost:5173](http://localhost:5173). The page will reload if you make edits to the source files.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode with hot-reload.

### `npm run build`

Builds the app for production to the `dist` folder. The build is minified and optimized for best performance.

### `npm run preview`

Serves the production build locally to preview it before deployment.

## Building for Production

To create an optimized production build:

```bash
npm run build
```

This command:
- Minifies JavaScript and CSS
- Optimizes images
- Generates content hashes for long-term caching
- Creates compressed versions of assets (gzip, brotli)
- Splits code into chunks for better loading performance

The output will be in the `dist` directory, ready to be deployed to any static hosting service.

## Deployment

After building the project, you can deploy the contents of the `dist` directory to any static hosting service:

- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting
- Any traditional web hosting via FTP

Example deployment to Netlify:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

## Performance Optimization

This project includes the following optimizations:

- Code splitting for efficient loading
- Image optimization with ViteImageOptimizer
- CSS and JS minification
- Image compression
- Lazy loading of components and images
