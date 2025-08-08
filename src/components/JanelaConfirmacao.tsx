import { useState } from "react";

type TipoAtividade = 'Amamentação' | 'Fralda' | 'Banho' | 'Sono';

interface JanelaConfirmacaoProps {


    open: boolean;
    onClose: () => void;
    onConfirmar: (dados: { tipo: TipoAtividade; valor: string | { inicio: string; fim: string }; horaRegistro: string }) => void;
    tipo: TipoAtividade;
}


const JanelaConfirmacao: React.FC<JanelaConfirmacaoProps> = ({
    open,
    onClose,
    tipo,
    onConfirmar,
}) => {

    const [duracao, setDuracao] = useState<string>('');
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
            valor = duracao;
        } else if (tipo === 'Sono') {
            valor = { inicio: horaInicio, fim: horaFim };
        } else {
            valor = agora;
        }

        onConfirmar({ tipo, valor, horaRegistro});
        onClose();
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
                        <input
                            type="text"
                            placeholder="Duração (min)"
                            onChange={(e) => setDuracao(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-3 text-blue-950 focus:outline-none focus:ring-2 focus:text-blue-950"
                        />
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

                    {(tipo === 'Fralda' || tipo === 'Banho') && (
                        <p className="text-blue-950 text-lg">
                            Horário atual: <strong>{agora}</strong>
                        </p>
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
