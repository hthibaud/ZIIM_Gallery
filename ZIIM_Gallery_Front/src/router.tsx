import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage";
import User from "./pages/user";
import AuthentificationPage from "./components/utils/Authentification";
import NotFound from "./components/error/notFound";

export default function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/user/:id" element={<User />} />
	            <Route path ="/authentification" element = {<AuthentificationPage />} />
                <Route path ="*" element = {<NotFound />} />           
            </Routes>
        </BrowserRouter>
    )
}