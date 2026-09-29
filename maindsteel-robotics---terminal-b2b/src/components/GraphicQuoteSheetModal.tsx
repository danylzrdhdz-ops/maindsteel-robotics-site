import React, { useRef, useState } from 'react';
import { X, Download, Printer, Shield, CheckCircle2, QrCode, FileCheck, Building, User, Mail, Globe, Cpu, Wrench } from 'lucide-react';
import { QuoteSession } from '../types';
import { CATALOG_ITEMS } from '../catalogData';
import { sound } from '../soundEffects';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface GraphicQuoteSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: QuoteSession;
}

export const GraphicQuoteSheetModal: React.FC<GraphicQuoteSheetModalProps> = ({
  isOpen,
  onClose,
  session
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  // Find catalog item details if available
  const matchedItem = CATALOG_ITEMS.find(
    item => item.name.toLowerCase() === session.product.toLowerCase() ||
            session.product.toLowerCase().includes(item.name.toLowerCase())
  ) || CATALOG_ITEMS[0];

  const folio = session.quoteReferenceId || `MSR-COT-${Math.floor(100000 + Math.random() * 900000)}`;
  const currentDate = session.completedAt || new Date().toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleDownloadPDF = async () => {
    if (!sheetRef.current) return;
    try {
      sound.playKeyClick();
      setIsGenerating(true);

      const canvas = await html2canvas(sheetRef.current, {
        scale: 2, // High resolution for crisp PDF text and graphics
        useCORS: true,
        backgroundColor: '#FFFFFF',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      const cleanCompanyName = (session.company || 'B2B').replace(/[^a-zA-Z0-9]/g, '_');
      pdf.save(`Cotizacion_Maindsteel_${cleanCompanyName}_${folio}.pdf`);
      sound.playSuccessTone();
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    sound.playKeyClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl bg-[#011333] border-2 border-[#AA2D29] flex flex-col shadow-2xl max-h-[95vh] overflow-hidden my-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Control Bar */}
        <div className="bg-[#011333] border-b border-[#AA2D29] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-[#AA2D29]" />
            <span className="font-akira text-xs sm:text-sm text-white tracking-[0.2em] font-black">
              FICHA GRÁFICA DE COTIZACIÓN B2B
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#021D49] hover:bg-[#062a63] border border-slate-600 text-xs font-montserrat-black text-slate-200 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Imprimir</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#AA2D29] hover:bg-[#c43530] disabled:bg-slate-700 text-white text-xs font-montserrat-black uppercase tracking-wider transition-all cursor-pointer shadow-lg active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isGenerating ? 'Generando PDF...' : 'Descargar PDF'}</span>
            </button>

            <button
              onClick={() => {
                sound.playKeyClick();
                onClose();
              }}
              className="p-1.5 hover:bg-[#AA2D29] text-slate-300 hover:text-white transition-colors cursor-pointer ml-1"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-900 flex justify-center">
          {/* Printable Sheet Element (Clean White High-Grade Industrial Spec Sheet) */}
          <div
            ref={sheetRef}
            className="w-full max-w-[780px] bg-white text-slate-900 p-8 sm:p-10 shadow-2xl relative font-sans"
            style={{ minHeight: '1020px' }}
          >
            {/* Header with PANTONE 2768 C & PANTONE 7627 C */}
            <div className="border-b-4 border-[#021D49] pb-6 mb-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-9 h-9 bg-[#021D49] text-white flex items-center justify-center font-bold shadow-md">
                      <Shield className="w-6 h-6 text-[#AA2D29]" />
                    </div>
                    <div>
                      <h1 className="text-xl sm:text-2xl font-black text-[#021D49] tracking-[0.2em] uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        MAINDSTEEL
                        <span className="text-[#AA2D29] ml-2">ROBOTICS</span>
                      </h1>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                        Ingeniería en Automatización & Maquinaria Industrial Pesada
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="inline-block bg-[#021D49] text-white px-3 py-1 text-[11px] font-black uppercase tracking-wider mb-1">
                    COTIZACIÓN PRELIMINAR B2B
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-800">
                    FOLIO: <span className="text-[#AA2D29]">{folio}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    Fecha: {currentDate}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Vigencia de propuesta: 30 días naturales
                  </div>
                </div>
              </div>
            </div>

            {/* Client & Company Card */}
            <div className="bg-slate-50 border-l-4 border-[#AA2D29] p-4 mb-6 shadow-sm">
              <h2 className="text-xs font-black uppercase text-[#021D49] tracking-wider mb-3 flex items-center gap-1.5">
                <Building className="w-4 h-4 text-[#AA2D29]" />
                Datos de la Empresa Solicitante
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Razón Social / Empresa:</span>
                  <span className="font-bold text-slate-900 text-sm">{session.company || 'Empresa Industrial'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Contacto Responsable:</span>
                  <span className="font-semibold text-slate-800">{session.clientName || 'Ingeniero de Proyecto'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Contacto:</span>
                  <span className="font-semibold text-slate-800">{session.email || 'contacto@empresa.com'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Destino de Embarque / Planta:</span>
                  <span className="font-semibold text-slate-800">{session.country || 'Nave Industrial'}</span>
                </div>
              </div>
            </div>

            {/* Quoted Solution Details */}
            <div className="mb-6">
              <div className="bg-[#021D49] text-white px-4 py-2 flex items-center justify-between">
                <h2 className="text-xs font-black tracking-wider uppercase flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#AA2D29]" />
                  {matchedItem.category === 'proceso' ? 'Especificación del Proceso Industrial' : 'Especificación del Producto / Maquinaria'}
                </h2>
                <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 text-slate-200">
                  {matchedItem.industrialCode}
                </span>
              </div>

              <div className="border border-slate-200 p-4 bg-white">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="text-base font-black text-[#021D49]">
                      {session.product || matchedItem.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {matchedItem.shortDesc}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 bg-red-50 text-[#AA2D29] border border-[#AA2D29]/30 text-[10px] font-black uppercase shrink-0">
                    {matchedItem.category === 'proceso' ? 'Proceso Industrial' : 'Producto / Maquinaria'}
                  </span>
                </div>

                {/* Technical Specs List */}
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-2">
                    Características Técnicas Principales:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {matchedItem.specs.map((spec, i) => (
                      <div key={i} className="bg-slate-50 p-2.5 border border-slate-100 text-[11px] text-slate-700 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#AA2D29] shrink-0 mt-0.5" />
                        <span className="font-medium">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Specific Project Application */}
            <div className="mb-6 border border-slate-200 p-4 bg-slate-50/50">
              <h2 className="text-xs font-black uppercase text-[#021D49] tracking-wider mb-2 flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-[#AA2D29]" />
                Alcance y Aplicación de Proyecto
              </h2>
              <div className="bg-white p-3 border border-slate-200 text-xs text-slate-800 leading-relaxed font-medium">
                {session.project || 'Implementación y modernización de línea de manufactura industrial.'}
              </div>
            </div>

            {/* Industrial Warranty & Service Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-center">
              <div className="p-3 border border-slate-200 bg-white">
                <div className="text-[#AA2D29] font-black text-sm mb-0.5">&lt; 5 MINUTOS</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Contacto Asesor Senior</div>
              </div>
              <div className="p-3 border border-slate-200 bg-white">
                <div className="text-[#021D49] font-black text-sm mb-0.5">ISO 10218 / CE</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Normativa de Seguridad</div>
              </div>
              <div className="p-3 border border-slate-200 bg-white">
                <div className="text-[#021D49] font-black text-sm mb-0.5">DIRECTO OEM</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Refacciones & Soporte</div>
              </div>
            </div>

            {/* Signatures & Corporate Seal */}
            <div className="mt-8 pt-6 border-t-2 border-slate-200">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <div className="w-24 h-24 border border-dashed border-slate-300 flex flex-col items-center justify-center p-2 text-center bg-slate-50">
                    <QrCode className="w-12 h-12 text-[#021D49] mb-1" />
                    <span className="text-[8px] font-mono text-slate-500 leading-none">VALIDACIÓN B2B</span>
                  </div>
                </div>

                <div className="flex-1 max-w-xs text-center">
                  <div className="border-b-2 border-slate-400 pb-1 mb-1 font-serif italic text-sm text-slate-800 font-semibold">
                    Ingeniero Ramses Urista Pinedo
                  </div>
                  <div className="text-[10px] font-black uppercase text-[#021D49] tracking-wider">
                    Maindsteel Robotics S.A. de C.V.
                  </div>
                  <div className="text-[9px] text-slate-500">
                    División de Robótica y Maquinaria Pesada
                  </div>
                </div>

                <div className="text-right text-[9px] text-slate-400 max-w-[200px]">
                  Documento emitido electrónicamente con valor técnico informativo para proveedores y plantas industriales.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
