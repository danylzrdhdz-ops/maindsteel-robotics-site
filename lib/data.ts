export type Product = {
  slug: string
  name: string
  category: 'Montacargas' | 'Dobladoras' | 'Paneladoras' | 'Robots' | 'All' | 'Forklifts' | 'Bending' | 'Paneling'
  image: string
  title: string
  specs: { label: string; value: string }[]
  datasheet?: string
}

export const getProducts = (lang: 'es' | 'en' = 'es'): Product[] => [
  {
    slug: 'dobladora-de-lamina',
    name: lang === 'en' ? 'Sheet Metal Bending Machine' : 'Dobladora de lámina',
    category: lang === 'en' ? 'Bending' : 'Dobladoras',
    image: '/images/dobladora-lamina-new.png',
    datasheet: '/fichas-tecnicas/F. DOBLADORA DE LÁMINA .6 MTS.pdf',
    title: lang === 'en' ? 'MTDAMA EP12-600 OF .6 MT.' : 'MTDAMA EP12-600 DE .6 MT.',
    specs: [
      { label: lang === 'en' ? 'All-Electric Servomotor' : 'Servomotor totalmente eléctrico', value: '12t-600mm' },
      { label: lang === 'en' ? 'CNC Press Brake' : 'Plegadora CNC', value: '12T' },
      { label: lang === 'en' ? 'Stroke' : 'Carrera', value: '420 mm' },
      { label: lang === 'en' ? 'Machine size' : 'Tamaño de la máquina', value: 'Y-axis maximum fast' },
    ],
  },
  {
    slug: 'dobladora-de-alambre',
    name: lang === 'en' ? 'Wire Bending Machine' : 'Dobladora de alambre',
    category: lang === 'en' ? 'Bending' : 'Dobladoras',
    image: '/images/dobladora-alambre-new.png',
    datasheet: '/fichas-tecnicas/F. DOBLADORA DE ALAMBRE.pdf',
    title: lang === 'en' ? 'MT-DAL 3-AXIS MODEL' : 'MT-DAL MODELO 3 EJES',
    specs: [
      { label: lang === 'en' ? 'Wire bending' : 'Dobladora de alambre', value: lang === 'en' ? '3-axis' : 'de 3 ejes' },
      { label: lang === 'en' ? 'Capacity' : 'Capacidad', value: lang === 'en' ? '1 transformer' : '1 transformador' },
      { label: lang === 'en' ? 'Weight (KG)' : 'Peso (KG)', value: '2500 kg' },
      { label: lang === 'en' ? 'Axis' : 'Eje', value: '3' },
    ],
  },
  {
    slug: 'robot-soldadura-laser',
    name: lang === 'en' ? 'Laser Welding Robot' : 'Robot soldadura laser',
    category: 'Robots',
    image: '/images/robot-soldadura-laser-new.png',
    datasheet: '/fichas-tecnicas/F. ROBOT SOLDADURA LÁSER.pdf',
    title: lang === 'en' ? 'LASER WELDING ROBOT' : 'ROBOT SOLDADURA LASER',
    specs: [
      { label: lang === 'en' ? 'Payload' : 'Carga util', value: '10kg' },
      { label: lang === 'en' ? 'Reach' : 'Alcance', value: '1500mm' },
      { label: lang === 'en' ? 'Structure' : 'Eatructura', value: lang === 'en' ? 'Articulated' : 'Articulado' },
      { label: lang === 'en' ? 'Axes' : 'Ejes', value: '6' },
    ],
  },
  {
    slug: 'robot-corte-laser',
    name: lang === 'en' ? 'Laser Cutting Robot' : 'Robot corte laser',
    category: 'Robots',
    image: '/images/robot-corte-laser-new.png',
    datasheet: '/fichas-tecnicas/F. ROBOT CORTE LÁSER.pdf',
    title: lang === 'en' ? 'LASER CUTTING ROBOT' : 'ROBOT CORTE LASER',
    specs: [
      { label: lang === 'en' ? 'Number of axes' : 'Número de ejes', value: '6' },
      { label: lang === 'en' ? 'Payload' : 'Carga util', value: '0 kg' },
      { label: lang === 'en' ? 'Weight' : 'Peso', value: '150 kg' },
      { label: lang === 'en' ? 'Temperature' : 'Temperature', value: '5 °c 45 °c' },
    ],
  },
  {
    slug: 'paneladora-maindsteel',
    name: lang === 'en' ? 'Maindsteel Paneler' : 'Paneladora Maindsteel',
    category: lang === 'en' ? 'Paneling' : 'Paneladoras',
    image: '/images/paneladora-maindsteel-new.png',
    datasheet: '/fichas-tecnicas/F. PANELADORA.pdf',
    title: lang === 'en' ? 'MT-P900 PANEL BENDER' : 'MODELO MT-P900 PANELADORA',
    specs: [
      { label: lang === 'en' ? 'Equipment size' : 'Tamaño del equipo', value: '13 ton' },
      { label: lang === 'en' ? 'Power' : 'Potencia', value: '20 kw' },
      { label: lang === 'en' ? 'Max bending height' : 'Altura máxima de flexión', value: '170 mm' },
      { label: lang === 'en' ? 'Min bending height' : 'Altura mínima de flexión', value: '4 mm' },
    ],
  },
  {
    slug: 'montacargas-compacto',
    name: lang === 'en' ? 'Compact Forklift' : 'Montacargas compacto',
    category: lang === 'en' ? 'Forklifts' : 'Montacargas',
    image: '/images/producto-montacargas-compacto.png',
    datasheet: '/fichas-tecnicas/F.MINI MONTACARGAS.pdf',
    title: lang === 'en' ? 'COMPACT MODEL FORKLIFT' : 'MONTACARGAS MODELO COMPACTO',
    specs: [
      { label: lang === 'en' ? 'Net weight' : 'Peso neto', value: '720kg' },
      { label: lang === 'en' ? 'Total height' : 'Altura total', value: '1580mm' },
      { label: lang === 'en' ? 'Battery' : 'Batería', value: '48 V /45 Ah' },
      { label: lang === 'en' ? 'Width' : 'Ancho', value: '780mm' },
    ],
  },
  {
    slug: 'robot-soldadura-mig',
    name: lang === 'en' ? 'MIG Welding Robot' : 'Robot soldadura MIG',
    category: 'Robots',
    image: '/images/robot-soldadura-mig-new.png',
    datasheet: '/fichas-tecnicas/F. ROBOT SOLDADURA MIG.pdf',
    title: lang === 'en' ? 'MIG WELDING ROBOT' : 'ROBOT SOLDADURA MIG',
    specs: [
      { label: lang === 'en' ? 'Payload' : 'Carga útil', value: '10kg' },
      { label: lang === 'en' ? 'Reach' : 'Alcance', value: '1500mm' },
      { label: lang === 'en' ? 'Structure' : 'Estructura', value: lang === 'en' ? 'Articulated' : 'Articulado' },
      { label: lang === 'en' ? 'Axes' : 'Ejes', value: '6' },
    ],
  },
  {
    slug: 'robot-proposito-general',
    name: lang === 'en' ? 'General Purpose Robot' : 'Robot propósito general',
    category: 'Robots',
    image: '/images/robot-proposito-general-new.png',
    datasheet: '/fichas-tecnicas/F. ROBOT GENERAL.pdf',
    title: lang === 'en' ? 'GENERAL PURPOSE ROBOT' : 'ROBOT PROPOSITO GENERAL',
    specs: [
      { label: lang === 'en' ? 'Payload' : 'Carga útil', value: '20kg' },
      { label: lang === 'en' ? 'Reach' : 'Alcance', value: '1850mm' },
      { label: lang === 'en' ? 'Weight (KG)' : 'Peso (KG)', value: '250kg' },
      { label: lang === 'en' ? 'Axis' : 'Eje', value: '6' },
    ],
  },
  {
    slug: 'robot-pintura-polvo',
    name: lang === 'en' ? 'Powder Painting Robot' : 'Robot pintura en polvo',
    category: 'Robots',
    image: '/images/robot-pintura-polvo-new.png',
    datasheet: '/fichas-tecnicas/F. ROBOT PINTURA EN POLVO.pdf',
    title: lang === 'en' ? 'POWDER PAINTING ROBOT' : 'ROBOT PINTURA EN POLVO',
    specs: [
      { label: lang === 'en' ? 'Payload' : 'Carga útil', value: '6kg' },
      { label: lang === 'en' ? 'Reach' : 'Alcance', value: '1500mm' },
      { label: lang === 'en' ? 'Weight (KG)' : 'Peso (KG)', value: '150kg' },
      { label: lang === 'en' ? 'Axis' : 'Eje', value: '6' },
    ],
  },
  {
    slug: 'robot-pintura-liquida',
    name: lang === 'en' ? 'Liquid Painting Robot' : 'Robot pintura líquida',
    category: 'Robots',
    image: '/images/robot-pintura-liquida-new.png',
    datasheet: '/fichas-tecnicas/F. ROBOT PINRTURA LÍQUIDA.pdf',
    title: lang === 'en' ? 'LIQUID PAINTING ROBOT' : 'ROBOT PINTURA LÍQUIDA',
    specs: [
      { label: lang === 'en' ? 'Payload' : 'Carga útil', value: '6kg' },
      { label: lang === 'en' ? 'Reach' : 'Alcance', value: '1500mm' },
      { label: lang === 'en' ? 'Weight (KG)' : 'Peso (KG)', value: '150kg' },
      { label: lang === 'en' ? 'Axis' : 'Eje', value: '6' },
    ],
  },
]

