import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { productPublicUrl } from "../lib/storage"; // crea este helper si aún no existe (abajo)
import { listProducts, updateProductImagePath } from "../services/productsService"; // ver función más abajo

export default function AdminUploadImage() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [slug, setSlug] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const items = await listProducts({ limit: 500 });
        setProducts(items);
        if (items.length) {
          setProductId(items[0].id);
          setSlug(items[0].slug);
          setCurrentImage(items[0].imageUrl || null);
        }
      } catch (e) { console.error(e); }
    })();
  }, []);

  useEffect(() => {
    const p = products.find(x => String(x.id) === String(productId));
    if (p) {
      setSlug(p.slug);
      setCurrentImage(p.imageUrl || null);
    }
  }, [productId, products]);

  async function handleUpload(e) {
    e.preventDefault();
    setStatus("");
    if (!productId || !slug || !file) return setStatus("Selecciona producto y archivo");

    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const path = `products/${slug}.${ext}`;

    await supabase.storage.from("products").remove([path]).catch(() => {});
    const { error: upErr } = await supabase.storage.from("products").upload(path, file, {
      cacheControl: "3600",
      upsert: true
    });
    if (upErr) return setStatus("Error al subir: " + upErr.message);

    try {
      await updateProductImagePath(productId, path);
      setCurrentImage(productPublicUrl(path));
      setFile(null);
      setStatus("Listo ✅");
    } catch (err) {
      setStatus("Subió, pero falló actualizar el producto: " + err.message);
    }
  }

  async function handleDelete() {
    if (!productId || !slug) return;
    const prefix = `products/${slug}.`;
    const candidates = ["jpg","jpeg","png","webp","gif","avif"].map(e => `${prefix}${e}`);
    await supabase.storage.from("products").remove(candidates).catch(() => {});
    await updateProductImagePath(productId, null);
    setCurrentImage(null);
    setStatus("Eliminado ✅");
  }

  return (
    <div className="max-w-2xl p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Gestión de imágenes</h1>

      <label className="block">
        <span className="text-sm">Producto</span>
        <select
          className="border rounded px-3 py-2 w-full mt-1"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        >
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.name} ({p.slug})</option>
          ))}
        </select>
      </label>

      <div className="flex items-center gap-4">
        <div className="w-48 h-32 bg-gray-50 rounded flex items-center justify-center overflow-hidden">
          {currentImage
            ? <img src={currentImage} alt="actual" className="object-cover w-full h-full" />
            : <span className="text-gray-400 text-sm">Sin imagen</span>}
        </div>
        {currentImage &&
          <button type="button" className="px-3 py-2 rounded bg-red-600 text-white" onClick={handleDelete}>
            Eliminar imagen
          </button>}
      </div>

      <form onSubmit={handleUpload} className="space-y-3">
        <div>
          <label className="block text-sm">Archivo (JPG/PNG/WEBP)</label>
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </div>
        <button className="px-4 py-2 rounded bg-blue-600 text-white">Subir/Reemplazar</button>
      </form>

      {status && <p className="text-sm">{status}</p>}
    </div>
  );
}
