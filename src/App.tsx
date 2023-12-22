import React from "react";
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import Matches from "./Matches";
import MatchPage from "./MatchPage";
import Nav from "./Nav";
import TeamPage from "./TeamPage";
import Teams from "./Teams";

function App() {

    return <BrowserRouter>
        <Nav/>
        <Routes>
            <Route path="/" element={<Matches/>}/>
            <Route path="/:slug" element={<MatchPage/>}/>
            <Route path="teams" element={<Teams/>}/>
            <Route path="teams/:slug" element={<TeamPage/>}/>
        </Routes>
    </BrowserRouter>;
}

export default App;