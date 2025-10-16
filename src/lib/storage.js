import { supabase } from "./supabase";

/** Devuelve la URL pública de un objeto del bucket 'products'. */
export function productPublicUrl(imagePath) {
  if (!imagePath) return null;
  const { data } = supabase.storage.from("products").getPublicUrl(imagePath);
  return data?.publicUrl || null;
}
