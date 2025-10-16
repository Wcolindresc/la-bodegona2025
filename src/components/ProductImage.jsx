import { useState } from "react";

const PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
       <rect width="100%" height="100%" fill="#f3f4f6"/>
       <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
             fill="#9ca3af" font-family="sans-serif" font-size="20">Sin imagen</text>
     </svg>`
  );

export default function ProductImage({ src, alt = "", className = "" }) {
  const [error, setError] = useState(false);
  const showSrc = !error && src ? src : PLACEHOLDER;

  return (
    <img
      loading="lazy"
      decoding="async"
      src={showSrc}
      alt={alt}
      onError={() => setError(true)}
      className={`object-cover w-full h-48 rounded-md bg-gray-50 ${className}`}
    />
  );
}
