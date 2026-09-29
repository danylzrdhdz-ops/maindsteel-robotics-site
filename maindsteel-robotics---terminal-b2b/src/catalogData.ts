import { CatalogItem } from './types';

export const getCatalogItems = (lang: string = 'es'): CatalogItem[] => [
  // --- PRODUCTOS ---
  {
    id: 'dobladora-alambre',
    name: lang === 'en' ? 'Wire Bending Machine' : 'Dobladora de alambre',
    category: 'producto',
    type: 'product',
    quickNumber: 1,
    industrialCode: 'MSR-PRD-01',
    shortDesc: lang === 'en' 
      ? '2D/3D CNC wire bending machine with high-speed multi-axis servocontrol.' 
      : 'Máquina dobladora CNC de alambre 2D/3D con servocontrol multi-eje de alta velocidad.',
    specs: lang === 'en' 
      ? ['Gauges: 2.0 mm to 12.0 mm', 'Feed speed: up to 100 m/min', '360° servo-controlled rotary head']
      : ['Calibres: 2.0 mm a 12.0 mm', 'Velocidad de avance: hasta 100 m/min', 'Cabezal rotativo 360° servocontrolado']
  },
  {
    id: 'dobladora-cortina',
    name: lang === 'en' ? 'Press Brake' : 'Dobladora de cortina',
    category: 'producto',
    type: 'product',
    quickNumber: 2,
    industrialCode: 'MSR-PRD-02',
    shortDesc: lang === 'en'
      ? 'High precision CNC hydraulic and electro-hybrid press brake.'
      : 'Prensa dobladora hidráulica y electrohíbrida CNC de alta precisión y repetibilidad.',
    specs: lang === 'en'
      ? ['Nominal force: 40 to 600 Tons', 'Table length: 1,250 to 6,000 mm', 'Real-time hydraulic crowning compensation']
      : ['Fuerza nominal: 40 a 600 Toneladas', 'Longitud de mesa: 1,250 a 6,000 mm', 'Compensación de flexión hidráulica en tiempo real']
  },
  {
    id: 'dobladora-lamina',
    name: lang === 'en' ? 'Sheet Metal Bender' : 'Dobladora de lámina',
    category: 'producto',
    type: 'product',
    quickNumber: 3,
    industrialCode: 'MSR-PRD-03',
    shortDesc: lang === 'en'
      ? 'Mechanical and CNC bender for industrial gauges in stainless steel and cold rolled.'
      : 'Dobladora mecánica y CNC para calibres industriales en acero inoxidable y rolado en frío.',
    specs: lang === 'en'
      ? ['Plate capacity up to 16 mm', 'Servo-driven multi-axis back gauges', 'Graphic CNC control with automatic layout calculation']
      : ['Capacidad de placa hasta 16 mm', 'Topes traseros multieje de servomotores', 'Control CNC gráfico con cálculo automático de desarrollo']
  },
  {
    id: 'montacargas',
    name: lang === 'en' ? 'Forklift' : 'Montacargas',
    category: 'producto',
    type: 'product',
    quickNumber: 4,
    industrialCode: 'MSR-PRD-04',
    shortDesc: lang === 'en'
      ? 'Industrial lifting and hauling equipment for maneuver yards and manufacturing plants.'
      : 'Equipos industriales de elevación y acarreo para patio de maniobras y naves de manufactura.',
    specs: lang === 'en'
      ? ['Load capacity: 1.5 to 10 Tons', 'Triple stage masts up to 7.5 meters', 'Fast charging Li-Ion / Dual Combustion Technology']
      : ['Capacidad de carga: 1.5 a 10 Toneladas', 'Mástiles triple etapa hasta 7.5 metros', 'Tecnología Litio-Ion de carga rápida / Combustión Dual']
  },
  {
    id: 'paneladora',
    name: lang === 'en' ? 'Panel Bender' : 'Paneladora',
    category: 'producto',
    type: 'product',
    quickNumber: 5,
    industrialCode: 'MSR-PRD-05',
    shortDesc: lang === 'en'
      ? 'Automatic panel forming and bending center without manual tool changes.'
      : 'Centro de conformado y doblado automático de paneles sin cambio manual de herramientas.',
    specs: lang === 'en'
      ? ['Max thickness: up to 3.2 mm carbon steel', '360° automatic manipulator rotation', 'Ultra-fast cycles for cabinets and switchboards']
      : ['Espesor máximo: hasta 3.2 mm acero al carbón', 'Rotación automática del manipulador 360°', 'Ciclos ultrarrápidos para gabinetes y tableros']
  },
  {
    id: 'robot-laser',
    name: lang === 'en' ? 'Laser Cutting Robot' : 'Robot Corte láser',
    category: 'producto',
    type: 'product',
    quickNumber: 6,
    industrialCode: 'MSR-PRD-06',
    shortDesc: lang === 'en'
      ? '3D robotic cell with optic fiber head for three-dimensional cutting of complex parts.'
      : 'Celda robótica 3D con cabezal de fibra óptica para corte tridimensional de piezas complejas.',
    specs: lang === 'en'
      ? ['Laser power: 2 kW to 12 kW Fiber', '6-axis arm with reach of 2,050 to 3,100 mm', 'Capacitive contour following head']
      : ['Potencia láser: 2 kW a 12 kW Fibra', 'Brazo 6 ejes con alcance de 2,050 a 3,100 mm', 'Cabezal capacitivo de seguimiento de contorno']
  },
  {
    id: 'robot-soldadura-mig',
    name: lang === 'en' ? 'MIG Welding Robot' : 'Robot Soldadura MIG',
    category: 'producto',
    type: 'product',
    quickNumber: 7,
    industrialCode: 'MSR-PRD-07',
    shortDesc: lang === 'en'
      ? 'Industrial articulated welding arm with synergistic MIG/MAG source and arc sensing.'
      : 'Brazo articulado de soldadura industrial con fuente sinérgica MIG/MAG y sensado por arco.',
    specs: lang === 'en'
      ? ['Repeatability: ±0.03 mm', '500A pulsed digital source with liquid cooling', 'Torch cleaning and wire cutting station']
      : ['Repetibilidad: ±0.03 mm', 'Fuente digital pulsada 500A con enfriamiento líquido', 'Estación de limpieza de antorcha y corte de alambre']
  },
  {
    id: 'robot-pintura-liquida',
    name: lang === 'en' ? 'Liquid Painting Robot' : 'Robot Pintura líquida',
    category: 'producto',
    type: 'product',
    quickNumber: 8,
    industrialCode: 'MSR-PRD-08',
    shortDesc: lang === 'en'
      ? 'Electrostatic liquid spray painting robotic system with ATEX certification.'
      : 'Sistema robótico de atomización electrostática de pintura líquida con certificación ATEX.',
    specs: lang === 'en'
      ? ['High-speed rotary bells (up to 60,000 RPM)', 'Precision volumetric dosing by gear pump', 'Class 1 Div 1 explosion-proof sealed design']
      : ['Campanas rotativas de alta velocidad (hasta 60,000 RPM)', 'Dosificación volumétrica de precisión por bomba de engranes', 'Diseño sellado a prueba de explosión clase 1 div 1']
  },
  {
    id: 'robot-pintura-polvo',
    name: lang === 'en' ? 'Powder Coating Robot' : 'Robot Pintura en polvo',
    category: 'producto',
    type: 'product',
    quickNumber: 9,
    industrialCode: 'MSR-PRD-09',
    shortDesc: lang === 'en'
      ? 'Robotic arm for thermosetting powder coating with uniform thickness control.'
      : 'Brazo robótico para recubrimiento en polvo termoendurecible con control de espesor uniforme.',
    specs: lang === 'en'
      ? ['Quick color change fluidized hoppers', 'Dynamic high voltage and electrostatic current control', 'Up to 30% savings in powder consumption']
      : ['Tolvas fluidizadas de cambio rápido de color', 'Control dinámico de voltaje y corriente electrostática', 'Ahorro de hasta 30% en consumo de polvo']
  },
  {
    id: 'robot-propositos-generales',
    name: lang === 'en' ? 'General Purpose Robot' : 'Robot Propósitos generales',
    category: 'producto',
    type: 'product',
    quickNumber: 10,
    industrialCode: 'MSR-PRD-10',
    shortDesc: lang === 'en'
      ? 'Versatile multi-axis industrial robot for pick & place, palletizing, assembly, and machining.'
      : 'Robot industrial multi-eje versátil para pick & place, paletizado, ensamble y maquinado.',
    specs: lang === 'en'
      ? ['Payload capacity: 6 kg to 500 kg', '6 and 7-axis kinematics with IP67 protection rating', 'High-speed controller with Profinet/EtherNet/IP comms']
      : ['Capacidad de carga útil: 6 kg a 500 kg', 'Cinemática de 6 y 7 ejes con grado de protección IP67', 'Controlador de alta velocidad con comunicación Profinet/EtherNet/IP']
  },

  // --- PROCESOS ---
  {
    id: 'automatizacion-industrial',
    name: lang === 'en' ? 'Industrial Automation' : 'Automatización industrial',
    category: 'proceso',
    type: 'service',
    quickNumber: 11,
    industrialCode: 'MSR-PRC-01',
    shortDesc: lang === 'en'
      ? 'Full development of continuous lines, PLC/SCADA control, IoT sensing, and distributed control.'
      : 'Desarrollo integral de líneas continuas, control PLC/SCADA, sensado IoT y control distribuido.',
    specs: lang === 'en'
      ? ['Electrical, pneumatic, and hydraulic engineering', 'Siemens TIA Portal & Rockwell Allen-Bradley integration', 'OEE monitoring and production telemetry']
      : ['Ingeniería eléctrica, neumática e hidráulica', 'Integración Siemens TIA Portal, Rockwell Allen-Bradley', 'Monitoreo OEE y telemetría de producción']
  },
  {
    id: 'integracion-robots',
    name: lang === 'en' ? 'Robot Integration' : 'Integración de robots',
    category: 'proceso',
    type: 'service',
    quickNumber: 12,
    industrialCode: 'MSR-PRC-02',
    shortDesc: lang === 'en'
      ? 'Turnkey engineering for robotic cells, precision tooling, and ISO 10218 safety.'
      : 'Ingeniería llave en mano de celdas robotizadas, utillajes de precisión y seguridad ISO 10218.',
    specs: lang === 'en'
      ? ['3D digital design and simulation (Digital Twin)', 'Perimeter fencing, light curtains, and interlocks', 'Functional safety certification and commissioning']
      : ['Diseño y simulación digital en 3D (Digital Twin)', 'Cerramientos perimetrales, cortinas ópticas y enclavamientos', 'Certificación de seguridad funcional y puesta a punto']
  },
  {
    id: 'comercializacion-proveedores',
    name: lang === 'en' ? 'Supplier Commercialization' : 'Comercialización a proveedores',
    category: 'proceso',
    type: 'service',
    quickNumber: 13,
    industrialCode: 'MSR-PRC-03',
    shortDesc: lang === 'en'
      ? 'Direct wholesale channel and supply programs for industrial inputs and OEM spare parts.'
      : 'Canal mayorista directo y programas de suministro de insumos industriales y refacciones OEM.',
    specs: lang === 'en'
      ? ['Laser cutting and welding consumables', 'Critical spare parts with priority dispatch', 'B2B corporate framework agreements']
      : ['Consumibles de corte láser y soldadura', 'Refacciones críticas con despacho prioritario', 'Convenios marco corporativos B2B']
  },
  {
    id: 'venta-robots-maquinaria',
    name: lang === 'en' ? 'Machine & Robot Sales' : 'Venta de robots y maquinaria industrial',
    category: 'proceso',
    type: 'service',
    quickNumber: 14,
    industrialCode: 'MSR-PRC-04',
    shortDesc: lang === 'en'
      ? 'Direct distribution and equipping of heavy CNC machinery and industrial robots.'
      : 'Distribución directa y equipamiento de maquinaria CNC pesada y robots industriales.',
    specs: lang === 'en'
      ? ['Extended manufacturer warranty', 'Specialized on-site installation, leveling, and anchoring', 'Certified technical training for operators']
      : ['Garantía extendida de fabricante', 'Instalación, nivelación y anclaje especializado en planta', 'Capacitación técnica certificada para operadores']
  },
  {
    id: 'asesoria-tecnica',
    name: lang === 'en' ? 'Technical Advisory' : 'Asesoría técnica y selección de equipo',
    category: 'proceso',
    type: 'service',
    quickNumber: 15,
    industrialCode: 'MSR-PRC-05',
    shortDesc: lang === 'en'
      ? 'Technical feasibility studies, tonnage calculation, cycle times, and ROI.'
      : 'Estudios de factibilidad técnica, cálculo de tonelaje, tiempos de ciclo y retorno de inversión.',
    specs: lang === 'en'
      ? ['Analysis of blueprints and manufacturing tolerances', 'Evaluation of installed capacity and bottlenecks', 'Technical report for optimal machinery selection']
      : ['Análisis de planos y tolerancias de manufactura', 'Evaluación de capacidad instalada y cuellos de botella', 'Dictamen técnico de selección de maquinaria óptima']
  }
];

export const getProductosItems = (lang: string = 'es') => getCatalogItems(lang).filter(item => item.category === 'producto');
export const getProcesosItems = (lang: string = 'es') => getCatalogItems(lang).filter(item => item.category === 'proceso');

export const getQuickOptions = (lang: string = 'es') => getCatalogItems(lang).map(item => ({
  num: item.quickNumber || 0,
  label: item.name,
  value: item.name,
  category: item.category
}));
/* Fallback constants for non-React files that might strictly need static export, defaulting to ES */
export const CATALOG_ITEMS = getCatalogItems('es');
