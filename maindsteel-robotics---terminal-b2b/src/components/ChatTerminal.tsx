import React, { useState, useRef, useEffect } from 'react';
import { Send, CornerDownLeft, FileText, ArrowRight, RotateCcw, ArrowLeft } from 'lucide-react';
import { ChatMessage, ChatStep, QuoteSession } from '../types';
import {
  PASO_1_DATA,
  PASO_2_DATA,
  PASO_3_DATA,
  PASO_4_DATA,
  PASO_5_DATA,
  PASO_6_DATA,
  generatePaso7Data,
  identifySolution
} from '../chatFlow';
import { sound } from '../soundEffects';
import { MessageCard } from './TerminalBox';
import { TicketSummary } from './TicketSummary';
import { GraphicQuoteSheetModal } from './GraphicQuoteSheetModal';

interface ChatTerminalProps {
  onOpenCatalog: () => void;
  externalSelectedSolution?: string | null;
  onClearExternalSolution?: () => void;
  onResetTrigger?: number;
}

export const ChatTerminal: React.FC<ChatTerminalProps> = ({
  onOpenCatalog,
  externalSelectedSolution,
  onClearExternalSolution,
  onResetTrigger
}) => {
  const [lang] = useState<'es' | 'en'>(typeof document !== 'undefined' && document.cookie.includes('x-lang=en') ? 'en' : 'es');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-p1',
      sender: 'bot',
      step: 1,
      title: PASO_1_DATA(lang).title,
      body: PASO_1_DATA(lang).body,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [currentStep, setCurrentStep] = useState<ChatStep>(1);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [session, setSession] = useState<QuoteSession>({
    product: '',
    rawProductName: '',
    clientName: '',
    company: '',
    project: '',
    email: '',
    country: ''
  });

  const [inputValue, setInputValue] = useState('');
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll on new messages
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, currentStep]);

  // Handle external reset trigger
  useEffect(() => {
    if (onResetTrigger && onResetTrigger > 0) {
      handleRestart();
    }
  }, [onResetTrigger]);

  // Handle external solution selection from catalog modal
  useEffect(() => {
    if (externalSelectedSolution) {
      handleSolutionSelection(externalSelectedSolution);
      if (onClearExternalSolution) {
        onClearExternalSolution();
      }
    }
  }, [externalSelectedSolution]);

  const handleRestart = () => {
    sound.playKeyClick();
    setCurrentStep(1);
    setSession({
      product: '',
      rawProductName: '',
      clientName: '',
      company: '',
      project: '',
      email: '',
      country: ''
    });
    setMessages([
      {
        id: `msg-p1-${Date.now()}`,
        sender: 'bot',
        step: 1,
        title: PASO_1_DATA(lang).title,
        body: PASO_1_DATA(lang).body,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setInputValue('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleBack = () => {
    sound.playKeyClick();

    if (currentStep <= 1) {
      // Regresa a la página de productos, puenteando a puerto 3000 si está en local
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.location.href = 'http://localhost:3000/productos';
      } else {
        window.location.href = '/productos';
      }
      return;
    }

    const previousStep = (currentStep - 1) as ChatStep;
    setCurrentStep(previousStep);

    // Conservar únicamente los pasos anteriores completados y la pregunta del bot del paso activo
    setMessages((prev) => {
      return prev.filter((m) => {
        if (m.step < previousStep) return true;
        if (m.step === previousStep && m.sender === 'bot') return true;
        return false;
      });
    });

    // Restaurar los datos anteriores al campo de entrada para facilitar su edición
    if (previousStep === 1) {
      setSession(prev => ({
        ...prev,
        product: '',
        rawProductName: '',
        itemCategory: undefined
      }));
      setInputValue('');
    } else if (previousStep === 2) {
      setInputValue(session.clientName || '');
      setSession(prev => ({ ...prev, clientName: '' }));
    } else if (previousStep === 3) {
      setInputValue(session.company || '');
      setSession(prev => ({ ...prev, company: '' }));
    } else if (previousStep === 4) {
      setInputValue(session.project || '');
      setSession(prev => ({ ...prev, project: '' }));
    } else if (previousStep === 5) {
      setInputValue(session.email || '');
      setSession(prev => ({ ...prev, email: '' }));
    } else if (previousStep === 6) {
      setInputValue(session.country || '');
      setSession(prev => ({ ...prev, country: '', completedAt: undefined, quoteReferenceId: undefined }));
    }

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleSolutionSelection = (solutionName: string) => {
    const { name, category } = identifySolution(solutionName);
    
    setSession(prev => {
      if (prev.rawProductName === solutionName) return prev; // Avoid rewriting identical data rapidly
      return {
        ...prev,
        product: name,
        itemCategory: category,
        rawProductName: solutionName
      };
    });

    setMessages(prev => {
      // Prevent duplicate step 1 user messages (React Strict Mode double trigger check)
      if (prev.some(m => m.sender === 'user' && m.step === 1)) return prev;

      // Add user message
      const userMsg: ChatMessage = {
        id: `usr-${Date.now()}`,
        sender: 'user',
        step: 1,
        body: solutionName,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      // Add bot Paso 2 message
      const botMsg: ChatMessage = {
        id: `bot-p2-${Date.now()}`,
        sender: 'bot',
        step: 2,
        title: PASO_2_DATA(lang).title,
        body: PASO_2_DATA(lang).body,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      return [...prev, userMsg, botMsg];
    });

    setCurrentStep(2);
    setInputValue('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanInput = inputValue.trim();
    if (!cleanInput) return;

    sound.playKeyClick();

    // Check for greeting / restart trigger
    const lower = cleanInput.toLowerCase();
    if (lower === 'hola' || lower === 'reiniciar' || lower === 'inicio' || lower === 'reset') {
      handleRestart();
      return;
    }

    if (currentStep === 1) {
      handleSolutionSelection(cleanInput);
      return;
    }

    if (currentStep === 2) {
      setSession(prev => ({ ...prev, clientName: cleanInput }));
      const userMsg: ChatMessage = {
        id: `usr-${Date.now()}`, sender: 'user', step: 2, body: cleanInput, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const botMsg: ChatMessage = {
        id: `bot-p3-${Date.now()}`, sender: 'bot', step: 3, title: PASO_3_DATA(lang).title, body: PASO_3_DATA(lang).body, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, userMsg, botMsg]);
      setCurrentStep(3);
      setInputValue('');
      setTimeout(() => inputRef.current?.focus(), 100);
      return;
    }

    if (currentStep === 3) {
      setSession(prev => ({ ...prev, company: cleanInput }));
      const userMsg: ChatMessage = {
        id: `usr-${Date.now()}`, sender: 'user', step: 3, body: cleanInput, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const botMsg: ChatMessage = {
        id: `bot-p4-${Date.now()}`, sender: 'bot', step: 4, title: PASO_4_DATA(lang).title, body: PASO_4_DATA(lang).body, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, userMsg, botMsg]);
      setCurrentStep(4);
      setInputValue('');
      setTimeout(() => inputRef.current?.focus(), 100);
      return;
    }

    if (currentStep === 4) {
      setSession(prev => ({ ...prev, project: cleanInput }));
      const userMsg: ChatMessage = {
        id: `usr-${Date.now()}`, sender: 'user', step: 4, body: cleanInput, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const botMsg: ChatMessage = {
        id: `bot-p5-${Date.now()}`, sender: 'bot', step: 5, title: PASO_5_DATA(lang).title, body: PASO_5_DATA(lang).body, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, userMsg, botMsg]);
      setCurrentStep(5);
      setInputValue('');
      setTimeout(() => inputRef.current?.focus(), 100);
      return;
    }

    if (currentStep === 5) {
      setSession(prev => ({ ...prev, email: cleanInput }));
      const userMsg: ChatMessage = {
        id: `usr-${Date.now()}`, sender: 'user', step: 5, body: cleanInput, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const botMsg: ChatMessage = {
        id: `bot-p6-${Date.now()}`, sender: 'bot', step: 6, title: PASO_6_DATA(lang).title, body: PASO_6_DATA(lang).body, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, userMsg, botMsg]);
      setCurrentStep(6);
      setInputValue('');
      setTimeout(() => inputRef.current?.focus(), 100);
      return;
    }

    if (currentStep === 6) {
      const country = cleanInput;
      const refId = `MSR-COT-${Math.floor(100000 + Math.random() * 900000)}`;
      const completedTime = new Date().toLocaleDateString('es-MX', {
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
      });

      const finalSession: QuoteSession = {
        ...session,
        country: country,
        quoteReferenceId: refId,
        completedAt: completedTime
      };
      setSession(finalSession);

      const userMsg: ChatMessage = {
        id: `usr-${Date.now()}`, sender: 'user', step: 6, body: country, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const paso7Data = generatePaso7Data(
        finalSession.product || '',
        finalSession.company || '',
        finalSession.itemCategory || 'producto',
        lang
      );

      const botMsg: ChatMessage = {
        id: `bot-p7-${Date.now()}`, sender: 'bot', step: 7, title: paso7Data.title, body: paso7Data.body, followUp: paso7Data.followUp, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, userMsg, botMsg]);
      setCurrentStep(7);
      setInputValue('');

      try {
        const datosFinales = {
          nombre: finalSession.clientName || '',
          empresa: finalSession.company || '',
          contacto: finalSession.email || '',
          requerimiento: finalSession.rawProductName || finalSession.product || '',
          especificaciones: finalSession.project || '',
          pais: finalSession.country || ''
        };

        const enviarA_GoogleSheets = async (datos: any) => {
          const urlWebhookGoogle = "https://script.google.com/macros/s/AKfycbwtRvyZ6saPXz2NLfd4gEGOtyu1wgIueipaVCY0CvBfEWgePYy__iFL1SNAUVltDYda0w/exec";
          
          try {
            await fetch(urlWebhookGoogle, {
              method: "POST",
              mode: "no-cors",
              headers: { 
                "Content-Type": "text/plain;charset=utf-8" 
              },
              body: JSON.stringify(datos)
            });
            console.log("Lead B2B transmitido de forma automática a la hoja de cálculo.");
          } catch (error) {
            console.error("Error en la transmisión digital del registro:", error);
          }
        };

        enviarA_GoogleSheets(datosFinales);
      } catch (e) {
        console.error("Webhook setup error:", e);
      }

      sound.playSuccessTone();
      return;
    }
  };

  const getPlaceholderText = () => {
    switch (currentStep) {
      case 1:
        return lang === 'en' ? 'Type the product or process name / number...' : 'Escribe el nombre del producto o proceso / número...';
      case 2:
        return lang === 'en' ? 'Type your full name...' : 'Escribe tu nombre completo...';
      case 3:
        return lang === 'en' ? 'Type the name of your company...' : 'Escribe el nombre de tu empresa...';
      case 4:
        return lang === 'en' ? 'Briefly describe your project/specifications...' : 'Describe brevemente tu proyecto/especificaciones...';
      case 5:
        return lang === 'en' ? 'Contact Email or WhatsApp...' : 'Correo electrónico o WhatsApp de contacto...';
      case 6:
        return lang === 'en' ? 'Project location/country...' : 'País/Ubicación del proyecto...';
      case 7:
        return lang === 'en' ? 'Quote completed. Download your PDF sheet or start a new one.' : 'Cotización concluida. Descarga tu Ficha en PDF o inicia una nueva.';
      default:
        return lang === 'en' ? 'Type your message...' : 'Escribe tu mensaje...';
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 overflow-hidden h-[calc(100vh-76px)]">
      {/* Modern High-Tech Container */}
      <div className="flex-1 flex flex-col bg-[#021D49] border border-[#AA2D29]/60 rounded-2xl shadow-2xl overflow-hidden relative backdrop-blur-md">
        {/* Modern Top Header Indicator */}
        <div className="bg-[#011538] border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#AA2D29] animate-pulse" />
            <span className="font-bold text-xs sm:text-sm text-white tracking-[0.18em] uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              M A I N D S T E E L &nbsp;&nbsp;R O B O T I C ' S
            </span>
          </div>

          <div className="flex items-center gap-3">
            {currentStep === 7 && (
              <button
                onClick={() => {
                  sound.playKeyClick();
                  setIsPdfModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#AA2D29] hover:bg-[#c43530] text-white rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Ficha PDF</span>
              </button>
            )}

            <div className="flex items-center gap-2 bg-[#021D49] px-2.5 py-1 rounded-md border border-slate-700">
              <span className="text-[11px] font-mono text-slate-300">
                Paso {Math.min(currentStep, 6)} de 6
              </span>
              <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#AA2D29] transition-all duration-300 rounded-full"
                  style={{ width: `${(Math.min(currentStep, 6) / 6) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Messages Scroll Area */}
        <div
          ref={chatScrollRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gradient-to-b from-[#021D49] to-[#011333]"
        >
          {currentStep === 7 ? (
            /* Pantalla de Operación Exitosa */
            <div className="flex flex-col items-center justify-center h-full w-full max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-500 bg-[#021D49] p-6 sm:p-10 rounded-2xl border border-[#AA2D29]/40 shadow-[0_0_50px_rgba(170,45,41,0.15)] my-auto">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#AA2D29] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(170,45,41,0.6)] mb-8 animate-bounce delay-150">
                <span className="text-white text-5xl sm:text-7xl font-black">✓</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white text-center tracking-widest mb-6 drop-shadow-md">
                OPERACIÓN EXITOSA
              </h1>
              <div className="bg-[#011538] border border-slate-700/60 rounded-xl p-6 sm:p-8 mb-8 text-center shadow-inner w-full">
                <p className="text-slate-200 text-base sm:text-xl font-medium leading-relaxed">
                  Gracias por tu solicitud, <span className="font-bold text-white">{session.clientName || 'Cliente'}</span>.
                </p>
                <div className="w-12 h-1 bg-[#AA2D29] mx-auto my-4 rounded-full opacity-50" />
                <p className="text-slate-300 text-sm sm:text-lg">
                  Un asesor especializado se comunicará contigo en <span className="font-bold text-[#AA2D29]">menos de 5 minutos</span>.
                </p>
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <MessageCard
                key={msg.id}
                step={msg.step}
                sender={msg.sender}
                title={msg.title}
                body={msg.body}
                followUp={msg.followUp}
                promptHint={msg.promptHint}
                timestamp={msg.timestamp}
                onQuickSelect={handleSolutionSelection}
                disabled={currentStep > 1}
                onOpenPdfModal={() => setIsPdfModalOpen(true)}
                onRestart={handleRestart}
                onBack={handleBack}
                itemCategory={session.itemCategory}
              />
            ))
          )}
        </div>

        {/* Input Bar (Modernized, sleek, high legibility) */}
        <div className="bg-[#011538] border-t border-slate-800 p-3 sm:p-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-2 sm:gap-3">
            {/* Input field */}
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={currentStep === 7}
              placeholder={getPlaceholderText()}
              className="flex-1 bg-[#021D49] border border-slate-700 focus:border-[#AA2D29] focus:ring-1 focus:ring-[#AA2D29] rounded-xl px-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-slate-400 font-sans transition-all outline-none"
              autoFocus
            />

            {/* Send button */}
            <button
              type="submit"
              disabled={currentStep === 7 || !inputValue.trim()}
              className="px-5 py-2.5 sm:py-3 bg-[#AA2D29] hover:bg-[#c43530] disabled:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md shrink-0 active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Enviar</span>
            </button>
          </form>

          {/* Quick tips & shortcuts */}
          <div className="flex flex-wrap items-center justify-between gap-2 mt-2 px-1 text-xs text-slate-400">
            {currentStep < 7 ? (
              <span className="flex items-center gap-1.5">
                <CornerDownLeft className="w-3.5 h-3.5 text-[#AA2D29]" />
                {lang === 'en' ? 'Press' : 'Presiona'} <kbd className="px-1.5 py-0.5 bg-[#021D49] border border-slate-700 text-slate-200 rounded font-mono text-[11px]">Enter</kbd> {lang === 'en' ? 'to send' : 'para enviar'}
              </span>
            ) : (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                ✓ {lang === 'en' ? 'Request processed &bull; Graphic sheet ready' : 'Solicitud procesada &bull; Ficha gráfica lista'}
              </span>
            )}

            {currentStep === 1 && (
              <span className="text-slate-300 hidden sm:inline">
                {lang === 'en' ? 'You can type a number from' : 'Puedes teclear el número'} <span className="text-[#AA2D29] font-bold">1 {lang === 'en' ? 'to' : 'al'} 15</span> {lang === 'en' ? 'or select an option.' : 'o seleccionar una opción.'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Botón de Regresar y Acciones debajo del recuadro del chat */}
      <div className="pt-2.5 flex items-center justify-between gap-3 shrink-0 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#011538] hover:bg-[#AA2D29] border border-[#AA2D29]/60 hover:border-[#AA2D29] text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xl active:scale-95 group"
            title={currentStep > 1 ? (lang === 'en' ? `Back to previous step (Step ${currentStep - 1}/6)` : `Regresar al paso anterior (Paso ${currentStep - 1}/6)`) : (lang === 'en' ? "Back to products" : "Regresar a productos")}
          >
            <ArrowLeft className="w-4 h-4 text-[#AA2D29] group-hover:text-white transition-colors" />
            <span>{lang === 'en' ? 'Back' : 'Regresar'}</span>
            <span className="text-[11px] text-slate-300 group-hover:text-red-100 font-mono font-normal">
              {currentStep > 1 ? (lang === 'en' ? `(Step ${currentStep - 1}/6)` : `(Paso ${currentStep - 1}/6)`) : (lang === 'en' ? '(TO PRODUCTS)' : '(A PRODUCTOS)')}
            </span>
          </button>

          {currentStep === 7 && (
            <>
              <button
                type="button"
                onClick={handleRestart}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#011538] hover:bg-[#021D49] border border-slate-700 hover:border-slate-500 text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xl active:scale-95"
              >
                <RotateCcw className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'en' ? 'New Quote' : 'Nueva Cotización'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playKeyClick();
                  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    window.location.href = 'http://localhost:3000/';
                  } else {
                    window.location.href = '/';
                  }
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#011538] hover:bg-[#021D49] border border-slate-700 hover:border-slate-500 text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xl active:scale-95"
              >
                <ArrowRight className="w-4 h-4 text-blue-400" />
                <span>{lang === 'en' ? 'Go to Home' : 'Ir a Inicio'}</span>
              </button>
            </>
          )}
        </div>

        <span className="text-xs text-slate-400 font-medium hidden lg:inline">
          {currentStep === 1 && (lang === 'en' ? 'Select a product/process or type from 1 to 15' : 'Selecciona un producto/proceso o teclea del 1 al 15')}
          {currentStep === 2 && (lang === 'en' ? 'Step 2 of 6: User Name' : 'Paso 2 de 6: Nombre del Usuario')}
          {currentStep === 3 && (lang === 'en' ? 'Step 3 of 6: Organization or Company' : 'Paso 3 de 6: Organización o Empresa')}
          {currentStep === 4 && (lang === 'en' ? 'Step 4 of 6: Technical Specifications' : 'Paso 4 de 6: Especificaciones Técnicas')}
          {currentStep === 5 && (lang === 'en' ? 'Step 5 of 6: Contact Details' : 'Paso 5 de 6: Datos de Contacto')}
          {currentStep === 6 && (lang === 'en' ? 'Step 6 of 6: Destination Country or Region' : 'Paso 6 de 6: País o región de entrega')}
          {currentStep === 7 && (lang === 'en' ? 'Quotation completed. You can go back to edit your data.' : 'Cotización completada. Puedes regresar para modificar tus datos.')}
        </span>
      </div>

      {/* Graphic PDF Quotation Sheet Modal */}
      <GraphicQuoteSheetModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        session={session}
      />
    </div>
  );
};
