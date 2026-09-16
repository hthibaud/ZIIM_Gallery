import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./pages/user";
import AuthentificationPage from "./components/utils/Authentification";

export default function Router(){
    return (
        <BrowserRouter>
            <Routes>
                {/*
                <Route path="*" element={<NotFound>} />
                <Route path="/" element={<Home>} />
                */}
                <Route path="/user/:id" element={<User />} />
	            <Route path ="/authentification" element = {<AuthentificationPage />} />           
            </Routes>
        </BrowserRouter>
    )
}