import { useState } from "react";

interface Vacina {
    nome: string;
    data: string;
    status: 'tomada' | 'futura';
    observacoes?: string;
    horaRegistro: string;
    dataCompleta: string;
}

interface ModalVacinaProps {
    open: boolean;
    onClose: () => void;
    onConfirmar: (dados: Vacina) => void;
}

const ModalVacina: React.FC<ModalVacinaProps> = ({ open, onClose, onConfirmar }) => {
    const [nome, setNome] = useState('');
    const [data, setData] = useState('');
    const [status, setStatus] = useState<'tomada' | 'futura'>('tomada');
    const [observacoes, setObservacoes] = useState('');

    if (!open) return null;

    const confirmar = () => {
        if (!nome || !data) return;

        const horaRegistro = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });

        onConfirmar({
            nome,
            data,
            status,
            observacoes,
            horaRegistro,
            dataCompleta: new Date().toISOString()
        });

        // Limpar campos
        setNome('');
        setData('');
        setStatus('tomada');
        setObservacoes('');
        onClose();
    };

    return (
        <>
            <div className="fixed inset-0 bg-transparent backdrop-blur-sm z-40"></div>
            <div className="fixed inset-0 flex items-center justify-center z-50 p-5">
                <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
                    <h2 className="text-2xl font-extrabold text-blue-950">
                        Registrar Vacina
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-blue-950 font-semibold mb-2">Vacina:</label>
                            <input
                                type="text"
                                placeholder="Nome da vacina"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-4 py-3 text-blue-950 focus:outline-none focus:ring-2"
                            />
                        </div>

                        <div>
                            <label className="block text-blue-950 font-semibold mb-2">Data:</label>
                            <input
                                type="date"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-4 py-3 text-blue-950 focus:outline-none focus:ring-2"
                            />
                        </div>

                        <div>
                            <label className="block text-blue-950 font-semibold mb-2">Status:</label>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setStatus('tomada')}
                                    className={`flex-1 py-2 px-4 rounded-md border transition ${
                                        status === 'tomada'
                                            ? 'bg-gradient-to-r from-blue-400 to-blue-500 border-blue-400 text-white'
                                            : 'bg-gray-100 text-blue-950 border-gray-300 hover:bg-gray-200'
                                    }`}
                                >
                                    Já tomou
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStatus('futura')}
                                    className={`flex-1 py-2 px-4 rounded-md border transition ${
                                        status === 'futura'
                                            ? 'bg-yellow-400 text-white border-yellow-400'
                                            : 'bg-gray-100 text-blue-950 border-gray-300 hover:bg-gray-200'
                                    }`}
                                >
                                    Agendar
                                </button>
                            </div>
                        </div>

                        

                        <textarea
                            placeholder="Observações (opcional)"
                            value={observacoes}
                            onChange={(e) => setObservacoes(e.target.value)}
                            rows={3}
                            className="w-full border border-gray-300 rounded-md px-4 py-3 text-blue-950 focus:outline-none focus:ring-2 resize-none"
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            onClick={onClose}
                            className="bg-gray-100 text-blue-950 font-semibold rounded-md px-6 py-2 hover:bg-purple-200 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={confirmar}
                            disabled={!nome || !data}
                            className="bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold rounded-md px-6 py-2 hover:opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalVacina;