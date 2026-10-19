import logo from "@/assets/brand/numa-club.png";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src={logo}
      alt="Numa Club"
      priority={priority}
      sizes="120px"
      className={cn("h-12 w-auto", className)}
    />
  );
}
