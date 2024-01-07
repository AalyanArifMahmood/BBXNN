import React from 'react';
import { useNavigate } from 'react-router-dom';
import OurSongs from './OurSongs';

const OurSongsWrapper = ({ isPopupOpen, setPopupOpen }) => {
    const navigate = useNavigate();

    return <OurSongs navigate={navigate} isPopupOpen={isPopupOpen} setPopupOpen={setPopupOpen} />;
}

export default OurSongsWrapper;