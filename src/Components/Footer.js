import React from "react";

class Footer extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            matches: window.matchMedia("(min-width: 680px)").matches
        };
    }

    componentDidMount()
    {
        const handler = e => this.setState({ matches: e.matches });
        window.matchMedia("(min-width: 680px)").addEventListener('change', handler);
        setTimeout(() => {
            this.setState({ isVisible: true });
        }, 2500);
    }

    render() {
        const footerStyle = {
            color: "#333333",
            marginTop: '30px',
            fontFamily: 'Newslab, georgia, Bakersville',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            textAlign: 'center'
        };

        return (
            <div className={this.state.isVisible ? 'fade-in' : 'hidden'}>
            <footer style={footerStyle}>
                Made with love by your Bub Bub &#129392;
            </footer>
            </div>
        );
    }
}

export default Footer;
