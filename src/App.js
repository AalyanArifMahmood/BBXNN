import React, { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import './App.css';
import Heading from "./Components/Heading/Heading";
import OurStory from "./Components/Story/OurStory";
import Letters from "./Components/PDFSection/Letters";
import Footer from "./Components/Footer";
import Pics from "./Components/Pictures/Pics";
import OurSongsWrapper from "./Components/OurSongs/OurSongsWrapper";
import SpotifyAuthWrapper from "./Components/OurSongs/SpotifyAuthWrapper";

function RedirectIfNotAuthenticated() {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Iy hit this part")
        const token = sessionStorage.getItem('spotifyToken');
        const expiryTime = sessionStorage.getItem('spotifyTokenExpiry');
        const isTokenValid = token && new Date().getTime() < parseInt(expiryTime);
        console.log(token)
        console.log(isTokenValid)
        if (!isTokenValid) {
            navigate('/spotify-auth');
        }
    }, [navigate]);

    // Return null because this component does not render anything
    return null;
}

function App() {
    return (
        <Router>
            <RedirectIfNotAuthenticated />
            <Routes>
                <Route path="/spotify-auth" element={<SpotifyAuthWrapper />} />
                <Route path="/" element={
                    <>
                        <Heading />
                        <OurStory />
                        <Pics />
                        <Letters />
                        <OurSongsWrapper />
                        {/*<Footer />*/}
                    </>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
