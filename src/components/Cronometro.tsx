// Cronometro.tsx
import { useStopwatch } from 'react-timer-hook';
import { useEffect } from 'react';

interface CronometroProps {
  onUpdate?: (minutos: string) => void; // Atualiza input de duração
  onPause?: (minutos: string) => void;  // Atualiza input ao pausar
}

export default function Cronometro({ onUpdate, onPause }: CronometroProps) {
  const { seconds, minutes, hours, isRunning, start, pause } =
    useStopwatch({ autoStart: false });

  // Atualiza input apenas se cronômetro estiver rodando e minutos > 0
  useEffect(() => {
    if (isRunning && minutes > 0) {
      onUpdate?.(String(minutes));
    }
  }, [minutes, isRunning, onUpdate]);

  const handlePause = () => {
    pause();
    onPause?.(String(minutes));
  };

//   const handleReset = () => {
//     reset(new Date(), false);
//     onUpdate?.('');
//   };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 w-full">
      {/* Relógio */}
      <h2 className="text-3xl font-mono font-bold text-blue-950">
        {String(hours).padStart(2, '0')}:
        {String(minutes).padStart(2, '0')}:
        {String(seconds).padStart(2, '0')}
      </h2>

      {/* Botões */}
      <div className="flex gap-2 w-full">
        <button
          type="button"
          onClick={start}
          className={`flex-1 py-2 px-2 rounded-md border transition font-semibold ${
            isRunning
              ? 'bg-gray-100 text-blue-950 border-gray-300 hover:bg-gray-200'
              : 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
          }`}
        >
          Iniciar
        </button>

        <button
          type="button"
          onClick={handlePause}
          className={`flex-1 py-2 px-2 rounded-md border transition font-semibold ${
            isRunning
              ? 'bg-yellow-400 text-blue-950 border-yellow-400 hover:bg-yellow-500'
              : 'bg-gray-100 text-blue-950 border-gray-300 hover:bg-gray-200'
          }`}
        >
          Pausar
        </button>

        
      </div>
    </div>
  );
}
