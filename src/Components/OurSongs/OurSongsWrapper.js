import React from 'react';
import { useNavigate } from 'react-router-dom';
import OurSongs from './OurSongs';

const OurSongsWrapper = () => {
    const navigate = useNavigate();

    return <OurSongs navigate={navigate} />;
}

export default OurSongsWrapper;
