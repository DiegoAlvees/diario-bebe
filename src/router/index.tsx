import { BrowserRouter, Routes, Route } from "react-router-dom";
import Atividades from "../pages/Atividades";
import Vacinas from "../pages/Vacinas";
import Historico from "../pages/Historico";

function AppRoutes() {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Atividades />} />
                <Route path="/vacinas" element={<Vacinas />} />
                <Route path="/historico" element={<Historico />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;