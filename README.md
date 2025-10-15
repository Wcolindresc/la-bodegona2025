# La Bodegona — listo para GitHub y Vercel/Cloudflare.

Scripts: dev/build/preview/check:rocket. Variables: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY.

## Base de datos (Supabase)
1. En el **SQL Editor** ejecuta, en este orden:
   - `db/schema.sql`
   - `db/policies.sql`
   - `db/seed.sql`
2. En **Authentication**, habilita Email/Password (o el proveedor que uses).
3. En **Project Settings → API**, copia URL y anon key y colócalas como variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Servicios incluidos
- `src/lib/supabase.js` — cliente Supabase.
- `src/services/productsService.js` — catálogo.
- `src/services/ordersService.js` — creación de órdenes (requiere sesión).
