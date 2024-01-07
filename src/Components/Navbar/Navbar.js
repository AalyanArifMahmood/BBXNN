import React from 'react';
import Scrollspy from 'react-scrollspy';
import '../../CSS/Navbar.css';

class Navbar extends React.Component {
    constructor() {
        super();
        this.state = {
            matches: window.matchMedia("(min-width: 680px)").matches,
            showNavbar: false
        };
    }

    componentDidMount() {
        const handler = e => this.setState({ matches: e.matches });
        window.matchMedia("(min-width: 680px)").addEventListener('change', handler);
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const headingSection = document.getElementById('heading');
        const showNavbar = window.scrollY > headingSection.offsetTop + headingSection.offsetHeight;
        this.setState({ showNavbar });
    }

    render() {
        const { matches } = this.state;
        const { isPopupOpen } = this.props;
        const navbarStyle = {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            background: 'linear-gradient(to right, white, #d3d3d3)',
            flexDirection: matches ? 'row' : 'column',
        };

        return (
            <nav className={`desktop-navigation ${this.state.showNavbar ? 'visible' : ''} ${isPopupOpen ? 'disable-clicks' : ''}`} style={navbarStyle}>
                <div>
                    {matches ? (<h2>&nbsp; Bub Bub x Nib Nib </h2>) : (<h2>Bub Bub x Nib Nib</h2>)}
                </div>
                <Scrollspy
                    items={['ourstory', 'memories', 'letters', 'oursongs', 'calendar']}
                    currentClassName="active">
                    <li><a href="#ourstory">Story</a></li>
                    <li><a href="#memories">Memories</a></li>
                    <li><a href="#letters">Letters</a></li>
                    <li><a href="#oursongs">Songs</a></li>
                    <li><a href="#calendar">Calendar</a></li>
                </Scrollspy>
            </nav>
        );
    }
}

export default Navbar;
