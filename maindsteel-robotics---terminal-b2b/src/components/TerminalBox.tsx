import React, { useState } from 'react';
import { Check, Shield, ArrowRight, ArrowLeft, User, Package, Wrench, Sparkles } from 'lucide-react';
import { sound } from '../soundEffects';
import { getQuickOptions, getProductosItems, getProcesosItems } from '../catalogData';
import { ChatStep, ItemClassification } from '../types';

interface MessageCardProps {
  step: ChatStep;
  sender: 'bot' | 'user';
  title?: string;
  body: string;
  followUp?: string;
  promptHint?: string;
  timestamp?: string;
  onQuickSelect?: (value: string) => void;
  disabled?: boolean;
  onOpenPdfModal?: () => void;
  onRestart?: () => void;
  onBack?: () => void;
  itemCategory?: ItemClassification;
}

export const MessageCard: React.FC<MessageCardProps> = ({
  step,
  sender,
  title,
  body,
  followUp,
  promptHint,
  timestamp,
  onQuickSelect,
  disabled = false,
  onOpenPdfModal,
  onRestart,
  onBack,
  itemCategory,
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'producto' | 'proceso'>('all');
  const [lang] = useState<'es' | 'en'>(typeof document !== 'undefined' && document.cookie.includes('x-lang=en') ? 'en' : 'es');

  const QUICK_OPTIONS = getQuickOptions(lang);
  const PRODUCTOS_ITEMS = getProductosItems(lang);
  const PROCESOS_ITEMS = getProcesosItems(lang);

  // Clean any stray ASCII line characters
  const cleanBody = body
    .replace(/[=]{3,}/g, '')
    .replace(/[-]{3,}/g, '')
    .replace(/[┌┐└┘├┤│─]/g, '')
    .trim();

  const cleanFollowUp = followUp
    ? followUp.replace(/[=]{3,}/g, '').replace(/[-]{3,}/g, '').trim()
    : null;

  if (sender === 'user') {
    return (
      <div className="flex justify-end my-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
        <div className="bg-[#AA2D29] border border-[#AA2D29] rounded-lg p-3.5 sm:p-4 max-w-lg shadow-lg">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-red-100 flex items-center gap-1">
              <User className="w-3 h-3 text-red-100" />
              Tu Respuesta
            </span>
            {timestamp && <span className="text-[10px] text-red-200 font-mono">{timestamp}</span>}
          </div>
          <p className="text-sm sm:text-base font-semibold text-white leading-relaxed font-sans">
            {cleanBody}
          </p>
        </div>
      </div>
    );
  }

  // Paso 5: Modern Graphic Success Screen
  if (step === 5) {
    return (
      <div className="my-6 animate-in zoom-in-95 duration-300">
        <div className="bg-[#011538] border-2 border-[#AA2D29] rounded-xl p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#AA2D29] to-transparent" />

          {/* Giant Clean Checkmark Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#AA2D29]/15 border-2 border-[#AA2D29] flex items-center justify-center shadow-lg shadow-[#AA2D29]/20">
              <Check className="w-12 h-12 sm:w-14 sm:h-14 text-white stroke-[3]" />
            </div>
          </div>

          {/* Category Tag */}
          {itemCategory && (
            <div className="mb-2">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#AA2D29] text-white">
                {itemCategory === 'producto' ? 'Producto Industrial' : 'Proceso de Ingeniería'}
              </span>
            </div>
          )}

          {/* Operation Success Title */}
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-[0.2em] uppercase mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            SOLICITUD ENVIADA
          </h2>

          {/* Main Success Confirmation Message (Removido textos de estatus según instrucciones) */}

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
            {onBack && (
              <button
                onClick={() => {
                  sound.playKeyClick();
                  onBack();
                }}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 hover:text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center gap-2 active:scale-95 shadow-sm"
              >
                <ArrowLeft className="w-4 h-4 text-[#AA2D29]" />
                <span>{lang === 'en' ? 'Back' : 'Regresar'}</span>
              </button>
            )}

            {onOpenPdfModal && (
              <button
                onClick={() => {
                  sound.playKeyClick();
                  onOpenPdfModal();
                }}
                className="px-5 py-2.5 bg-[#AA2D29] hover:bg-[#c43530] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-lg shadow-xl hover:shadow-[#AA2D29]/30 transition-all cursor-pointer flex items-center gap-2 active:scale-95"
              >
                <span>{lang === 'en' ? 'Download Graphic PDF Sheet' : 'Descargar Ficha Gráfica en PDF'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {onRestart && (
              <button
                onClick={() => {
                  sound.playKeyClick();
                  onRestart();
                }}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 hover:text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                {lang === 'en' ? 'New Quote' : 'Nueva Cotización'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Filter options in Paso 1
  const displayedOptions = QUICK_OPTIONS.filter((opt) => {
    if (activeCategoryFilter === 'producto') return opt.category === 'producto';
    if (activeCategoryFilter === 'proceso') return opt.category === 'proceso';
    return true;
  });

  return (
    <div className="my-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="bg-slate-800 border border-[#AA2D29] rounded-xl p-4 sm:p-5 shadow-xl relative">
        {/* Header with Brand */}
        <div className="flex items-center justify-between gap-3 mb-3 border-b border-slate-800/80 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#AA2D29] flex items-center justify-center text-white shadow-sm">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-xs tracking-[0.15em] text-white uppercase block" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                MAINDSTEEL ROBOTICS
              </span>
              <span className="text-[10px] text-slate-400 font-medium">{lang === 'en' ? 'B2B Commercial Advisor' : 'Asesor Comercial B2B'}</span>
            </div>
          </div>

          {timestamp && (
            <span className="text-[10px] text-slate-400 font-mono">{timestamp}</span>
          )}
        </div>

        {/* Clear & Legible Message Content */}
        <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed font-sans">
          {cleanBody}
        </p>

        {/* Paso 1: Interactive Classified Options (Productos vs Procesos) */}
        {step === 1 && onQuickSelect && (
          <div className="mt-4 pt-4 border-t border-slate-800">
            {/* Category Filter Selector */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#AA2D29] inline-block" />
                <span>{lang === 'en' ? 'Catalog Classification:' : 'Clasificación de Catálogo:'}</span>
              </span>

              <div className="flex items-center gap-1.5 bg-[#021D49] p-1 rounded-lg border border-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    sound.playKeyClick();
                    setActiveCategoryFilter('all');
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeCategoryFilter === 'all'
                      ? 'bg-[#AA2D29] text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'en' ? 'All' : 'Todo'} ({QUICK_OPTIONS.length})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playKeyClick();
                    setActiveCategoryFilter('producto');
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeCategoryFilter === 'producto'
                      ? 'bg-[#AA2D29] text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Package className="w-3 h-3" />
                  <span>{lang === 'en' ? 'Products' : 'Productos'} ({PRODUCTOS_ITEMS.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playKeyClick();
                    setActiveCategoryFilter('proceso');
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeCategoryFilter === 'proceso'
                      ? 'bg-[#AA2D29] text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Wrench className="w-3 h-3" />
                  <span>{lang === 'en' ? 'Processes' : 'Procesos'} ({PROCESOS_ITEMS.length})</span>
                </button>
              </div>
            </div>

            {/* Grid of Classified Solution Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {displayedOptions.map((opt) => (
                <button
                  key={opt.num}
                  disabled={disabled}
                  onClick={() => {
                    sound.playKeyClick();
                    onQuickSelect(opt.value);
                  }}
                  className="flex items-center justify-between px-3.5 py-2.5 bg-[#021D49] hover:bg-[#AA2D29] disabled:opacity-50 disabled:hover:bg-[#021D49] border border-slate-700/80 hover:border-[#AA2D29] rounded-lg text-left transition-all duration-150 group cursor-pointer active:scale-95 shadow-sm"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-5 h-5 rounded bg-[#AA2D29] group-hover:bg-white text-white group-hover:text-[#AA2D29] text-[10px] font-black flex items-center justify-center shrink-0 transition-colors">
                      {opt.num}
                    </span>
                    <div className="min-w-0">
                      <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white block truncate">
                        {opt.label}
                      </span>
                      <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 group-hover:text-red-100 block">
                        {opt.category === 'producto' ? 'Producto' : 'Proceso'}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white shrink-0 ml-1 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
