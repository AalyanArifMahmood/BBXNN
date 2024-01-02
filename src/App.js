import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Heading from "./Components/Heading/Heading";
import OurStory from "./Components/Story/OurStory";
import Letters from "./Components/PDFSection/Letters";
import Footer from "./Components/Footer";
import Pics from "./Components/Pictures/Pics";
import OurSongsWrapper from "./Components/OurSongs/OurSongsWrapper";
import SpotifyAuthWrapper from "./Components/OurSongs/SpotifyAuthWrapper";
import SpotifyAuth from "./Components/OurSongs/SpotifyAuth";
import OurSongs from "./Components/OurSongs/OurSongs";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/spotify-auth" element={<SpotifyAuthWrapper />} />
                <Route path="/" element={
                    <>
                        <Heading />
                        <OurStory />
                        <Pics />
                        <Letters />
                        <OurSongsWrapper />
                        <Footer />
                    </>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
