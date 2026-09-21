import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage";
import User from "./pages/user";
import AuthentificationPage from "./components/utils/Authentification";
import HeaderComponent from "./components/Header";
import FooterComponent from "./components/Footer";
import NotFound from "./components/error/notFound";
import BuySection from "./components/shop/buySection";

export default function Router(){
    return (
        <BrowserRouter>
                <HeaderComponent />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/user/:id" element={<User />} />
                    <Route path="/authentification" element={<AuthentificationPage />} />
                    <Route path="/buy/:id" element={<BuySection />} />
                    <Route path ="*" element = {<NotFound />} />
                </Routes>
                <FooterComponent />
        </BrowserRouter>
    )
}