import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./pages/user";
import AuthentificationPage from "./components/utils/Authentification";
import HeaderComponent from "./components/Header";
import FooterComponent from "./components/Footer";

export default function Router(){
    return (
        <BrowserRouter>
                {/*
                <Route path="*" element={<NotFound>} />
                <Route path="/" element={<Home>} />
                */}
                <HeaderComponent />
                <Routes>
                    <Route path="/user/:id" element={<User />} />
                    <Route path="/authentification" element={<AuthentificationPage />} />
                </Routes>
                <FooterComponent />
        </BrowserRouter>
    )
}