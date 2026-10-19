import { cn } from "@/lib/utils";
import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";

const SLIDE_SECONDS = 6;

// Painel à direita que se dissolve no fundo: as fotos ficam perto do tamanho original, sem esticar.
const fadeMask = "linear-gradient(to right, transparent 0%, black 45%)";

interface PhotoBackdropProps {
  /** 3 ou 4 fotos (há uma animação CSS para cada quantidade). */
  photos: readonly StaticImageData[];
  /** Opacidade final das fotos sobre o fundo da seção. */
  opacity?: number;
  className?: string;
}

/** Carrossel decorativo de fundo: fotos em crossfade com opacidade baixa, atrás do conteúdo. */
export function PhotoBackdrop({ photos, opacity = 0.25, className }: PhotoBackdropProps) {
  const cycle = photos.length * SLIDE_SECONDS;

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-y-0 right-0 -z-10 w-full md:w-[60%]", className)}
      style={{ opacity, maskImage: fadeMask, WebkitMaskImage: fadeMask }}
    >
      {photos.map((photo, index) => (
        <div
          key={photo.src}
          className="photo-backdrop-slide absolute inset-0"
          style={
            {
              "--slide-animation": `photo-backdrop-${photos.length}`,
              "--slide-cycle": `${cycle}s`,
              "--slide-delay": `${index * SLIDE_SECONDS}s`,
            } as CSSProperties
          }
        >
          <Image
            src={photo}
            alt=""
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            quality={90}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
