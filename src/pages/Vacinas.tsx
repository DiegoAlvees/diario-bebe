import { Syringe, Calendar, CheckCircle, Clock, CircleX, CalendarDays, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import ModalVacina from '../components/JanelaVacina';

interface Vacina {
    nome: string;
    data: string;
    status: 'tomada' | 'futura';
    lote?: string;
    local?: string;
    observacoes?: string;
    horaRegistro: string;
    dataCompleta: string;
}

function Vacinas() {
    const dataNascimento = '2025-07-19';
    const [modalAberto, setModalAberto] = useState(false);
    const [vacinas, setVacinas] = useState<Vacina[]>(() => {
        const vacinasSalvas = JSON.parse(localStorage.getItem('vacinas-noah') || '[]');
        return vacinasSalvas;
    });

    const calcularDiasDeVida = (dataNasc: string) => {
        const nascimento = new Date(dataNasc);
        const hoje = new Date();
        const diferenca = hoje.getTime() - nascimento.getTime();
        return Math.floor(diferenca / (1000 * 60 * 60 * 24));
    };

    const [dias] = useState(calcularDiasDeVida(dataNascimento));

    const excluirVacina = (index: number) => {
        if (confirm('Tem certeza que deseja excluir esta vacina?')) {
            const novasVacinas = vacinas.filter((_, i) => i !== index);
            setVacinas(novasVacinas);
        }
    };

    const formatarData = (dataString: string) => {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const vacinasPassadas = vacinas.filter(v => v.status === 'tomada').sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
    const vacinasFuturas = vacinas.filter(v => v.status === 'futura').sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

    useEffect(() => {
        localStorage.setItem('vacinas-noah', JSON.stringify(vacinas));
    }, [vacinas]);

    return (
        <main className="bg-blue-50 min-h-screen px-5 pb-20">
            <header className="flex items-center gap-2 pt-10">
                <div className="flex justify-center items-center w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full">
                    <Syringe className='text-white' size={38} />
                </div>
                <div>
                    <p className='text-xl font-bold text-blue-950'>Vacinas - Noah</p>
                    <p className='text-blue-950'>{`${dias} dias`}</p>
                </div>
            </header>

            {/* Botão para adicionar vacina */}
            <div className='mt-10 '>
                <button 
                        onClick={() => setModalAberto(true)}
                        className='w-full rounded-md flex justify-center items-center gap-2 h-12 bg-gradient-to-r from-blue-400 to-blue-500 active:scale-95 transition-transform'
                    >
                                        <Plus className='text-white' size={20} />

                        <span className='text-white font-semibold'>Adicionar Vacina</span>
                    </button>
            </div>

            {/* Vacinas Futuras */}
            <section className='px-3 py-3 mt-10 bg-white rounded-lg shadow-lg'>
                <div className='flex justify-between items-center'>
                    <p className='text-[22px] flex gap-2 items-center text-blue-950 pt-2'>
                        <Clock /> Vacinas Agendadas
                    </p>
                </div>

                {vacinasFuturas.length === 0 ? (
                    <div className='h-32 items-center flex justify-center flex-col gap-2'>
                        <CalendarDays className='text-blue-100' size={50} />
                        <p className='text-blue-200'>Nenhuma vacina agendada</p>
                    </div>
                ) : (
                    <div className='mt-4 space-y-2'>
                        {vacinasFuturas.map((vacina, index) => (
                            <div key={index} className='relative flex justify-between items-center border-orange-100 border rounded-xl px-4 py-3'>
                                <div className='flex gap-3 items-center'>
                                    <div className='bg-orange-100 w-12 h-12 flex items-center justify-center rounded-full'>
                                        <Calendar className='text-orange-600' size={20} />
                                    </div>
                                    <div>
                                        <p className='text-[17px] font-semibold text-blue-950'>{vacina.nome}</p>
                                        <p className='text-[14px] text-gray-600'>{formatarData(vacina.data)}</p>
                                        {vacina.observacoes && (
                                            <p className='text-[12px] text-gray-500'>{vacina.observacoes}</p>
                                        )}
                                    </div>
                                </div>
                                <button 
                                    className='absolute top-2 right-2'
                                    onClick={() => excluirVacina(vacinas.indexOf(vacina))}
                                >
                                    <CircleX size={16} className='text-red-300 hover:text-red-500'/>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Histórico de Vacinas */}
            <section className='px-3 py-3 mt-10 bg-white rounded-lg shadow-lg'>
                <div className='flex justify-between items-center'>
                    <p className='text-[22px] flex gap-2 items-center text-blue-950 pt-2'>
                        <CheckCircle /> Histórico de Vacinas
                    </p>
                </div>

                {vacinasPassadas.length === 0 ? (
                    <div className='h-32 items-center flex justify-center flex-col gap-2'>
                        <Syringe className='text-blue-100' size={50} />
                        <p className='text-blue-200'>Nenhuma vacina registrada ainda</p>
                    </div>
                ) : (
                    <div className='mt-4 space-y-2'>
                        {vacinasPassadas.map((vacina, index) => (
                            <div key={index} className='relative flex justify-between items-center border-green-100 border rounded-xl px-4 py-3'>
                                <div className='flex gap-3 items-center'>
                                    <div className='bg-green-100 w-12 h-12 flex items-center justify-center rounded-full'>
                                        <CheckCircle className='text-green-600' size={20} />
                                    </div>
                                    <div>
                                        <p className='text-[17px] font-semibold text-blue-950'>{vacina.nome}</p>
                                        <p className='text-[14px] text-gray-600'>{formatarData(vacina.data)}</p>
                                        <div className='flex gap-4 text-[12px] text-gray-500'>
                                            {vacina.lote && <span>Lote: {vacina.lote}</span>}
                                            {vacina.local && <span>Local: {vacina.local}</span>}
                                        </div>
                                        {vacina.observacoes && (
                                            <p className='text-[12px] text-gray-500 mt-1'>{vacina.observacoes}</p>
                                        )}
                                    </div>
                                </div>
                                <button 
                                    className='absolute top-2 right-2'
                                    onClick={() => excluirVacina(vacinas.indexOf(vacina))}
                                >
                                    <CircleX size={16} className='text-red-300 hover:text-red-500'/>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <ModalVacina
                open={modalAberto}
                onClose={() => setModalAberto(false)}
                onConfirmar={(dados) => {
                    setVacinas(prev => [...prev, dados]);
                    setModalAberto(false);
                }}
            />
        </main>
    );
}

export default Vacinas;