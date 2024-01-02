import React from 'react';
import '../../CSS/Heading.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


const headingContainerStyle = {
    background: 'linear-gradient(to right, white, #d3d3d3)',
    textAlign: 'center',
    padding: '60px 0',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    marginBottom: '-8px',
    zIndex: 2,
};

const headingStyle = {
    color: '#333333',
    fontFamily: '"Playfair Display", serif',
    fontSize: '2.5rem',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
};

const lineContainerStyle = {
    position: 'absolute',
    width: '100%',
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const lineStyle = {
    borderBottom: '1px solid #333333',
    flexGrow: 1,
    margin: '0 10px',
};

const heartStyle = {
    color: '#4F42B5',
    fontSize: '1.5rem',
};

class Heading extends React.Component {
    constructor() {
        super();
        this.state = {
            isVisible: false,
            matches: window.matchMedia("(min-width: 680px)").matches
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isVisible: true });
        }, 500);
        const handler = e => this.setState({matches: e.matches});
        window.matchMedia("(min-width: 680px)").addEventListener('change', handler);
    }

    render() {
        return (
            <div className={this.state.isVisible ? 'fade-in' : 'hidden'} style={headingContainerStyle}>
                    <img src={process.env.PUBLIC_URL + "/Bub.png"} alt="Bub" style={{ maxWidth: '100px', margin: '0 20px' }} /> {/* Adjust size and path */}
                    <div>
                        <div style={{ ...lineContainerStyle, top: '20px' }}>
                            <div style={lineStyle}></div>
                            <span style={heartStyle}>
                                <FontAwesomeIcon icon={faHeart} />
                            </span>

                            <div style={lineStyle}></div>
                        </div>
                        {this.state.matches && (
                            <h1 style={headingStyle}>Bub Bub × Nib Nib</h1>
                            )}
                        {!this.state.matches && (
                        <>
                            <h1 style={{...headingStyle, display: 'block', margin: '0'}}>Bub Bub</h1>
                            <h1 style={{...headingStyle, display: 'block', margin: '0'}}>×</h1>
                            <h1 style={{...headingStyle, display: 'block', margin: '0'}}>Nib Nib</h1>
                        </>
                        )}
                        <div style={{ ...lineContainerStyle, bottom: '20px' }}>
                            <div style={lineStyle}></div>
                            <span style={heartStyle}>
                                <FontAwesomeIcon icon={faHeart} />
                            </span>
                            <div style={lineStyle}></div>
                        </div>
                    </div>
                    <img src={process.env.PUBLIC_URL + "/Nib.png"} alt="Nib" style={{ maxWidth: '100px', margin: '0 20px' }} /> {/* Adjust size and path */}
            </div>
        );
    }
}

export default Heading;
