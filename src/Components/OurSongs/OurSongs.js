import React, { Component } from 'react';

const lineContainerStyle = {
    position: 'absolute',
    width: '60%',
    left: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const lineStyle = {
    borderBottom: '1px solid #333333',
    flexGrow: 1,
    marginTop: '20px',
    margin: '0 10px',
};

const heartStyle = {
    color: '#4F42B5',
    fontSize: '1.5rem',
};

class OurSongs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null, // State to hold the access token
            trackIds: [], // State to hold track IDs
            songs: [], // State to hold song details,
            isPhoneScreen: window.matchMedia("(max-width: 680px)").matches,
            selectedSong: null,
            isVisible: false,
            trackIDs: []
        };
        this.overlayRef = React.createRef();
    }

    openPopup = (song) => {
        document.body.style.overflow = 'hidden';
        this.setState({ selectedSong: song });
    };

    closePopup = () => {
        document.body.style.overflow = 'initial';
        this.setState({ selectedSong: null });
    };


    fetchSongs = () => {
        const { trackIds } = this.state;
        trackIds.forEach(trackId => this.fetchSong(trackId));
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ isVisible: true });
        }, 2500);
        const mediaQuery = window.matchMedia("(max-width: 680px)");
        const handler = (e) => this.setState({ isPhoneScreen: e.matches });
        mediaQuery.addEventListener('change', handler);
        const token = sessionStorage.getItem('spotifyToken');
        const expiryTime = sessionStorage.getItem('spotifyTokenExpiry');

        if (!token && !expiryTime) {
            console.log("reached no token or expiry")
            // Token and expiry are missing, redirect to auth
            this.props.navigate('/spotify-auth');
        } else if (!token || new Date().getTime() > parseInt(expiryTime)) {
            console.log("reached expired token")
            // Token is expired or not set, remove it and redirect to auth
            sessionStorage.removeItem("spotifyTokenExpiry");
            sessionStorage.removeItem("spotifyToken");
            this.props.navigate('/spotify-auth');
        } else {
            // Token is valid, proceed with fetching songs
            this.setState({ token }, this.fetchSongs);
        }

        // Handle token after successful authentication
        if (window.location.hash.includes("access_token")) {
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

            const newToken = hash.access_token;
            console.log("got new token")
            if (newToken) {
                const expiryTime = new Date().getTime() + 3600 * 1000; // 1 hour from now
                sessionStorage.setItem('spotifyToken', newToken);
                sessionStorage.setItem('spotifyTokenExpiry', expiryTime.toString());
                this.setState({ token: newToken }, this.fetchSongs);
                this.props.navigate('/');
            }
        }

        // Include your Spotify track links list (spotifyLinks) here
        const spotifyLinks = [
            'https://open.spotify.com/track/6ATM1zRLGYYP72J9xwnL1L?si=b43b26e7f4654796',
            'https://open.spotify.com/track/2LcXJP95e4HKydTZ2mYfrx?si=82a6d2dc86b541fb',
            'https://open.spotify.com/track/7vfCm8tEWV9lCpyY1nvJVB?si=c16dc0c64a6744ef',
            'https://open.spotify.com/track/4FeczSomVWVyU4FW7xDeAI?si=750e0440d9bb43d6',
            'https://open.spotify.com/track/5RR6Q4yCrbGiRCU5YbpNaY?si=1a6e3a88f529449b',
            'https://open.spotify.com/track/3uL1IBFhg52VcQqOwAG01E?si=96bf8a8a3041432e',
            'https://open.spotify.com/track/6W6omlQs3mySet0jTC6pvM?si=8a4610adc8f64cd9',
            'https://open.spotify.com/track/1J9vyEntJ79CppvgUxJs75?si=26afe79253704bc3',
            'https://open.spotify.com/track/2rOnSn2piaqLAlYjtfUBlY?si=1185c81c575044d2',
            'https://open.spotify.com/track/3ALndG2kl6LhnAoeAgLKTT?si=9a47744bd0184472',
            'https://open.spotify.com/track/395gJWcJQK0C3GJfHAn7f6?si=ed23d528c57243c2',
            'https://open.spotify.com/track/4uK0M8AI6gyFmyzUneQpbi?si=32b9bc1a1b594b75',
            'https://open.spotify.com/track/4iFPsNzNV7V9KJgcOX7TEO?si=642fee5a523047e5',

            // Add more links as needed
        ];

        const trackIdsSet = new Set(spotifyLinks.map(link =>
            link.split('/track/')[1].split('?')[0]
        ));
        const trackIds = Array.from(trackIdsSet); // Convert the Set back to an array

        // Set the spotifyLinks in the component state
        this.setState({ trackIds });
    }




    fetchSong = (trackId)=> {
        const { token } = this.state;
        fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(response => {
                if (response.status === 401) {
                    // Token expired
                    this.props.navigate('/spotify-auth');
                } else {
                    return response.json();
                }
            })
            .then(data => {
                if (data) {
                    this.setState(prevState => ({
                        songs: [...prevState.songs, data]
                    }));
                }
            })
            .catch(error => {
                console.error('Error fetching song:', error);
            });
    }




    renderSongs() {
        return this.state.songs.map((song, index) => (
            <div className="song-card" key={index}>
                {song.album && song.album.images.length > 0 && (
                    <img
                        src={song.album.images[0].url}
                        alt={song.name}
                        className="song-image"
                    />
                )}
                <div className="song-title">{song.name}</div>
                {/* Render artist name and other details as needed */}
            </div>
        ));
    }

    render() {
        const picsContainerStyle = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            overflowX: "auto",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f8f8f8",
            padding: "10px 20px",
            margin: "0 auto",
            marginTop: "50px",
        };

        const thumbnailContainerStyle = {
            width: '200px',
            marginRight: '15px',
            flexShrink: 0,
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: "15px",
            overflow: "hidden"
        };

        const thumbnailImageStyle = {
            width: "100%",
            height: "auto",
            objectFit: "cover",
        };

        const thumbnailTextStyle = {
            fontFamily: '"Playfair Display", serif',
            marginTop: "5px",
            maxWidth: "80%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: this.state.isPhoneScreen ? "1rem" : "1rem"
        };

        const popupStyle = {
            display: this.state.selectedSong ? "block" : "none",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1001,
        };

        const popupContentStyle = {
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "10px",
            zIndex: 1002,
            position: "fixed",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "50%",
            height: "80%",
            padding: "20px",
            overflowY: "auto",
        };

        const phonePopupStyle = {
            ...popupContentStyle,
            width: "80%",
            height: "50%",
        };

        const finalPopupStyle = this.state.isPhoneScreen ? phonePopupStyle : popupContentStyle;

        const closePopupStyle = {
            cursor: "pointer",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#333",
            zIndex: 1003,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "50%",
            padding: "5px",
            position: "absolute",
            top: "10px",
            right: "10px",
        };


        const headingStyle = {
            fontFamily: '"Playfair Display", serif',
            fontSize: '2.5rem',
            textAlign: 'center',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
        };

        const headingStyle2 = {
            fontFamily: '"Playfair Display", serif',
            maxWidth: "60%",
            fontSize: '1.3rem',
            textAlign: 'center',
            marginBottom: '30px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            margin: '0 auto',
        };

        const componentContainerStyle = {
            backgroundColor: '#e5e5db',
            padding: '20px',
            paddingBottom: "5%",
            borderRadius: '8px',
            margin: '20px 0',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            marginBottom: '-8px',
            position: 'relative',
            zIndex: 2,
        };

        const responsiveImageStyle = {
            maxWidth: "100%",
            height: "auto",
            display: "block",
            margin: "0 auto",
            borderRadius: "15px"
        };
        return (
            <div style={componentContainerStyle} className={this.state.isVisible ? 'fade-in' : 'hidden'}>
                <h2 style={headingStyle}>Our Songs</h2>
                <h2 style={headingStyle2}>This is some of the music you and I share together. Each song has some significance regarding our relationship &#129392;</h2>
                <div style={lineContainerStyle}>
                    <div style={lineStyle}></div>
                    <span style={heartStyle}>&hearts;</span>
                    <div style={lineStyle}></div>
                </div>
                <div style={picsContainerStyle}>
                    {this.state.songs.map((song, index) => (
                        <div
                            key={index}
                            style={thumbnailContainerStyle}
                            onClick={() => this.openPopup(song)}
                        >
                            <img
                                src={song.album.images[0].url}
                                alt={song.name}
                                style={thumbnailImageStyle}
                            />
                            <b style={thumbnailTextStyle}>{song.name}</b>
                        </div>
                    ))}
                </div>
                {this.state.selectedSong && (
                    <div style={popupStyle} onClick={this.closePopup} ref={this.overlayRef}>
                        <div style={finalPopupStyle} onClick={e => e.stopPropagation()}>
            <span
                style={closePopupStyle}
                onClick={this.closePopup}
            >
                &times;
            </span>
                            <img
                                src={this.state.selectedSong.album.images[0].url}
                                alt={this.state.selectedSong.name}
                                style={responsiveImageStyle}
                            />
                            <h2 style={{textAlign:"center", fontWeight: "bold"}}>{this.state.selectedSong.name}</h2>
                            <p style={{textAlign: "center", color: "gray", marginTop: "-15px"}}>{this.state.selectedSong.artists.map(artist => artist.name).join(", ")}</p>
                            {this.state.selectedSong.preview_url && (
                                <div>
                                    <audio
                                        src={this.state.selectedSong.preview_url}
                                        controls
                                        style={{ width: '100%' }}
                                    >
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </div>
        );

    }

}

export default OurSongs;