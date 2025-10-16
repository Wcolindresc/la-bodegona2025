import { supabase } from "../lib/supabase";
import { productPublicUrl } from "../lib/storage";

export async function listProducts({ limit = 50, offset = 0 } = {}) {
  const { data, error } = await supabase
    .from("products")
    .select("id,name,slug,description,price,stock,image_path")
    .range(offset, offset + limit - 1)
    .order("name");
  if (error) throw error;
  return data.map(p => ({ ...p, imageUrl: productPublicUrl(p.image_path) }));
}

export async function updateProductImagePath(id, imagePath) {
  const { error } = await supabase.from("products").update({ image_path: imagePath }).eq("id", id);
  if (error) throw error;
}
.data, imageUrl: productPublicUrl(data.image_path) };
}

export async function updateProductImagePath(id, imagePath) {
  const { error } = await supabase
    .from("products")
    .update({ image_path: imagePath })
    .eq("id", id);
  if (error) throw error;
}
