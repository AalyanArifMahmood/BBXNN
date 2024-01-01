import React from 'react';
import { useNavigate } from 'react-router-dom';
import SpotifyAuth from './SpotifyAuth';

const SpotifyAuthWrapper = () => {
    const navigate = useNavigate();
    return <SpotifyAuth navigate={navigate} />;
};

export default SpotifyAuthWrapper;