export type Post = {
  slug: string
  title: string
  excerpt: string
  image: string
  featured?: boolean
  recent?: boolean
}

export const getPosts = (lang: 'es' | 'en' = 'es'): Post[] => [
  {
    slug: 'como-elegir-un-robot-para-corte-laser',
    title: lang === 'en' ? 'How to choose a robot for laser cutting?' : '¿Cómo elegir un robot para corte láser?',
    excerpt:
      lang === 'en' 
        ? 'In today\'s industrial environment, where precision, speed, and efficiency are key to maintaining competitiveness.'
        : 'En el entorno industrial actual, donde la precisión, velocidad y eficiencia son clave para mantener la competitividad.',
    image: '/images/blog-corte-laser.png',
    recent: true,
  },
  {
    slug: 'errores-comunes-al-integrar-automatizacion',
    title: lang === 'en' ? 'Common mistakes when integrating automation in the industry' : 'Errores comunes al integrar automatización en la industria',
    excerpt: lang === 'en' ? 'Avoid them to ensure a successful implementation.' : 'Evítalos para asegurar una implementación exitosa.',
    image: '/images/blog-errores.png',
    featured: true,
    recent: true,
  },
  {
    slug: 'que-procesos-automatizar-primero-con-robots',
    title: lang === 'en' ? 'What processes to automate first with robots?' : '¿Qué procesos automatizar primero con robots?',
    excerpt: lang === 'en' ? 'Practical guide to take the first step towards industrial automation.' : 'Guía práctica para dar el primer paso hacia la automatización industrial.',
    image: '/images/blog-procesos.png',
  },
]
