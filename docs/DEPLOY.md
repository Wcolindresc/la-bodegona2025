# Deploy

## Vercel
- Build Command: `npm run build`
- Output Directory: `dist`
- Variables de entorno (Project Settings → Environment Variables):
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

## Cloudflare Pages
- Build command: `npm run build`
- Output directory: `dist`
- Variables: `VITE_*` en Settings.

## Post-deploy
- Protege rutas admin por rol desde Supabase (RLS/Policies).
- Activa monitoreo (Sentry) y analytics si lo requieres.
