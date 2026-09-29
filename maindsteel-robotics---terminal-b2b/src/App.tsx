/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { ChatTerminal } from './components/ChatTerminal';
import { sound } from './soundEffects';

export default function App() {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [resetCounter, setResetCounter] = useState(0);

  const handleToggleAudio = () => {
    const nextVal = !audioEnabled;
    setAudioEnabled(nextVal);
    sound.setEnabled(nextVal);
    if (nextVal) {
      sound.playKeyClick();
    }
  };

  const handleReset = () => {
    setResetCounter((c) => c + 1);
  };

  return (
    <div className="min-h-screen bg-[#021D49] flex flex-col font-montserrat-black text-white selection:bg-[#AA2D29] selection:text-white overflow-hidden">
      {/* Top Corporate Bar */}
      <Header
        onReset={handleReset}
        onOpenCatalog={() => {}}
        audioEnabled={audioEnabled}
        onToggleAudio={handleToggleAudio}
        activeStep={1}
      />

      {/* Main Terminal Viewport */}
      <main className="flex-1 flex flex-col items-center justify-center p-0">
        <ChatTerminal
          onOpenCatalog={() => {}}
          onResetTrigger={resetCounter}
        />
      </main>
    </div>
  );
}
