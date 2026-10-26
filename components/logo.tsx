import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center", className)}>
      <Image
        src="/images/logo-robotics-horizontal-blanco.png"
        alt="Maindsteel Robotics"
        width={1558}
        height={321}
        className="h-8 w-auto"
        preload

        style={{ objectFit: "contain" }}
        quality={80}
      />
    </span>
  );
}
