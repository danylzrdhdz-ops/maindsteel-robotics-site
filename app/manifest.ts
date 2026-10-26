import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Maindsteel Robotics",
    short_name: "Maindsteel",
    description:
      "Automatización industrial, integración de robots y venta de maquinaria en Aguascalientes, México.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b1c44",
    theme_color: "#0b1c44",
    lang: "es-MX",
    icons: [
      {
        src: "/icon-light-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
