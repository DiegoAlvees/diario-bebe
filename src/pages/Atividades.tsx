import { Baby, Droplets, Bath, Moon, ClockFading, Clock4, CircleX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { calcularDiasDeVida } from '../utils/calcularIdade';
import JanelaConfirmacao from '../components/JanelaConfirmacao';

function Atividades() {
    // Função para calcular idade do bebê em dias
    const dataNascimento = '2025-07-19';
    const [dias, setDias] = useState(calcularDiasDeVida(dataNascimento));
    const [janelaAberta, setJanelaAberta] = useState(false);
    const [tipoSelecionado, setTipoSelecionado] = useState<"Amamentação" | "Fralda" | "Banho" | "Sono" | null>(null);
    const [atividades, setAtividades] = useState<
        {
            tipo: "Amamentação" | "Fralda" | "Banho" | "Sono";
            valor: string | { inicio: string; fim: string } | { duracao: string; mamilo: string } | { tipo: string };
            horaRegistro: string;
            dataCompleta: string;
        }[]
    >(() => {
        const atividadesSalvas = localStorage.getItem('atividades-noah');
        return atividadesSalvas ? JSON.parse(atividadesSalvas) : [];
    });

    // função para excluir uma atividade
    const excluirAtividade = (index: number) => {
        if (confirm('Tem certeza que deseja excluir esta atividade?')) {
            const novasAtividades = atividades.filter((_, i) => i !== index);
            setAtividades(novasAtividades);
        }
    };

    // const limparHistorico = () => {
    //     if (confirm('Tem certeza que deseja limpar todo o histórico de atividades?')) {
    //         setAtividades([]);
    //         localStorage.removeItem('atividades-noah');
    //     }
    // };

    const formatarData = (dataCompleta: string) => {
        const data = new Date(dataCompleta);
        const hoje = new Date();
        const ontem = new Date(hoje);
        ontem.setDate(hoje.getDate() - 1);

        const ehHoje = data.toDateString() === hoje.toDateString();
        const ehOntem = data.toDateString() === ontem.toDateString();

        if (ehHoje) return 'Hoje';
        if (ehOntem) return 'Ontem';

        return data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        });
    };

    const abrirJanela = (tipo: "Amamentação" | "Fralda" | "Banho" | "Sono") => {
        setTipoSelecionado(tipo);
        setJanelaAberta(true);
    };

    // Efeito para salvar atividades no localStorage sempre que mudarem
    useEffect(() => {
        localStorage.setItem('atividades-noah', JSON.stringify(atividades));
    }, [atividades]);

    useEffect(() => {
        const agora = new Date();
        const meiaNoite = new Date(
            agora.getFullYear(),
            agora.getMonth(),
            agora.getDate() + 1,
            0, 0, 0
        );
        const tempoAteMeiaNoite = meiaNoite.getTime() - agora.getTime();

        const timeout = setTimeout(() => {
            setDias(calcularDiasDeVida(dataNascimento));

            const intervalo = setInterval(() => {
                setDias(calcularDiasDeVida(dataNascimento));
            }, 24 * 60 * 60 * 1000);

            return () => clearInterval(intervalo);
        }, tempoAteMeiaNoite);

        return () => clearTimeout(timeout);
    }, [dataNascimento]);

    return (
        <main className="bg-blue-50 min-h-screen px-5 pb-20">
            <header className="flex items-center gap-2 pt-10">
                <div className="flex justify-center items-center w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500  rounded-[100%] bg-amber-50">
                    <Baby className='text-purple-50' size={38} />
                </div>
                <div>
                    <p className='text-xl font-bold text-blue-950'>Noah</p>
                    <p className='text-blue-950'>{`${dias} dias`}</p>
                </div>
            </header>

            {/* section de atividades */}
            <section className='px-3 py-3 mt-10 bg-white rounded-lg shadow-lg h-auto]'>
                <p className='text-[22px] text-blue-950 pt-2'>+ Ações Rápidas</p>
                <div className='grid grid-cols-2 gap-3 mt-4'>
                    <div className='rounded-md flex justify-center h-20 bg-gradient-to-r from-blue-400 to-blue-500'>
                        <button onClick={() => abrirJanela("Amamentação")} className='flex flex-col items-center justify-center h-full w-full active:scale-85 transition-transform'>
                            <Droplets color='white' size={20} />
                            <p className='text-white'>Amamentação</p>
                        </button>
                    </div>
                    <div className='rounded-md flex justify-center h-20 bg-gradient-to-r from-blue-500 to-blue-400'>
                        <button onClick={() => abrirJanela("Fralda")} className='flex flex-col items-center justify-center h-full w-full active:scale-85 transition-transform'>
                            <Baby color='white' size={20} />
                            <p className='text-white'>Fralda</p>
                        </button>
                    </div>
                    <div className='rounded-md flex justify-center h-20 bg-gradient-to-r from-blue-500 to-blue-400'>
                        <button onClick={() => abrirJanela("Banho")} className='flex flex-col items-center justify-center h-full w-full active:scale-85 transition-transform'>
                            <Bath color='white' size={20} />
                            <p className='text-white'>Banho</p>
                        </button>
                    </div>
                    <div className='rounded-md flex justify-center h-20 bg-gradient-to-r from-blue-400 to-blue-500'>
                        <button onClick={() => abrirJanela("Sono")} className='flex flex-col items-center justify-center h-full w-full active:scale-85 transition-transform'>
                            <Moon color='white' size={20} />
                            <p className='text-white'>Sono</p>
                        </button>
                    </div>
                </div>
            </section>

            {/* section de registros de atividades */}
            <section className='px-3 py-3 mt-10 bg-white rounded-lg shadow-lg overflow-y-auto'>
                <div className='flex justify-between items-center'>
                    <p className='text-[22px] font flex gap-2 items-center text-blue-950 pt-2'><ClockFading /> Atividades recentes</p>

                </div>

                {atividades.length === 0 ? (
                    <div>
                        <div className='h-45 items-center flex justify-center flex-col gap-2'>
                            <Clock4 className='text-blue-100' size={50} />
                            <p className='text-blue-200'>Nenhuma atividade registrada ainda</p>
                        </div>
                    </div>
                ) : (
                    <div className='min-h-45 overflow-y-auto mb-1'>
                        <ul className="mt-4 space-y-2">
                            {atividades.slice().reverse().map((atividade, index) => (
                                <li key={index} className="text-blue-900 text-sm">
                                    {atividade.tipo === 'Amamentação' && typeof atividade.valor === 'object' && 'duracao' in atividade.valor
                                        ? <div className='relative flex justify-between items-end border-blue-100 border rounded-xl px-4 py-1 '>
                                            <div className='flex gap-3 items-center'>
                                                <div className='bg-blue-100 w-10 h-10 flex items-center justify-center rounded-full'>
                                                    <Droplets />
                                                </div>
                                                <div>
                                                    <div className='flex gap-2 items-center'>
                                                        <p className='text-[17px] '>{atividade.tipo}</p>
                                                        <span className='text-[13px] bg-blue-100 p-0.5 px-1 rounded-xl'>{atividade.horaRegistro}</span>
                                                    </div>

                                                    <p className='text-[13px] text-gray-500'>
                                                        {`${atividade.valor.duracao} min • ${atividade.valor.mamilo}`}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='text-right'>
                                                <button className='absolute top-1 right-1 '
                                                    onClick={() => {
                                                        const indexOriginal = atividades.length - 1 - index;
                                                        excluirAtividade(indexOriginal);
                                                    }}
                                                >
                                                    <CircleX size={14} className='text-red-200'/>
                                                </button>                                                {atividade.dataCompleta && (
                                                    <p className='text-[11px] text-gray-400 mt-1'>{formatarData(atividade.dataCompleta)}</p>
                                                )}
                                            </div>
                                        </div>
                                        : atividade.tipo === 'Fralda' && typeof atividade.valor === 'object' && 'tipo' in atividade.valor
                                            ? <div className='relative flex justify-between items-end border-blue-100 border rounded-xl px-4 py-1 '>
                                                <div className='flex  gap-3 items-center'>
                                                    <div className='bg-blue-100 w-10 h-10 flex items-center justify-center rounded-full'>
                                                        <Baby />
                                                    </div>
                                                    <div>
                                                        <div className='flex gap-2 items-center'>
                                                            <p className='text-[17px] '>{atividade.tipo}</p>
                                                            <span className='text-[13px] bg-blue-100 p-0.5 px-1 rounded-xl'>{atividade.horaRegistro}</span>
                                                        </div>
                                                        <p className='text-[13px] text-gray-500'>{atividade.valor.tipo}</p>

                                                    </div>
                                                </div>
                                                <div className='text-right'>
                                                    <button className='absolute top-1 right-1 '
                                                    onClick={() => {
                                                        const indexOriginal = atividades.length - 1 - index;
                                                        excluirAtividade(indexOriginal);
                                                    }}
                                                >
                                                    <CircleX size={14} className='text-red-200'/>
                                                </button> 
                                                    {atividade.dataCompleta && (
                                                        <p className='text-[11px] text-gray-400 mt-1'>{formatarData(atividade.dataCompleta)}</p>
                                                    )}
                                                </div>
                                            </div>

                                            : atividade.tipo === 'Banho'
                                                ? <div className='relative flex justify-between items-end border-blue-100 border rounded-xl px-4 py-1 '>
                                                    <div className='flex gap-3 items-center'>
                                                        <div className='bg-blue-100 w-10 h-10 flex items-center justify-center rounded-full'>
                                                            <Bath />
                                                        </div>
                                                        <div className='flex gap-2 items-center'>
                                                            <p className='text-[17px] '>{atividade.tipo}</p>
                                                            <span className='text-[13px] bg-blue-100 p-0.5 px-1 rounded-xl'>{atividade.horaRegistro}</span>
                                                        </div>
                                                    </div>
                                                    <div className='text-right'>
                                                        <button className='absolute top-1 right-1 '
                                                    onClick={() => {
                                                        const indexOriginal = atividades.length - 1 - index;
                                                        excluirAtividade(indexOriginal);
                                                    }}
                                                >
                                                    <CircleX size={14} className='text-red-200'/>
                                                </button> 
                                                        {atividade.dataCompleta && (
                                                            <p className='text-[11px] text-gray-400 mt-1'>{formatarData(atividade.dataCompleta)}</p>
                                                        )}
                                                    </div>
                                                </div>
                                                : atividade.tipo === 'Sono' && typeof atividade.valor === 'object' && 'inicio' in atividade.valor
                                                    ? (
                                                        <div className='relative flex justify-between items-end border-blue-100 border rounded-xl px-4 py-1 '>
                                                            <div className='flex gap-3 items-center'>
                                                                <div className='bg-blue-100 w-10 h-10 flex items-center justify-center rounded-full'>
                                                                    <Moon />
                                                                </div>
                                                                <div>
                                                                    <div className='flex gap-2 items-center'>
                                                                        <p className='text-[17px] '>{atividade.tipo}</p>
                                                                        <span className='text-[13px] bg-blue-100 p-0.5 px-1 rounded-xl'>{atividade.horaRegistro}</span>
                                                                    </div>
                                                                    <p className='text-[13px] text-gray-500'>
                                                                        {`${atividade.valor.inicio} - ${atividade.valor.fim} `}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className='text-right'>
                                                                <button className='absolute top-1 right-1 '
                                                    onClick={() => {
                                                        const indexOriginal = atividades.length - 1 - index;
                                                        excluirAtividade(indexOriginal);
                                                    }}
                                                >
                                                    <CircleX size={14} className='text-red-200'/>
                                                </button> 
                                                                {atividade.dataCompleta && (
                                                                    <p className='text-[11px] text-gray-400 mt-1'>{formatarData(atividade.dataCompleta)}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                    : null
                                    }
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>

            <JanelaConfirmacao
                open={janelaAberta}
                tipo={tipoSelecionado!}
                onClose={() => setJanelaAberta(false)}
                onConfirmar={(dados) => {
                    // Adiciona data completa ao registro para histórico mais detalhado
                    const novaAtividade = {
                        ...dados,
                        dataCompleta: new Date().toISOString()
                    };
                    setAtividades((prev) => [...prev, novaAtividade]);
                    setJanelaAberta(false);
                }}
            />
        </main>
    )
}

export default Atividades;