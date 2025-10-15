-- SCHEMA: categorías, productos, clientes opcional, órdenes e ítems
create table if not exists public.categories (
  id bigserial primary key,
  name text not null,
  slug text unique not null
);

create table if not exists public.products (
  id bigserial primary key,
  name text not null,
  slug text unique not null,
  description text,
  price numeric(12,2) not null check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  thumbnail_url text,
  category_id bigint references public.categories(id) on delete set null,
  created_at timestamp with time zone default now()
);

-- Usuarios: se toma del esquema de auth de Supabase. Tabla customers opcional si se quiere metadata extra.
create table if not exists public.customers (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamp with time zone default now()
);

create table if not exists public.orders (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending',
  shipping_address jsonb,
  notes text,
  created_at timestamp with time zone default now()
);

create table if not exists public.order_items (
  id bigserial primary key,
  order_id bigint not null references public.orders(id) on delete cascade,
  product_id bigint not null references public.products(id) on delete restrict,
  qty integer not null check (qty > 0),
  unit_price numeric(12,2) not null check (unit_price >= 0)
);

-- Vistas útiles
create or replace view public.v_sales_daily as
select date_trunc('day', o.created_at) as day,
       sum(oi.qty * oi.unit_price) as revenue,
       count(distinct o.id) as orders_count
from orders o
join order_items oi on oi.order_id = o.id
group by 1
order by 1 desc;
