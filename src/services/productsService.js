import { supabase } from '../lib/supabase';

export async function listProducts({ limit = 24, offset = 0, category_id = null } = {}) {
  let q = supabase.from('products').select('id,name,slug,price,stock,thumbnail_url,category_id,category:categories(name)').range(offset, offset + limit - 1).order('name');
  if (category_id) q = q.eq('category_id', category_id);
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

export async function getProductBySlug(slug) {
  const { data, error } = await supabase.from('products').select('*').eq('slug', slug).single();
  if (error) throw error;
  return data;
}

export async function listCategories() {
  const { data, error } = await supabase.from('categories').select('id,name,slug').order('name');
  if (error) throw error;
  return data;
}
