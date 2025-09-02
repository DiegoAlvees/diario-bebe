import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Atividades from "../pages/Atividades";
import Vacinas from "../pages/Vacinas";
import Historico from "../pages/Historico";
import Perfil from "../pages/Perfil";
import Footer from "../components/FooterNavigation";
import TelaLogin from "../pages/Login";

function AppRoutes() {
    const [configurado, setConfigurado] = useState<boolean | null>(null);


    useEffect(() => {
        const appConfigurado = localStorage.getItem("app-configurado") === "true";
        setConfigurado(appConfigurado);
    }, []);

    if (configurado === null) {
        return <div className="flex justify-center items-center h-screen">Carregando...</div>;
    }

    return (
        <BrowserRouter>
            <Routes>
                {!configurado ? (
                    <Route path="*" element={<TelaLogin onComplete={() => setConfigurado(true)} />} />
                ) : (
                    <>
                        <Route path="/" element={<Atividades />} />
                        <Route path="/vacinas" element={<Vacinas />} />
                        <Route path="/historico" element={<Historico />} />
                        <Route path="/perfil" element={<Perfil />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </>
                )}
            </Routes>

            {configurado && <Footer />}
        </BrowserRouter>
    );
}

export default AppRoutes;
