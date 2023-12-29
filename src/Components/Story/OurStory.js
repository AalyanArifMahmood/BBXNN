import React from 'react';

class OurStory extends React.Component {
    constructor() {
        super();
        this.state = {
            matches: window.matchMedia("(min-width: 680px)").matches,
            isVisible: false
        }
    }

    componentDidMount() {
        const handler = e => this.setState({ matches: e.matches });
        window.matchMedia("(min-width: 680px)").addEventListener('change', handler);
        setTimeout(() => {
            this.setState({ isVisible: true });
        }, 1000);
    }

    render() {
        const containerStyle = {
            display: 'flex',
            flexDirection: this.state.matches ? 'row' : 'column',
            alignItems: 'flex-start',
            justifyContent: this.state.matches ? 'center' : 'flex-start',
            padding: '20px',
            gap: '40px',
            marginLeft: this.state.matches ? '-5%' : '',
            position: 'relative',
            boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)'
        };


        const imageStyle = {
            borderRadius: '15px',
            width: this.state.matches ? '30%' : '70%',
            height: 'auto',
            marginBottom: this.state.matches ? '0' : '20px',
        };

        const textStyle = {
            width: this.state.matches ? '50%' : '100%',
            fontFamily: '"Open Sans", sans-serif',
        };

        const headingStyle = {
            fontFamily: '"Playfair Display", serif',
            fontSize: '2.5rem',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
        };

        return (
            <div style={{marginBottom: "-8px"}} className={this.state.isVisible ? 'fade-in' : 'hidden'}>
            <div style={containerStyle}>
                {this.state.matches && (
                    <img src={process.env.PUBLIC_URL + "/StoryPic.png"} alt="Our Story" style={imageStyle} />
                )}
                <div style={textStyle}>
                    <h2 style={headingStyle}>Our Story</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                </div>
                {!this.state.matches && (
                    <img src={process.env.PUBLIC_URL + "/StoryPic.png"} alt="Our Story" style={imageStyle} />
                )}
                {/*<div style={shadowStyle}></div>*/}
            </div>
            </div>
        );
    }
}

export default OurStory;
