import React, { useState } from 'react';
import { X, Cpu, ArrowRight, Package, Wrench, ArrowLeft } from 'lucide-react';
import { getCatalogItems, getProductosItems, getProcesosItems } from '../catalogData';
import { sound } from '../soundEffects';
import { ItemClassification } from '../types';

interface CatalogGridProps {
  onSelectSolution: (solutionName: string) => void;
}

export const CatalogGrid: React.FC<CatalogGridProps> = ({
  onSelectSolution
}) => {
  const [filter, setFilter] = useState<'all' | ItemClassification>('all');
  const [lang] = useState<'es' | 'en'>(typeof document !== 'undefined' && document.cookie.includes('x-lang=en') ? 'en' : 'es');

  const CATALOG_ITEMS = getCatalogItems(lang);
  const PRODUCTOS_ITEMS = getProductosItems(lang);
  const PROCESOS_ITEMS = getProcesosItems(lang);
  
  const filteredItems = CATALOG_ITEMS.filter(item => {
    if (filter === 'producto') return item.category === 'producto';
    if (filter === 'proceso') return item.category === 'proceso';
    return true;
  });

  return (
    <>
      <div className="w-full max-w-5xl mx-auto bg-[#021D49] border border-[#AA2D29]/70 rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-200">
        {/* Modal Top Bar */}
        <div className="bg-[#011538] border-b border-slate-800 px-5 py-3.5 flex items-center justify-center">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-6 h-6 text-[#AA2D29]" />
            <span className="font-bold text-base sm:text-lg text-white tracking-[0.15em] uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {lang === 'en' ? 'INDUSTRIAL CATALOG \u2022 B2B PRODUCTS & PROCESSES' : 'CATÁLOGO INDUSTRIAL \u2022 PRODUCTOS Y PROCESOS B2B'}
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#011538]/70 px-5 py-2.5 border-b border-slate-800 flex gap-2 text-xs font-bold">
          <button
            onClick={() => { sound.playKeyClick(); setFilter('all'); }}
            className={`px-3.5 py-1.5 rounded-lg uppercase tracking-wider transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-[#AA2D29] text-white shadow-sm'
                : 'bg-[#021D49] text-slate-300 hover:bg-[#062a63]'
            }`}
          >
            Todo ({CATALOG_ITEMS.length})
          </button>
          <button
            onClick={() => { sound.playKeyClick(); setFilter('producto'); }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg uppercase tracking-wider transition-colors cursor-pointer ${
              filter === 'producto'
                ? 'bg-[#AA2D29] text-white shadow-sm'
                : 'bg-[#021D49] text-slate-300 hover:bg-[#062a63]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Products' : 'Productos'} ({PRODUCTOS_ITEMS.length})</span>
          </button>
          <button
            onClick={() => { sound.playKeyClick(); setFilter('proceso'); }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg uppercase tracking-wider transition-colors cursor-pointer ${
              filter === 'proceso'
                ? 'bg-[#AA2D29] text-white shadow-sm'
                : 'bg-[#021D49] text-slate-300 hover:bg-[#062a63]'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Processes' : 'Procesos'} ({PROCESOS_ITEMS.length})</span>
          </button>
        </div>

        {/* Catalog Grid */}
        <div className="p-5 overflow-y-auto max-h-[68vh] grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#011538] border border-slate-700/80 hover:border-[#AA2D29] rounded-xl p-4 flex flex-col justify-between transition-all group hover:shadow-lg hover:shadow-[#AA2D29]/10"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-bold text-sm text-white group-hover:text-slate-100 flex items-center gap-1.5">
                      {item.name}
                    </h3>
                    <span className={`inline-block mt-0.5 text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                      item.category === 'proceso' ? 'bg-amber-600/30 text-amber-300' : 'bg-blue-600/30 text-blue-300'
                    }`}>
                      {item.category === 'proceso' 
                        ? (lang === 'en' ? 'Industrial Process' : 'Proceso Industrial')
                        : (lang === 'en' ? 'Product / Machinery' : 'Producto / Maquinaria')}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#021D49] border border-slate-700 text-slate-300 shrink-0">
                    {item.industrialCode}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mb-3 leading-relaxed font-sans font-normal">
                  {item.shortDesc}
                </p>
                <div className="space-y-1.5 mb-4 border-t border-slate-800/80 pt-2.5">
                  {item.specs.map((spec, i) => (
                    <div key={i} className="text-[11px] text-slate-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#AA2D29] shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playKeyClick();
                  onSelectSolution(item.name);
                }}
                className="w-full mt-2 py-2.5 px-3 bg-[#021D49] hover:bg-[#AA2D29] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 border border-slate-700 hover:border-[#AA2D29] transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <span>{lang === 'en' ? `Quote this ${item.category === 'producto' ? 'product' : 'process'}` : `Cotizar este ${item.category}`}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="w-full max-w-5xl mx-auto mt-4 px-2 flex justify-start">
        <button
          onClick={() => {
            sound.playKeyClick();
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
              window.location.href = 'http://localhost:3000/';
            } else {
              window.location.href = '/';
            }
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#011538] hover:bg-[#AA2D29] border border-[#AA2D29]/60 hover:border-[#AA2D29] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-xl active:scale-95 group"
          title="Regresar a la página de inicio"
        >
          <ArrowLeft className="w-4 h-4 text-[#AA2D29] group-hover:text-white transition-colors" />
          <span>{lang === 'en' ? 'Go to Home' : 'Ir al Inicio'}</span>
        </button>
      </div>
    </>
  );
};
