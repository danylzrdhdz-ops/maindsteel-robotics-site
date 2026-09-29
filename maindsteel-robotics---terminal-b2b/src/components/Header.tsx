import React from 'react';
import { Volume2, VolumeX, RotateCcw, BookOpen, Shield } from 'lucide-react';
import { sound } from '../soundEffects';

interface HeaderProps {
  onReset: () => void;
  onOpenCatalog: () => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  activeStep: number;
}

export const Header: React.FC<HeaderProps> = ({
  onReset,
  onOpenCatalog,
  audioEnabled,
  onToggleAudio,
}) => {
  return (
    <header className="w-full bg-[#011538] border-b border-slate-800 px-4 py-3 sm:px-8 shadow-xl relative z-20">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#AA2D29] flex items-center justify-center shadow-lg shadow-[#AA2D29]/20">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black text-white tracking-[0.18em] uppercase flex items-center gap-1.5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              M A I N D S T E E L
              <span className="text-[#AA2D29] font-black">ROBOTICS</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide">
              División de Automatización & Maquinaria Industrial
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Catalog Specs Button */}
          <button
            onClick={() => {
              sound.playKeyClick();
              onOpenCatalog();
            }}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#021D49] hover:bg-[#062a63] border border-slate-700 hover:border-[#AA2D29] text-xs font-bold text-slate-200 rounded-lg transition-all cursor-pointer active:scale-95"
            title="Ver catálogo de 11 soluciones industriales"
          >
            <BookOpen className="w-4 h-4 text-[#AA2D29]" />
            <span className="hidden sm:inline">Catálogo (11 Soluciones)</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleAudio}
            className="p-2 bg-[#021D49] hover:bg-[#062a63] border border-slate-700 text-slate-300 rounded-lg transition-colors cursor-pointer"
            title={audioEnabled ? 'Desactivar audio' : 'Activar audio'}
            aria-label="Alternar sonido"
          >
            {audioEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* New Quote / Reset */}
          <button
            onClick={() => {
              sound.playKeyClick();
              onReset();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#AA2D29] hover:bg-[#c43530] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow-md active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>
    </header>
  );
};
