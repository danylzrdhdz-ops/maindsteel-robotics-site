import { QUICK_OPTIONS, CATALOG_ITEMS } from './catalogData';
import { ItemClassification } from './types';

export const PASO_1_DATA = (lang: string = 'es') => ({
  title: "M A I N D S T E E L   R O B O T I C S",
  body: lang === 'en' ? "Welcome to Maindsteel Robotics. Please indicate which product (machinery/robotics) or industrial process you would like to quote." : "Bienvenido a Maindsteel Robotics. Por favor indique qué producto (maquinaria/robótica) o proceso industrial desea cotizar.",
  promptHint: lang === 'en' ? "Select an option by category or type the name / number:" : "Selecciona una opción por categoría o escribe el nombre / número:"
});

export const PASO_2_DATA = (lang: string = 'es') => ({
  title: "M A I N D S T E E L   R O B O T I C S",
  body: lang === 'en' ? "Sure, I'd gladly assist you. To properly register the project, what is your Name?" : "Claro que sí, con gusto te apoyo. Para canalizar el proyecto, ¿cuál es tu Nombre?"
});

export const PASO_3_DATA = (lang: string = 'es') => ({
  title: "M A I N D S T E E L   R O B O T I C S",
  body: lang === 'en' ? "Thank you. What is the name of your Company or Organization?" : "Gracias. ¿Cuál es el nombre de tu Empresa?"
});

export const PASO_4_DATA = (lang: string = 'es') => ({
  title: "M A I N D S T E E L   R O B O T I C S",
  body: lang === 'en' ? "For what specific Project do you need the equipment and what are your Technical Specifications?" : "¿Para qué Proyecto específico requieres el equipo y cuáles son tus Especificaciones?"
});

export const PASO_5_DATA = (lang: string = 'es') => ({
  title: "M A I N D S T E E L   R O B O T I C S",
  body: lang === 'en' ? "Understood. What are your Contact details (Email or WhatsApp)?" : "Entendido. ¿Cuáles son tus datos de Contacto (Correo o WhatsApp)?"
});

export const PASO_6_DATA = (lang: string = 'es') => ({
  title: "M A I N D S T E E L   R O B O T I C S",
  body: lang === 'en' ? "Excellent. Lastly, what Country or Region will the equipment be shipped to?" : "Excelente. Por último, ¿a qué País o región de entrega va dirigido el material?"
});

export function generatePaso7Data(producto: string, empresa: string, category: ItemClassification = 'producto', lang: string = 'es') {
  const prodClean = (producto || (lang === 'en' ? 'Machinery and Robotic Solutions' : 'Maquinaria y Soluciones Robóticas')).trim();
  const empClean = (empresa || (lang === 'en' ? 'your Company' : 'tu Empresa')).trim();
  const tipoLabel = category === 'proceso' 
    ? (lang === 'en' ? 'the process of' : 'el proceso de')
    : (lang === 'en' ? 'the product' : 'el producto');

  return {
    title: lang === 'en' ? "REQUEST SENT" : "SOLICITUD ENVIADA",
    body: lang === 'en' 
      ? `Your quotation request for ${tipoLabel} ${prodClean} for the company ${empClean} has been received.`
      : `Tu solicitud de cotización para ${tipoLabel} ${prodClean} para la empresa ${empClean} ha sido recibida.`,
    followUp: lang === 'en'
      ? "A commercial advisor from our team will contact you manually in less than 5 minutes to follow up."
      : "Un asesor comercial de nuestro equipo se comunicará contigo de forma manual en menos de 5 minutos para dar seguimiento."
  };
}

/**
 * Identify product or process from user input (number 1-15 or free text matching)
 */
