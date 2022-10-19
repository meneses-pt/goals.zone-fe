import React from "react";
import Matches from "./Matches";
import Nav from "./Nav";
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import MatchPage from "./MatchPage";

function App() {

    return <BrowserRouter>
        <Nav/>
        <Routes>
            <Route path="react/" element={<Matches/>}/>
            <Route path="react/:slug" element={<MatchPage/>}/>
        </Routes>
    </BrowserRouter>;
}

export default App;