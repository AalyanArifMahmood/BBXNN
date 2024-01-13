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
                        {!isPopupOpen && <BackToTopButton/>}
                    </>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

function BackToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        isVisible && (
            <div onClick={scrollToTop} style={backToTopStyle} title="Back to top">
                &#x21e7;
            </div>
        )
    );
}

const backToTopStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    color: 'black',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
    fontSize: '25px',
    zIndex: 1000,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    lineHeight: '40px',
};



export default App;
