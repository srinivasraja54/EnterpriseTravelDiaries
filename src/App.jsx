import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { PageLayout } from './components/PageLayout';
// import { loginRequest } from './authConfig';
// import { callMsGraph } from './graph';
// import { ProfileData } from './components/ProfileData';
import Update from './Routes/Update/Update';
import View from './Routes/View/View';
import LoginMessage from './components/LoginMessage';
import Navbar from './components/NavBar/Navbar';
import Home from './Routes/Home/Home';
import UpdateLanding from './Routes/Update/UpdateLanding';
import ViewLanding from './Routes/View/ViewLanding';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';

import './App.css';




/**
* If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
*/
const MainContent = () => {
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <Home />
            </AuthenticatedTemplate>
            <LoginMessage />
        </div>
    );
};

export default function App() {
    return (
        <Navbar>
            <div className="container">
            <Router>
                <Routes>
                    <Route path="/" element={<center>
                        <MainContent />
                    </center>
                    } />
                    <Route path="/post" element={<UpdateLanding />} />
                    <Route path="/post/:parameter" element={<Update />} />
                    <Route path="/view" element={<ViewLanding />} />
                    <Route path="/view/:parameter" element={<View />} />
                </Routes>
            </Router>
            </div>
        </Navbar>
    );
}

