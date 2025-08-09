import { BrowserRouter, Routes, Route } from "react-router-dom";
import Atividades from "../pages/Atividades";
import Vacinas from "../pages/Vacinas";
import Historico from "../pages/Historico";
import Perfil from "../pages/Perfil"
import Footer from "../components/FooterNavigation";

function AppRoutes() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Atividades />} />
                <Route path="/vacinas" element={<Vacinas />} />
                <Route path="/historico" element={<Historico />} />
                <Route path="/perfil" element={<Perfil />} />

            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default AppRoutes;