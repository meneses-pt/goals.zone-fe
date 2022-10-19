import React from "react";
import Matches from "./Matches";
import Nav from "./Nav";
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import MatchPage from "./MatchPage";

function App() {

    return <BrowserRouter basename="/react">
        <Nav/>
        <Routes>
            <Route path="/" element={<Matches/>}/>
            <Route path="/:slug" element={<MatchPage/>}/>
        </Routes>
    </BrowserRouter>;
}

export default App;