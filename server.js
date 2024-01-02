const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3001;

// Replace these with your actual Spotify credentials
const CLIENT_ID = '5bda10aa895846d1937a499053abe427';
const CLIENT_SECRET = 'fb83fd6148b747dabbd5ae2adf9f0459';

app.get('/refresh-token', (req, res) => {
    // Retrieve the refresh token from where you have stored it
    const refreshToken = 'your_stored_refresh_token';

    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        })
    })
        .then(response => response.json())
        .then(data => {
            if(data.access_token) {
                // Send the new access token and its expiry time back to the frontend
                res.json({ token: data.access_token, expiresIn: data.expires_in * 1000 });
            } else {
                // Handle the error scenario, maybe the refresh token is expired
                res.status(401).json({ error: 'Failed to refresh token' });
            }
        })
        .catch(error => {
            console.error('Error refreshing access token:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