export function identifySolution(input: string): { name: string; category: ItemClassification } {
  const trimmed = input.trim();
  const num = parseInt(trimmed, 10);
  if (!isNaN(num) && num >= 1 && num <= CATALOG_ITEMS.length) {
    const found = CATALOG_ITEMS.find(o => o.quickNumber === num);
    if (found) return { name: found.name, category: found.category };
  }

  const lower = trimmed.toLowerCase();

  // Exact or contains match in catalog items
  for (const item of CATALOG_ITEMS) {
    if (lower.includes(item.name.toLowerCase()) || item.name.toLowerCase().includes(lower)) {
      return { name: item.name, category: item.category };
    }
  }

  // Keywords for PRODUCTOS
  if (lower.includes('alambre')) return { name: 'Dobladora de alambre', category: 'producto' };
  if (lower.includes('cortina')) return { name: 'Dobladora de cortina', category: 'producto' };
  if (lower.includes('lámina') || lower.includes('lamina')) return { name: 'Dobladora de lámina', category: 'producto' };
  if (lower.includes('montacarga')) return { name: 'Montacargas', category: 'producto' };
  if (lower.includes('paneladora')) return { name: 'Paneladora', category: 'producto' };
  if (lower.includes('láser') || lower.includes('laser')) return { name: 'Robot Corte láser', category: 'producto' };
  if (lower.includes('soldadura') || lower.includes('mig')) return { name: 'Robot Soldadura MIG', category: 'producto' };
  if (lower.includes('líquida') || lower.includes('liquida')) return { name: 'Robot Pintura líquida', category: 'producto' };
  if (lower.includes('polvo')) return { name: 'Robot Pintura en polvo', category: 'producto' };
  if (lower.includes('propósito') || lower.includes('proposito') || lower.includes('general')) {
    return { name: 'Robot Propósitos generales', category: 'producto' };
  }
  if (lower.includes('pintura')) return { name: 'Robot Pintura líquida', category: 'producto' };

  // Keywords for PROCESOS
  if (lower.includes('automatizacion') || lower.includes('automatización')) {
    return { name: 'Automatización industrial', category: 'proceso' };
  }
  if (lower.includes('integracion') || lower.includes('integración')) {
    return { name: 'Integración de robots', category: 'proceso' };
  }
  if (lower.includes('proveedor') || lower.includes('comercializ')) {
    return { name: 'Comercialización a proveedores', category: 'proceso' };
  }
  if (lower.includes('venta')) {
    return { name: 'Venta de robots y maquinaria industrial', category: 'proceso' };
  }
  if (lower.includes('asesoria') || lower.includes('asesoría') || lower.includes('seleccion') || lower.includes('selección')) {
    return { name: 'Asesoría técnica y selección de equipo', category: 'proceso' };
  }

  return { name: trimmed || 'Solución Industrial', category: 'producto' };
}

export function identifyProduct(input: string): string {
  return identifySolution(input).name;
}

/**
 * Smart extract name and company from string
 */
export function parseNameAndCompany(input: string): { clientName: string; company: string } {
  const trimmed = input.trim();

  // Check for phrases like "mi empresa", "empresa", "de la empresa"
  const companyKeywordRegex = /\s+(?:mi\s+empresa\s+es\s+|mi\s+empresa\s+|empresa\s+|de\s+la\s+empresa\s+|para\s+la\s+empresa\s+|de\s+)/i;
  const matchKeyword = trimmed.match(companyKeywordRegex);
  if (matchKeyword && matchKeyword.index !== undefined && matchKeyword.index > 0) {
    const namePart = trimmed.slice(0, matchKeyword.index).trim();
    const compPart = trimmed.slice(matchKeyword.index + matchKeyword[0].length).trim();
    if (namePart && compPart) {
      return {
        clientName: namePart,
        company: compPart
      };
    }
  }

  if (trimmed.includes(',')) {
    const parts = trimmed.split(',');
    return {
      clientName: parts[0]?.trim() || 'Cliente',
      company: parts.slice(1).join(',').trim() || 'Empresa'
    };
  }
  if (trimmed.includes('-')) {
    const parts = trimmed.split('-');
    return {
      clientName: parts[0]?.trim() || 'Cliente',
      company: parts.slice(1).join('-').trim() || 'Empresa'
    };
  }
  if (trimmed.includes('/')) {
    const parts = trimmed.split('/');
    return {
      clientName: parts[0]?.trim() || 'Cliente',
      company: parts.slice(1).join('/').trim() || 'Empresa'
    };
  }

  return {
    clientName: trimmed,
    company: trimmed
  };
}

/**
 * Smart extract project and corporate email
 */
export function parseProjectAndEmail(input: string): { project: string; email: string } {
  const trimmed = input.trim();
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i;
  const match = trimmed.match(emailRegex);

  if (match) {
    const email = match[1];
    const project = trimmed.replace(email, '').replace(/^[,/ -]+|[,/ -]+$/g, '').trim();
    return {
      project: project || 'Línea de producción industrial',
      email: email
    };
  }

  if (trimmed.includes(',')) {
    const parts = trimmed.split(',');
    return {
      project: parts[0]?.trim() || 'Línea de producción industrial',
      email: parts.slice(1).join(',').trim() || 'Pendiente'
    };
  }

  return {
    project: trimmed,
    email: 'Pendiente'
  };
}
