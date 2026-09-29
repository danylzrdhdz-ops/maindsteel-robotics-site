import React from 'react';
import { QuoteSession } from '../types';
import { sound } from '../soundEffects';
import { FileText, RotateCcw, ShieldCheck, Building2, User, Mail, Globe, Wrench, Download, ArrowLeft } from 'lucide-react';

interface TicketSummaryProps {
  session: QuoteSession;
  onRestart: () => void;
  onOpenPdfModal: () => void;
  onBack?: () => void;
}

export const TicketSummary: React.FC<TicketSummaryProps> = ({ session, onRestart, onOpenPdfModal, onBack }) => {
  return (
    <div className="bg-[#011538] border border-[#AA2D29]/60 rounded-xl p-5 sm:p-6 mt-4 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
        <div>
          <span className="text-xs sm:text-sm text-white font-bold tracking-[0.15em] uppercase flex items-center gap-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <ShieldCheck className="w-4 h-4 text-[#AA2D29]" />
            RESUMEN DE SOLICITUD REGISTRADA
          </span>
          <p className="text-[11px] text-slate-400 font-mono mt-0.5">
            FOLIO: {session.quoteReferenceId || 'MSR-COT-ACTIVO'} &bull; {session.completedAt || 'Hoy'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={() => {
                sound.playKeyClick();
                onBack();
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#021D49] hover:bg-[#062a63] border border-slate-700 text-slate-200 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#AA2D29]" />
              <span>Regresar</span>
            </button>
          )}

          <button
            onClick={() => {
              sound.playKeyClick();
              onOpenPdfModal();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#AA2D29] hover:bg-[#c43530] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ficha en PDF</span>
          </button>

          <button
            onClick={() => {
              sound.playKeyClick();
              onRestart();
            }}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#021D49] hover:bg-[#062a63] border border-slate-700 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Nueva Cotización</span>
          </button>
        </div>
      </div>

      {/* Grid of registered details (Modern, clean, legible) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
        <div className="bg-[#021D49]/80 p-3.5 rounded-lg border border-slate-700/60">
          <div className="flex items-center justify-between gap-1 text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">
            <span className="flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-[#AA2D29]" />
              <span>Solución Solicitada</span>
            </span>
            <span className={`px-2 py-0.5 rounded text-[9px] font-black ${
              session.itemCategory === 'proceso' ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40' : 'bg-blue-600/30 text-blue-300 border border-blue-500/40'
            }`}>
              {session.itemCategory === 'proceso' ? 'PROCESO' : 'PRODUCTO'}
            </span>
          </div>
          <div className="text-white font-bold text-sm">
            {session.product}
          </div>
        </div>

        <div className="bg-[#021D49]/80 p-3.5 rounded-lg border border-slate-700/60">
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">
            <Building2 className="w-3.5 h-3.5 text-[#AA2D29]" />
            <span>Empresa Solicitante</span>
          </div>
          <div className="text-white font-bold text-sm">
            {session.company}
          </div>
        </div>

        <div className="bg-[#021D49]/80 p-3.5 rounded-lg border border-slate-700/60">
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">
            <User className="w-3.5 h-3.5 text-[#AA2D29]" />
            <span>Contacto Técnico</span>
          </div>
          <div className="text-white font-bold text-sm">
            {session.clientName}
          </div>
        </div>

        <div className="bg-[#021D49]/80 p-3.5 rounded-lg border border-slate-700/60">
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">
            <Mail className="w-3.5 h-3.5 text-[#AA2D29]" />
            <span>Contacto</span>
          </div>
          <div className="text-white font-bold text-sm truncate">
            {session.email}
          </div>
        </div>

        <div className="bg-[#021D49]/80 p-3.5 rounded-lg border border-slate-700/60">
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">
            <Globe className="w-3.5 h-3.5 text-[#AA2D29]" />
            <span>Destino de Embarque</span>
          </div>
          <div className="text-white font-bold text-sm">
            {session.country}
          </div>
        </div>

        <div className="bg-[#021D49]/80 p-3.5 rounded-lg border border-slate-700/60">
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#AA2D29]" />
            <span>Atención Comercial</span>
          </div>
          <div className="text-emerald-400 font-bold text-sm">
            Respuesta en &lt; 5 minutos
          </div>
        </div>
      </div>

      <div className="mt-3 bg-[#021D49]/80 p-3.5 rounded-lg border border-slate-700/60">
        <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">
          Descripción del Proyecto
        </div>
        <div className="text-slate-200 text-xs sm:text-sm leading-relaxed">
          {session.project}
        </div>
      </div>
    </div>
  );
};
