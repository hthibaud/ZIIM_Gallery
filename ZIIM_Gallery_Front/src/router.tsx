import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage";
import User from "./pages/user";
import RegisterPage from "./components/utils/register";
import Login from "./components/utils/login";
import HeaderComponent from "./components/Header";
import FooterComponent from "./components/Footer";
import NotFound from "./components/error/notFound";
import BuySection from "./components/shop/buySection";
import Create from "./components/utils/Create"

export default function Router(){
    return (
        <BrowserRouter>
                <HeaderComponent />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/user/:id" element={<User />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/buy/:id" element={<BuySection />} />
                    <Route path ="*" element = {<NotFound />} />
                    <Route path="/create" element={<Create />} />
                </Routes>
                <FooterComponent />
        </BrowserRouter>
    )
}