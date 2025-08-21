import { Baby, Droplets, Bath, Moon, CircleX, Calendar, History, ListFilterPlus } from 'lucide-react';
import { useState, useEffect } from 'react';

type Atividade = {
    tipo: "Amamentação" | "Fralda" | "Banho" | "Sono";
    valor: string | { inicio: string; fim: string } | { duracao: string; mamilo: string } | { tipo: string };
    horaRegistro: string;
    dataCompleta: string;
};

function HistoricoCompleto() {
    const [atividades, setAtividades] = useState<Atividade[]>(() => {
        const atividadesSalvas = localStorage.getItem('atividades-noah');
        return atividadesSalvas ? JSON.parse(atividadesSalvas) : [];
    });

    const [filtroTipo, setFiltroTipo] = useState<"Todos" | "Amamentação" | "Fralda" | "Banho" | "Sono">("Todos");


    const excluirAtividade = (index: number) => {
        if (confirm('Tem certeza que deseja excluir esta atividade?')) {
            const novasAtividades = atividades.filter((_, i) => i !== index);
            setAtividades(novasAtividades);
        }
    };

    

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
            year: 'numeric'
        });
    };

    // Agrupar atividades por data
    const agruparPorData = (atividades: Atividade[]) => {
        const grupos: { [key: string]: Atividade[] } = {};
        
        atividades.forEach(atividade => {
            const dataKey = formatarData(atividade.dataCompleta);
            if (!grupos[dataKey]) {
                grupos[dataKey] = [];
            }
            grupos[dataKey].push(atividade);
        });

        const gruposOrdenados: { data: string; atividades: Atividade[] }[] = [];
        Object.keys(grupos).forEach(data => {
            gruposOrdenados.push({
                data,
                atividades: grupos[data].sort((a, b) => new Date(b.dataCompleta).getTime() - new Date(a.dataCompleta).getTime())
            });
        });

        gruposOrdenados.sort((a, b) => {
            if (a.data === 'Hoje') return -1;
            if (b.data === 'Hoje') return 1;
            if (a.data === 'Ontem') return -1;
            if (b.data === 'Ontem') return 1;
            
            // Para outras datas, ordenar pela data mais recente
            const dataA = new Date(a.atividades[0].dataCompleta);
            const dataB = new Date(b.atividades[0].dataCompleta);
            return dataB.getTime() - dataA.getTime();
        });

        return gruposOrdenados;
    };

    // Filtrar atividades por tipo
    const atividadesFiltradas = filtroTipo === "Todos" 
        ? atividades 
        : atividades.filter(atividade => atividade.tipo === filtroTipo);

    const gruposAtividades = agruparPorData(atividadesFiltradas);

    // Estatísticas
    const totalAtividades = atividades.length;
    const atividadesHoje = atividades.filter(a => formatarData(a.dataCompleta) === 'Hoje').length;

    // Salvar no localStorage quando as atividades mudarem
    useEffect(() => {
        localStorage.setItem('atividades-noah', JSON.stringify(atividades));
    }, [atividades]);

    return (
        <main className="bg-blue-50 min-h-screen px-5 pb-20">
            <header className="flex items-center justify-between pt-10">
                <div className="flex items-center gap-2">
                    <div className="flex justify-center items-center w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full">
                    <History className='text-white' size={38} />
                </div>
                    
                    <div>
                        <p className='text-xl font-bold text-blue-950'>Histórico Completo</p>
                        <p className='text-blue-950 text-sm'>{totalAtividades} atividades • {atividadesHoje} hoje</p>
                    </div>
                </div>

                
            </header>

            {/* Filtros */}
            <section className='px-3 py-3 mt-6 bg-white rounded-lg shadow-lg'>
                <div className='flex items-center gap-2'>

                <ListFilterPlus size={22} className=' text-blue-950 mb-3' />
                <p className='text-[22px] text-blue-950 mb-3'>Filtrar por tipo</p>
                </div>
                <div className='flex gap-2 flex-wrap'>
                    {["Todos", "Amamentação", "Fralda", "Banho", "Sono"].map((tipo) => (
                        <button
                            key={tipo}
                            onClick={() => setFiltroTipo(tipo as typeof filtroTipo)}
                            className={`px-4 py-2 rounded-lg text-sm transition ${
                                filtroTipo === tipo
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-blue-100 text-blue-950 hover:bg-blue-200'
                            }`}
                        >
                            {tipo}
                        </button>
                    ))}
                </div>
            </section>

            {/* Histórico agrupado por data */}
            <section className='mt-6 space-y-4'>
                {gruposAtividades.length === 0 ? (
                    <div className='bg-white rounded-lg shadow-lg p-8'>
                        <div className='items-center flex justify-center flex-col gap-2'>
                            <Calendar className='text-blue-100' size={50} />
                            <p className='text-blue-200'>
                                {filtroTipo === "Todos" 
                                    ? "Nenhuma atividade registrada ainda" 
                                    : `Nenhuma atividade de ${filtroTipo} encontrada`
                                }
                            </p>
                        </div>
                    </div>
                ) : (
                    gruposAtividades.map((grupo, groupIndex) => (
                        <div key={groupIndex} className='bg-white rounded-lg shadow-lg p-4'>
                            <div className='flex items-center gap-2 mb-4 pb-2 border-b border-blue-100'>
                                <Calendar className='text-blue-500' size={18} />
                                <h3 className='text-lg font-semibold text-blue-950'>{grupo.data}</h3>
                                <span className='bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs'>
                                    {grupo.atividades.length}
                                </span>
                            </div>

                            <div className='space-y-2'>
                                {grupo.atividades.map((atividade) => {
                                    const indexOriginal = atividades.indexOf(atividade);
                                    return (
                                    <div key={indexOriginal} className="text-blue-900 text-sm">
                                        {atividade.tipo === 'Amamentação' && typeof atividade.valor === 'object' && 'duracao' in atividade.valor
                                            ? <div className='relative flex justify-between items-end border-blue-100 border rounded-xl px-4 py-2 '>
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
                                                <button className='absolute top-1 right-1 '
                                                    onClick={() => excluirAtividade(indexOriginal)}
                                                >
                                                    <CircleX size={14} className='text-red-200 hover:text-red-400'/>
                                                </button>
                                            </div>
                                            : atividade.tipo === 'Fralda' && typeof atividade.valor === 'object' && 'tipo' in atividade.valor
                                                ? <div className='relative flex justify-between items-end border-blue-100 border rounded-xl px-4 py-2 '>
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
                                                    <button className='absolute top-1 right-1 '
                                                        onClick={() => excluirAtividade(indexOriginal)}
                                                    >
                                                        <CircleX size={14} className='text-red-200 hover:text-red-400'/>
                                                    </button>
                                                </div>
                                                : atividade.tipo === 'Banho'
                                                    ? <div className='relative flex justify-between items-end border-blue-100 border rounded-xl px-4 py-2 '>
                                                        <div className='flex gap-3 items-center'>
                                                            <div className='bg-blue-100 w-10 h-10 flex items-center justify-center rounded-full'>
                                                                <Bath />
                                                            </div>
                                                            <div className='flex gap-2 items-center'>
                                                                <p className='text-[17px] '>{atividade.tipo}</p>
                                                                <span className='text-[13px] bg-blue-100 p-0.5 px-1 rounded-xl'>{atividade.horaRegistro}</span>
                                                            </div>
                                                        </div>
                                                        <button className='absolute top-1 right-1 '
                                                            onClick={() => excluirAtividade(indexOriginal)}
                                                        >
                                                            <CircleX size={14} className='text-red-200 hover:text-red-400'/>
                                                        </button>
                                                    </div>
                                                                                                                        : atividade.tipo === 'Sono' && typeof atividade.valor === 'object' && 'inicio' in atividade.valor
                                                        ? (
                                                            <div className='relative flex justify-between items-end border-blue-100 border rounded-xl px-4 py-2 '>
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
                                                                <button className='absolute top-1 right-1 '
                                                                    onClick={() => excluirAtividade(indexOriginal)}
                                                                >
                                                                    <CircleX size={14} className='text-red-200 hover:text-red-400'/>
                                                                </button>
                                                            </div>
                                                        )
                                                        : null
                                        }
                                    </div>
                                )})}
                            </div>
                        </div>
                    ))
                )}
            </section>
        </main>
    );
}

export default HistoricoCompleto;