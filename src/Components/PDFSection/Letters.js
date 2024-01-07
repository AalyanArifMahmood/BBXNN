import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


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


class LettersToYou extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPdf: null,
            numPages: null,
            isVisible: false,
            selectedPdfTitle: null,
            matches: window.matchMedia("(min-width: 680px)").matches
        };

        this.overlayRef = React.createRef();

        this.pdfs = [
            { title: 'The First Attempt', path: process.env.PUBLIC_URL+'/PDFs/1.pdf' },
            { title: 'Ah shit, my heart bled onto this piece of paper💜', path: process.env.PUBLIC_URL+'/PDFs/2.pdf' },
            { title: 'A kiss under the snow', path: process.env.PUBLIC_URL+'/PDFs/3.pdf' },
            { title: 'Mathematical Masterpiece', path: process.env.PUBLIC_URL+'/PDFs/4.pdf' },
            { title: 'Smile my boy, it’s sunrise!', path: process.env.PUBLIC_URL+'/PDFs/5.pdf' },
            { title: 'The confession💜', path: process.env.PUBLIC_URL+'/PDFs/6.pdf' },
            { title: 'Ah, to be with you for a New Year Eve’s Kiss😘', path: process.env.PUBLIC_URL+'/PDFs/7.pdf' },
            { title: 'I swear I couldn’t love you more than I do right now, and yet I know I will tomorrow ', path: process.env.PUBLIC_URL+'/PDFs/8.pdf' },
            { title: 'Love is the one thing that transcends the dimensions of time and space', path: process.env.PUBLIC_URL+'/PDFs/9.pdf' },
            { title: 'Half a year now, Half a decade some day', path: process.env.PUBLIC_URL+'/PDFs/10.pdf' },
            { title: 'To my Nib Nib', path: process.env.PUBLIC_URL+'/PDFs/11.pdf' },
            { title: 'The missing piece', path: process.env.PUBLIC_URL+'/PDFs/12.pdf' },
            { title: 'New Year, New Adventure', path: process.env.PUBLIC_URL+'/PDFs/13.pdf' },
            { title: 'The Sleeping Angel', path: process.env.PUBLIC_URL+'/PDFs/14.pdf' },
            { title: 'The honour is mine', path: process.env.PUBLIC_URL+'/PDFs/15.pdf' },
            { title: 'New Year, same old nerd', path: process.env.PUBLIC_URL+'/PDFs/16.pdf' }
        ];
    }

    componentDidMount()
    {
        setTimeout(() => {
            this.setState({ isVisible: true });
        }, 2000);
        const handler = e => this.setState({ matches: e.matches });
        window.matchMedia("(min-width: 680px)").addEventListener('change', handler);
    }


    openPdf = (pdfPath, pdfTitle) => {
        this.setState({ selectedPdf: pdfPath, selectedPdfTitle: pdfTitle });
        this.props.setPopupOpen(true);
    };

    closePopup = () => {
        this.setState({ selectedPdf: null });
        this.props.setPopupOpen(false);
    };

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };

    render() {
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


        const pdfContainerStyle = {
            display: 'flex',
            overflowX: 'auto',
            alignItems: 'center',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#f8f8f8',
            padding: '10px 20px',
            margin: '0 auto',
            whiteSpace: 'nowrap',
            marginTop: '50px'
        };

        const thumbnailContainerStyle = {
            width: '200px',
            marginRight: '15px',
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        };

        const thumbnailTextStyle = {
            fontFamily: '"Playfair Display", serif',
            marginTop: '5px',
            maxWidth: '80%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        };

        const pdfStyle = {
            width: '100%',
            overflow: 'hidden',
        };

        const popupStyle = {
            overflow: 'scroll',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '10px',
            zIndex: 1001,
            overflowY: 'auto',
            position: 'fixed',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '50%',
            height: '80%',
            padding: '20px'
        };

        const phonePopupStyle = {
            ...popupStyle,
            width: '80%',
        };

        const closeButtonStyle = {
            right: 'initial',
            cursor: 'pointer',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333',
            zIndex: 1002,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '50%',
            padding: '5px',
            left: '5px',
            position: 'sticky',
            top: '10px',
        };

        const pageStyle = {
            marginBottom: '20px',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
        };

        const componentContainerStyle = {
            background: 'linear-gradient(to right, #cecec5, #a8b0ce)',
            padding: '20px',
            paddingBottom: "5%",
            borderRadius: '8px',
            margin: '20px 0',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            marginBottom: '-8px',
            position: 'relative',
        };

        const overlayStyle = {
            display: this.state.selectedPdf ? 'block' : 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
        };

        const stickyBarStyle = {
            backgroundColor: '#4F42B5',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '5px 20px',
            height: '40px',
            position: 'fixed',
            top: 0,
            width: '95%',
            left: 0,
            zIndex: 1001,
        };


        const titleStyle = {
            fontFamily: '"Playfair Display", serif',
            fontSize: this.state.matches ? '1.3rem': '1rem',
        };


        document.body.style.overflow = this.state.selectedPdf ? 'hidden' : 'initial';
        const isPhoneScreen = window.innerWidth <= 768;
        const finalPopupStyle = isPhoneScreen ? phonePopupStyle : popupStyle;
        return (
            <div id={"letters"} style={componentContainerStyle} className={this.state.isVisible ? 'fade-in' : 'hidden'}>
                <h2 style={headingStyle}>Letters To You</h2>
                <h2 style={headingStyle2}>This is a collection of all the letters I have written to you. I filled all of them with love, all the love I have for you &#128525;</h2>
                <div style={lineContainerStyle}>
                    <div style={lineStyle}></div>
                    <span style={heartStyle}>
                                <FontAwesomeIcon icon={faHeart} />
                            </span>
                    <div style={lineStyle}></div>
                </div>
                <div style={pdfContainerStyle}>
                    {this.pdfs.map((pdf, index) => (
                        <div key={index} onClick={() => this.openPdf(pdf.path, pdf.title)} style={thumbnailContainerStyle}>
                            <div style={pdfStyle}>
                                <Document file={pdf.path} loading="">
                                    <Page size="A4" pageNumber={1} width={150} renderTextLayer={false} />
                                </Document>
                            </div>
                            <b style={thumbnailTextStyle}>{pdf.title}</b>
                        </div>
                    ))}
                </div>

                {this.state.selectedPdf && (
                    <>
                        <div style={overlayStyle} onClick={this.closePopup} ref={this.overlayRef}></div>
                        <div style={finalPopupStyle}>
                            <div style={stickyBarStyle}>
                                <span style={titleStyle}>{this.state.selectedPdfTitle}</span>
                                <span style={closeButtonStyle} onClick={this.closePopup}>&times;</span>
                            </div>
                            <Document
                                file={this.state.selectedPdf}
                                onLoadSuccess={this.onDocumentLoadSuccess}
                                loading=""
                            >
                                {Array.from(new Array(this.state.numPages), (el, index) => (
                                    <div key={index} style={pageStyle}>
                                        <Page
                                            size="A3"
                                            pageNumber={index + 1}
                                            width={window.innerWidth <= 768 ? 300 : window.innerWidth * 0.5}
                                            renderTextLayer={false}
                                        />
                                    </div>
                                ))}
                            </Document>
                        </div>
                    </>
                )}
            </div>
        );
    }
}

export default LettersToYou;