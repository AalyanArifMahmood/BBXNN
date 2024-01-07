import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import './App.css';
import Heading from "./Components/Heading/Heading";
import OurStory from "./Components/Story/OurStory";
import Letters from "./Components/PDFSection/Letters";
import Pics from "./Components/Pictures/Pics";
import OurSongsWrapper from "./Components/OurSongs/OurSongsWrapper";
import SpotifyAuthWrapper from "./Components/OurSongs/SpotifyAuthWrapper";
import Navbar from "./Components/Navbar/Navbar";
import Calendar from "./Components/Calendar/Calendar";


function RedirectIfNotAuthenticated() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('spotifyToken');
        const expiryTime = sessionStorage.getItem('spotifyTokenExpiry');
        const isTokenValid = token && new Date().getTime() < parseInt(expiryTime);
        console.log(token)
        console.log(isTokenValid)
        if (!isTokenValid) {
            navigate('/spotify-auth');
        }
    }, [navigate]);

    return null;
}

function App() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {

        if (isPopupOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'initial';
        }
    }, [isPopupOpen]);


    return (
        <Router>
            <RedirectIfNotAuthenticated />
            <Routes>
                <Route path="/spotify-auth" element={<SpotifyAuthWrapper />} />
                <Route path="/" element={
                    <>
                        {!isPopupOpen && <Navbar/>}
                        <Heading />
                        <OurStory />
                        <Pics isPopupOpen={isPopupOpen} setPopupOpen={setIsPopupOpen}/>
                        <Letters isPopupOpen={isPopupOpen} setPopupOpen={setIsPopupOpen}/>
                        <OurSongsWrapper isPopupOpen={isPopupOpen} setPopupOpen={setIsPopupOpen} />
                        <Calendar isPopupOpen={isPopupOpen} setPopupOpen={setIsPopupOpen}/>
                    </>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
