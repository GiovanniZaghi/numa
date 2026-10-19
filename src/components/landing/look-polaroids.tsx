import aulaElastico from "@/assets/photos/look-aula-elastico.jpg";
import macacaoRosa from "@/assets/photos/look-macacao-rosa.jpg";
import moodboard from "@/assets/photos/look-moodboard.jpg";
import rosaBranco from "@/assets/photos/look-rosa-branco.jpg";
import { cn } from "@/lib/utils";
import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";

interface Polaroid {
  photo: StaticImageData;
  caption: string;
  alt: string;
  /** Posição e inclinação dentro do mural (em % do container). */
  left: string;
  top: string;
  rotate: number;
  /** Ponto de foco da foto dentro do recorte. */
  focus?: string;
}

const polaroids: Polaroid[] = [
  {
    photo: moodboard,
    caption: "all pink",
    alt: "Colagem de looks de pilates em rosa claro",
    left: "0%",
    top: "4%",
    rotate: -7,
    focus: "50% 20%",
  },
  {
    photo: macacaoRosa,
    caption: "macacão rosa",
    alt: "Mulher sorrindo de macacão rosa em aula de pilates",
    left: "34%",
    top: "0%",
    rotate: 5,
    focus: "40% 30%",
  },
  {
    photo: rosaBranco,
    caption: "rosa + branco",
    alt: "Alunas de top branco e shorts rosa em aula no tapete",
    left: "6%",
    top: "44%",
    rotate: 4,
    focus: "50% 55%",
  },
  {
    photo: aulaElastico,
    caption: "comfy",
    alt: "Turma com roupas rosa fazendo exercício com elástico",
    left: "52%",
    top: "38%",
    rotate: -5,
    focus: "40% 40%",
  },
];

/** Mural de inspirações de look: polaroids sobrepostas que se destacam ao passar o mouse ou tocar. */
export function LookPolaroids({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto aspect-[1/1.05] w-full max-w-[540px]", className)}>
      {polaroids.map((item, index) => (
        <figure
          key={item.caption}
          tabIndex={0}
          style={
            {
              left: item.left,
              top: item.top,
              zIndex: index + 1,
              "--tilt": `${item.rotate}deg`,
            } as CSSProperties
          }
          className={cn(
            "absolute w-[46%] cursor-pointer bg-white p-2.5 pb-0 shadow-xl shadow-magenta-ink/15 outline-none sm:p-3 sm:pb-0",
            "[rotate:var(--tilt)] transition-[rotate,scale,box-shadow] duration-500 ease-out",
            "hover:z-50! hover:scale-110 hover:shadow-2xl hover:[rotate:0deg]",
            "focus-visible:z-50! focus-visible:scale-110 focus-visible:shadow-2xl focus-visible:[rotate:0deg]",
            // fitinha colando a polaroid
            "before:absolute before:-top-3 before:left-1/2 before:z-10 before:h-6 before:w-16 before:-translate-x-1/2 before:-rotate-3 before:bg-petal/70 before:shadow-sm",
          )}
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-blush">
            <Image
              src={item.photo}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 250px, 46vw"
              quality={90}
              className="object-cover"
              style={{ objectPosition: item.focus }}
            />
          </div>
          <figcaption className="py-2 text-center font-script text-2xl text-ink/80 sm:py-3 sm:text-3xl">
            {item.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
