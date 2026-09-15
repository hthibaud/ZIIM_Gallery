import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage";

export default function Router(){
    return (
        <BrowserRouter>
            <Routes>
                {/*
                <Route path="*" element={<NotFound />} /> */}
                <Route path="/" element={<Homepage />} />
            </Routes>
        </BrowserRouter>
    )
}