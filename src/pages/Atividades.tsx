import { Baby, Droplets, Bath, Moon, ClockFading, Clock4 } from 'lucide-react';
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
        { tipo: "Amamentação" | "Fralda" | "Banho" | "Sono"; valor: string | { inicio: string; fim: string }, horaRegistro: string }[]
    >([]);

    const abrirJanela = (tipo: "Amamentação" | "Fralda" | "Banho" | "Sono") => {
        setTipoSelecionado(tipo);
        setJanelaAberta(true);
    };



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
        <main className="bg-purple-50 min-h-screen px-5 pb-5">
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
                <p className='text-[22px] font flex gap-2 items-center text-blue-950 pt-2'><ClockFading /> Atividades recentes</p>

                {atividades.length === 0 ? (<div>
                    <div className='h-45 items-center flex justify-center flex-col gap-2'>
                        < Clock4 className='text-gray-300' size={50} />
                        <p className='text-gray-400'>Nenhuma atividade registrada ainda</p>
                    </div>

                </div>

                ) : (
                    <div className='min-h-45 overflow-y-auto mb-1'>
                        <ul className="mt-4 space-y-2">
                            {atividades.map((atividade, index) => (
                                <li key={index} className="text-blue-950 text-sm">
                                    {atividade.tipo === 'Amamentação'
                                        ? <div className='flex justify-between items-center border-gray-200 border-2 rounded-xl px-4 py-1 '>
                                            <div className='flex gap-3 items-center'>
                                                <div className='bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full'>
                                                    <Droplets />
                                                </div>
                                                <div>
                                                    <p className='text-[17px] '>{atividade.tipo}</p>
                                                    <p className='text-[13px] text-gray-500'>{`${atividade.valor} minutos`}</p>

                                                </div>
                                            </div>
                                            <div >

                                                <span className=' text-[13px]  bg-gray-200 p-1 px-1.5 rounded-xl'>{atividade.horaRegistro}</span>
                                            </div>
                                        </div>
                                        : atividade.tipo === 'Fralda'
                                            ? <div className='flex justify-between items-center border-gray-200 border-2 rounded-xl px-4 py-1 '>
                                                <div className='flex gap-3 items-center'>
                                                    <div className='bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full'>
                                                        <Baby />
                                                    </div>
                                                    <div>
                                                        <p className='text-[17px] '>{atividade.tipo}</p>

                                                    </div>
                                                </div>
                                                <div >

                                                    <span className=' text-[13px]  bg-gray-200 p-1 px-1.5 rounded-xl'>{atividade.horaRegistro}</span>
                                                </div>
                                            </div>
                                            : atividade.tipo === 'Banho'
                                                ? <div className='flex justify-between items-center border-gray-200 border-2 rounded-xl px-4 py-1 '>
                                                    <div className='flex gap-3 items-center'>
                                                        <div className='bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full'>
                                                            <Bath />
                                                        </div>
                                                        <div>
                                                            <p className='text-[17px] '>{atividade.tipo}</p>

                                                        </div>
                                                    </div>
                                                    <div >

                                                        <span className=' text-[13px]  bg-gray-200 p-1 px-1.5 rounded-xl'>{atividade.horaRegistro}</span>
                                                    </div>
                                                </div>
                                                : atividade.tipo === 'Sono' && typeof atividade.valor === 'object'
                                                    ? <div className='flex justify-between items-center border-gray-200 border-2 rounded-xl px-4 py-1 '>
                                                        <div className='flex gap-3 items-center'>
                                                            <div className='bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full'>
                                                                <Moon />
                                                            </div>
                                                            <div>
                                                                <p className='text-[17px] '>{atividade.tipo}</p>
                                                                <p className='text-[13px] text-gray-500'>{`${atividade.valor.inicio} - ${atividade.valor.fim}`}</p>

                                                                
                                                            </div>
                                                        </div>
                                                        <div >

                                                            <span className=' text-[13px]  bg-gray-200 p-1 px-1.5 rounded-xl'>{atividade.horaRegistro}</span>
                                                        </div>
                                                    </div>
                                                    : ''
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
                    setAtividades((prev) => [...prev, dados]);
                    setJanelaAberta(false);
                }}

            />
        </main>

    )
}

export default Atividades;