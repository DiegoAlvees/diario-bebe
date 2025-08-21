import { useState } from "react";
// import Cronometro from "./Cronometro"

type TipoAtividade = 'Amamentação' | 'Fralda' | 'Banho' | 'Sono';

interface JanelaConfirmacaoProps {
    open: boolean;
    onClose: () => void;
    onConfirmar: (dados: {
        tipo: TipoAtividade;
        valor: string | { inicio: string; fim: string } | { duracao: string; mamilo: string } | { tipo: string };
        horaRegistro: string;
        dataCompleta?: string;
    }) => void;
    tipo: TipoAtividade;
}

const JanelaConfirmacao: React.FC<JanelaConfirmacaoProps> = ({
    open,
    onClose,
    tipo,
    onConfirmar,
}) => {

    const [duracao, setDuracao] = useState<string>('');
    const [mamilo, setMamilo] = useState<string>('');
    const [tipoFralda, setTipoFralda] = useState<string>('');
    const [horaInicio, setHoraInicio] = useState<string>('');
    const [horaFim, setHoraFim] = useState<string>('');

    if (!open) return null;

    const agora = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    const confirmar = () => {
        const horaRegistro = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });

        let valor;
        if (tipo === 'Amamentação') {
            valor = { duracao, mamilo };
        } else if (tipo === 'Fralda') {
            valor = { tipo: tipoFralda };
        } else if (tipo === 'Sono') {
            valor = { inicio: horaInicio, fim: horaFim };
        } else {
            valor = agora;
        }

        onConfirmar({ tipo, valor, horaRegistro });
        onClose();

        // Limpar campos após confirmar
        setDuracao('');
        setMamilo('');
        setTipoFralda('');
        setHoraInicio('');
        setHoraFim('');
    };

    return (
        <>
            {/* Fundo desfocado */}
            <div
                className="fixed inset-0 bg-transparent backdrop-blur-sm z-40"
            ></div>

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-5">
                <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 space-y-6">

                    <h2 className="text-2xl font-extrabold text-blue-950">
                        {`Registrar ${tipo}`}
                    </h2>

                    {tipo === 'Amamentação' && (
                        <div className="space-y-4">
                            {/* <Cronometro
                                onUpdate={(tempo) => setDuracao(tempo)}
                                onPause={(tempo) => setDuracao(tempo)}
                            /> */}
                            <input
                                type="text"
                                placeholder="Duração (min)"
                                value={duracao}
                                onChange={(e) => setDuracao(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-4 py-3 text-blue-950 focus:outline-none focus:ring-2 focus:text-blue-950"
                            />

                            <div className="space-y-2">
                                <label className="block text-blue-950 font-semibold">Mamilo:</label>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setMamilo('Esquerdo')}
                                        className={`flex-1 py-2 px-4 rounded-md border transition ${mamilo === 'Esquerdo'
                                                ? 'bg-blue-500 text-white border-blue-500'
                                                : 'bg-gray-100 text-blue-950 border-gray-300 hover:bg-gray-200'
                                            }`}
                                    >
                                        Esquerdo
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setMamilo('Direito')}
                                        className={`flex-1 py-2 px-4 rounded-md border transition ${mamilo === 'Direito'
                                                ? 'bg-blue-500 text-white border-blue-500'
                                                : 'bg-gray-100 text-blue-950 border-gray-300 hover:bg-gray-200'
                                            }`}
                                    >
                                        Direito
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setMamilo('Ambos')}
                                        className={`flex-1 py-2 px-4 rounded-md border transition ${mamilo === 'Ambos'
                                                ? 'bg-blue-500 text-white border-blue-500'
                                                : 'bg-gray-100 text-blue-950 border-gray-300 hover:bg-gray-200'
                                            }`}
                                    >
                                        Ambos
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {tipo === 'Fralda' && (
                        <div className="space-y-2">
                            <label className="block text-blue-950 font-semibold">Tipo:</label>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setTipoFralda('Xixi')}
                                    className={`flex-1 py-2 px-4 rounded-md border transition ${tipoFralda === 'Xixi'
                                            ? 'bg-blue-500 text-white border-blue-500'
                                            : 'bg-gray-100 text-blue-950 border-gray-300 hover:bg-gray-200'
                                        }`}
                                >
                                    Xixi
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTipoFralda('Coco')}
                                    className={`flex-1 py-2 px-4 rounded-md border transition ${tipoFralda === 'Coco'
                                            ? 'bg-blue-500 text-white border-blue-500'
                                            : 'bg-gray-100 text-blue-950 border-gray-300 hover:bg-gray-200'
                                        }`}
                                >
                                    Coco
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTipoFralda('Ambos')}
                                    className={`flex-1 py-2 px-4 rounded-md border transition ${tipoFralda === 'Ambos'
                                            ? 'bg-blue-500 text-white border-blue-500'
                                            : 'bg-gray-100 text-blue-950 border-gray-300 hover:bg-gray-200'
                                        }`}
                                >
                                    Ambos
                                </button>
                            </div>
                        </div>
                    )}

                    {tipo === 'Sono' && (
                        <div className="flex gap-4">
                            <input
                                type="time"
                                value={horaInicio}
                                onChange={(e) => setHoraInicio(e.target.value)}
                                className="flex-1 border border-gray-300 rounded-md px-4 py-3 text-blue-950 focus:outline-none focus:ring-2 focus:text-blue-950"
                            />
                            <input
                                type="time"
                                value={horaFim}
                                onChange={(e) => setHoraFim(e.target.value)}
                                className="flex-1 border border-gray-300 rounded-md px-4 py-3 text-blue-950 focus:outline-none focus:ring-2 focus:text-blue-950"
                            />
                        </div>
                    )}



                    <div className="flex justify-end gap-4">
                        <button
                            onClick={onClose}
                            className="bg-gray-100 text-blue-950 font-semibold rounded-md px-6 py-2 hover:bg-purple-200 transition"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={confirmar}
                            className="bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold rounded-md px-6 py-2 hover:bg-purple-800 transition"
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JanelaConfirmacao;