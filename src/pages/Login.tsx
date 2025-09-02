import { Baby, Calendar, User, ArrowRight, Download } from 'lucide-react';
import { useState, useEffect } from 'react';

interface DadosBebe {
    nome: string;
    dataNascimento: string;
}

interface TelaLoginProps {
    onComplete: (dados: DadosBebe) => void;
}

// Tipagem correta para o evento beforeinstallprompt
interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function TelaLogin({ onComplete }: TelaLoginProps) {
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [erro, setErro] = useState('');

    // Estados para PWA
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showInstallButton, setShowInstallButton] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            const event = e as BeforeInstallPromptEvent;
            event.preventDefault();
            setDeferredPrompt(event);
            setShowInstallButton(true);
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const validarDados = () => {
        setErro('');

        if (!nome.trim()) {
            setErro('Por favor, digite o nome do bebê');
            return false;
        }

        if (!dataNascimento) {
            setErro('Por favor, selecione a data de nascimento');
            return false;
        }

        const dataSelecionada = new Date(dataNascimento);
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

    const handleSubmit = () => {
        if (validarDados()) {
            const dadosBebe = { nome: nome.trim(), dataNascimento };
            localStorage.setItem('dados-bebe', JSON.stringify(dadosBebe));
            localStorage.setItem('app-configurado', 'true');
            
            onComplete(dadosBebe);
        }
    };

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log("Instalação:", outcome);
        setDeferredPrompt(null);
        setShowInstallButton(false);
    };

    return (
        <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 min-h-screen flex items-center justify-center px-5">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
                        <Baby className="text-white" size={40} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Bem-vindo!
                    </h1>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
                            <User size={16} className="text-blue-500" />
                            Nome do bebê
                        </label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Digite o nome do seu bebê"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
                            maxLength={50}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
                            <Calendar size={16} className="text-blue-500" />
                            Data de nascimento
                        </label>
                        <input
                            type="date"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none transition-colors text-gray-800"
                            max={new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    {erro && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-red-600 text-sm text-center">{erro}</p>
                        </div>
                    )}

                    <button
                        onClick={handleSubmit}
                        disabled={!nome.trim() || !dataNascimento}
                        className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold py-4 rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        <span>Começar jornada</span>
                        <ArrowRight size={20} />
                    </button>

                    {showInstallButton && (
                        <button
                            onClick={handleInstallClick}
                            className="w-full mt-3 bg-gradient-to-r from-green-400 to-green-500 text-white font-bold py-3 rounded-xl hover:from-green-500 hover:to-green-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            <Download size={18} />
                            <span>Baixar App</span>
                        </button>
                    )}
                </div>

                <div className="text-center mt-6 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                        Esses dados ficarão salvos apenas no seu dispositivo
                    </p>
                </div>
            </div>
        </div>
    );
}
