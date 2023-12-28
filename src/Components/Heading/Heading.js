import React from 'react';
import '../../CSS/Heading.css'

const headingContainerStyle = {
    backgroundColor: 'white',
    textAlign: 'center',
    padding: '60px 0', // Space above and below the heading
    position: 'relative',
    display: 'flex', // Use flexbox layout
    alignItems: 'center', // Align items vertically
    justifyContent: 'space-between', // Distribute space between items
};

const headingStyle = {
    color: '#333333',
    fontFamily: '"Playfair Display", serif',
    fontSize: '2.5rem',
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
    margin: '0 10px', // Space around the heart
};

const heartStyle = {
    color: '#4F42B5',
    fontSize: '1.5rem',
};

class Heading extends React.Component {
    constructor() {
        super();
        this.state = {
            isVisible: false
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isVisible: true });
        }, 500); // Delay for the heading to appear
    }

    render() {
        return (
            <div className={this.state.isVisible ? 'fade-in' : 'hidden'} style={{ boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)' }}>
                <div style={headingContainerStyle}>
                    <img src="/Bub.jpeg" alt="Bub" style={{ maxWidth: '100px', margin: '0 20px' }} /> {/* Adjust size and path */}
                    <div>
                        <div style={{ ...lineContainerStyle, top: '20px' }}>
                            <div style={lineStyle}></div>
                            <span style={heartStyle}>&hearts;</span>
                            <div style={lineStyle}></div>
                        </div>
                        <h1 style={headingStyle}>Bub Bub × Nib Nib</h1>
                        <div style={{ ...lineContainerStyle, bottom: '20px' }}>
                            <div style={lineStyle}></div>
                            <span style={heartStyle}>&hearts;</span>
                            <div style={lineStyle}></div>
                        </div>
                    </div>
                    <img src="/Nib.jpeg" alt="Nib" style={{ maxWidth: '100px', margin: '0 20px' }} /> {/* Adjust size and path */}
                </div>
            </div>
        );
    }
}

export default Heading;
