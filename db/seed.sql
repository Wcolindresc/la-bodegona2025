-- Categorías
insert into public.categories (name, slug) values
  ('Limpieza', 'limpieza'),
  ('Despensa', 'despensa'),
  ('Cuidado Personal', 'cuidado-personal')
on conflict (slug) do nothing;

-- Productos (ejemplo)
insert into public.products (name, slug, description, price, stock, thumbnail_url, category_id)
select * from (
  values
    ('Detergente Ultra 1kg','detergente-ultra-1kg','Detergente en polvo 1kg', 29.99, 120, null, (select id from public.categories where slug='limpieza')),
    ('Arroz Premium 5lb','arroz-premium-5lb','Arroz blanco 5lb', 44.50, 80, null, (select id from public.categories where slug='despensa')),
    ('Shampoo Familiar 750ml','shampoo-familiar-750','Shampoo 750ml', 32.25, 60, null, (select id from public.categories where slug='cuidado-personal'))
) as t(name,slug,description,price,stock,thumbnail_url,category_id)
on conflict (slug) do nothing;
