import React, { Component } from 'react';

class SpotifyAuth extends Component {
    componentDidMount() {
        const hash = window.location.hash
            .substring(1)
            .split('&')
            .reduce((initial, item) => {
                if (item) {
                    const parts = item.split('=');
                    initial[parts[0]] = decodeURIComponent(parts[1]);
                }
                return initial;
            }, {});

        const token = hash.access_token;
        if (token) {
            const expiryTime = new Date().getTime() + 3600 * 1000; // 1 hour from now
            localStorage.setItem('spotifyToken', token);
            localStorage.setItem('spotifyTokenExpiry', expiryTime.toString());
            this.props.history.push('/your-main-route');
        } else {
            this.authenticateSpotify();
        }


    }

    authenticateSpotify() {
        const authEndpoint = 'https://accounts.spotify.com/authorize';
        const clientId = '5bda10aa895846d1937a499053abe427'; // Replace with your Spotify Client ID
        const redirectUri = 'http://localhost:3000'; // Adjust as necessary
        const scopes = []; // Add scopes here if needed
        window.location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
    }

    render() {
        return (
            <div>Loading...</div> // Or any other loading state
        );
    }
}

export default SpotifyAuth;
