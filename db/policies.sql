-- Habilitar RLS
alter table public.products enable row level security;
alter table public.categories enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.customers enable row level security;

-- Lectura pública de catálogo (productos/categorías)
drop policy if exists "Public read products" on public.products;
create policy "Public read products"
  on public.products for select
  using (true);

drop policy if exists "Public read categories" on public.categories;
create policy "Public read categories"
  on public.categories for select
  using (true);

-- Clientes (propiedad por user_id)
drop policy if exists "Owner can read/write customers" on public.customers;
create policy "Owner can read/write customers"
  on public.customers for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Órdenes: cada usuario ve/crea las suyas
drop policy if exists "Owner can read orders" on public.orders;
create policy "Owner can read orders"
  on public.orders for select
  using (auth.uid() = user_id);

drop policy if exists "Owner can insert orders" on public.orders;
create policy "Owner can insert orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

-- Ítems: lectura por pertenecer a su orden; inserción cuando la orden es del usuario
drop policy if exists "Read items by order ownership" on public.order_items;
create policy "Read items by order ownership"
  on public.order_items for select
  using (exists (
    select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()
  ));

drop policy if exists "Insert items when order belongs to user" on public.order_items;
create policy "Insert items when order belongs to user"
  on public.order_items for insert
  with check (exists (
    select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()
  ));
