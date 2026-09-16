import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthentificationPage from "./components/utils/Authentification";

export default function Router(){
    return (
        <BrowserRouter>
            <Routes>
                {/*
                <Route path="*" element={<NotFound>} />
                <Route path="/" element={<Home>} />
                */}
	            <Route path ="/authentification" element = {<AuthentificationPage />} />           
            </Routes>
        </BrowserRouter>
    )
}