import { useState, useEffect } from 'react';
import { Baby, Droplets, Syringe } from 'lucide-react';
import { calcularDiasDeVida } from '../utils/calcularIdade';

function Perfil() {
    const dadosSalvos = JSON.parse(localStorage.getItem('dados-bebe') || '{}');
    const nomeInicial = dadosSalvos?.nome || 'Bebê';
    const dataInicial = dadosSalvos?.dataNascimento || new Date().toISOString().split("T")[0];

    const [nome, setNome] = useState(nomeInicial);
    const [dataNascimento, setDataNascimento] = useState(dataInicial);
    const [idade, setIdade] = useState(calcularDiasDeVida(dataInicial));

    const [nomeTemp, setNomeTemp] = useState(nomeInicial);
    const [dataTemp, setDataTemp] = useState(dataInicial);

    const [erro, setErro] = useState('');

    useEffect(() => {
        setIdade(calcularDiasDeVida(dataNascimento));
    }, [dataNascimento]);

    const validarDados = (): boolean => {
        setErro('');

        if (!nomeTemp.trim()) {
            setErro('Por favor, digite o nome do bebê');
            return false;
        }

        if (!dataTemp) {
            setErro('Por favor, selecione a data de nascimento');
            return false;
        }

        const dataSelecionada = new Date(dataTemp);
        const hoje = new Date();

        if (dataSelecionada > hoje) {
            setErro('A data de nascimento não pode ser no futuro');
            return false;
        }

        const cincoAnosAtras = new Date();
        cincoAnosAtras.setFullYear(hoje.getFullYear() - 5);

        if (dataSelecionada < cincoAnosAtras) {
            setErro('Data de nascimento muito antiga. Este app é para bebês');
            return false;
        }

        return true;
    };

    const salvarPerfil = () => {
        if (validarDados()) {
            setNome(nomeTemp);
            setDataNascimento(dataTemp);
            localStorage.setItem('dados-bebe', JSON.stringify({ nome: nomeTemp, dataNascimento: dataTemp }));
            alert('Perfil atualizado!');
        }
    };

    const limparHistorico = () => {
        if (confirm('Tem certeza que deseja apagar todo o histórico?')) {
            localStorage.removeItem('atividades-noah');
            localStorage.removeItem('vacinas-noah');
            alert('Histórico apagado!');
        }
    };

    return (
        <main className="bg-blue-50 min-h-screen px-5 pb-20">
            <header className="flex items-center gap-2 pt-10">
                <div className="flex justify-center items-center w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full">
                    <Baby className='text-white' size={38} />
                </div>
                <div>
                    <p className='text-xl font-bold text-blue-950'>{nome}</p>
                    <p className='text-blue-950'>{idade}</p>
                </div>
            </header>

            <section className='mt-10 bg-white rounded-lg shadow-lg px-5 py-5'>
                <p className='text-[22px] text-blue-950 font-semibold mb-4'>Editar Perfil</p>
                
                <div className='flex flex-col gap-4'>
                    <div>
                        <label className='block text-blue-950 mb-1'>Nome do bebê</label>
                        <input 
                            type="text"
                            value={nomeTemp}
                            onChange={(e) => setNomeTemp(e.target.value)}
                            className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                            maxLength={50}
                        />
                    </div>

                    <div>
                        <label className='block text-blue-950 mb-1'>Data de nascimento</label>
                        <input 
                            type="date"
                            value={dataTemp}
                            onChange={(e) => setDataTemp(e.target.value)}
                            className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                            max={new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    {erro && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-red-600 text-sm text-center">{erro}</p>
                        </div>
                    )}

                    <button 
                        onClick={salvarPerfil}
                        disabled={!nomeTemp.trim() || !dataTemp || !!erro}
                        className='w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold py-2 rounded-md active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        Salvar Alterações
                    </button>

                    <button
                        onClick={limparHistorico}
                        className='w-full bg-red-200 text-red-700 font-semibold py-2 rounded-md active:scale-95 transition-transform'
                    >
                        Apagar Todo Histórico
                    </button>
                </div>
            </section>

            <section className='mt-10 bg-white rounded-lg shadow-lg px-5 py-5'>
                <p className='text-[22px] text-blue-950 font-semibold mb-4'>Histórico Resumido</p>

                <div className='flex flex-col gap-3'>
                    <div className='flex items-center gap-3'>
                        <Droplets className='text-blue-400' size={24} />
                        <span>Atividades registradas: {JSON.parse(localStorage.getItem('atividades-noah') || '[]').length}</span>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Syringe className='text-orange-400' size={24} />
                        <span>Vacinas registradas: {JSON.parse(localStorage.getItem('vacinas-noah') || '[]').length}</span>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Perfil;
