import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const headingContainerStyle = {
    backgroundColor: 'white',
    textAlign: 'center',
    padding: '60px 0', // Space above and below the heading
    position: 'relative',
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

class LettersToYou extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPdf: null,
            numPages: null,
        };

        this.pdfs = [
            { title: 'The First Attempt', path: '/PDFs/1.pdf' },
            { title: 'Letter 2', path: '/PDFs/2.pdf' },
            { title: 'Letter 3', path: '/PDFs/3.pdf' },
            { title: 'Letter 4', path: '/PDFs/4.pdf' },
            { title: 'Letter 1', path: '/PDFs/5.pdf' },
            { title: 'Letter 2', path: '/PDFs/6.pdf' },
            { title: 'Letter 1', path: '/PDFs/7.pdf' },
            { title: 'Letter 2', path: '/PDFs/8.pdf' },
            { title: 'Letter 1', path: '/PDFs/9.pdf' },
            { title: 'Letter 2', path: '/PDFs/10.pdf' },
        ];
    }


    openPdf = (pdfPath) => {
        this.setState({ selectedPdf: pdfPath });
    };

    closePopup = () => {
        this.setState({ selectedPdf: null });
    };

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };

    render() {
        const headingStyle = {
            fontFamily: '"Playfair Display", serif',
            fontSize: '2rem',
            textAlign: 'center',
            marginBottom: '20px',
        };

        const pdfContainerStyle = {
            display: 'flex',
            overflowX: 'auto', // Ensuring scrollability
            alignItems: 'center', // Align items vertically
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#f8f8f8',
            padding: '10px 20px', // Adjust padding for better spacing
            margin: '0 auto',
            whiteSpace: 'nowrap', // Prevents items from wrapping
        };

        const thumbnailContainerStyle = {
            width: '150px', // Fixed width for thumbnails
            marginRight: '15px', // Space between thumbnails
            display: 'inline-flex', // Inline-flex for horizontal layout
            flexDirection: 'column',
            alignItems: 'center', // Center align the contents
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        };

        const pdfStyle = {
            width: '100%', // Full width of the container
            overflow: 'hidden', // Hide overflow
        };

        const popupStyle = {
            overflow: 'scroll',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '10px',
            zIndex: 1001, // Ensure the popup is above other elements
            overflowY: 'auto', // Allow scrolling within the popup
            position: 'fixed', // Fixed position
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '50%', // Adjust as needed
            height: '80%', // Adjust as needed
            padding: '20px'
        };

        const phonePopupStyle = {
            ...popupStyle,
            width: '80%', // Wider width for phone screens
        };

        const closeButtonStyle = {
            right: 'initial',
            cursor: 'pointer',
            fontSize: '24px', // Larger font size for the 'X'
            fontWeight: 'bold',
            color: '#333',
            zIndex: 1002, // Higher z-index to be on top of the PDF
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
            borderRadius: '50%', // Circular shape
            padding: '5px', // Padding for a larger clickable area
            left: '5px',
            position: 'sticky', // Make the close button sticky
            top: '10px',
        };

        const pageStyle = {
            marginBottom: '20px', // Space between pages for clear separation
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', // Optional shadow for depth
            backgroundColor: '#fff', // White background for each page
            padding: '10px', // Padding around page content
        };

        const componentContainerStyle = {
            backgroundColor: '#f0e6d6',
            padding: '20px',
            paddingBottom: "5%",
            borderRadius: '8px',
            margin: '20px 0', // Add some margin for spacing
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // More pronounced shadow
            marginBottom: '-8px', // Pull up the next section slightly to overlap with the shadow
            position: 'relative', // Required for absolute positioning of elements inside
            zIndex: 2, // Ensure it's above the next section
        };

        document.body.style.overflow = this.state.selectedPdf ? 'hidden' : 'initial';
        const isPhoneScreen = window.innerWidth <= 768; // Adjust this threshold as needed
        const finalPopupStyle = isPhoneScreen ? phonePopupStyle : popupStyle;

        return (
            <div style={componentContainerStyle}>
                <h2 style={headingStyle}>Letters To You</h2>
                <div style={pdfContainerStyle}>
                    {this.pdfs.map((pdf, index) => (
                        <div key={index} onClick={() => this.openPdf(pdf.path)} style={thumbnailContainerStyle}>
                            <div style={pdfStyle}>
                                <Document file={pdf.path} loading="">
                                    <Page pageNumber={1} width={150} renderTextLayer={false} />
                                </Document>
                            </div>
                            <p style={{ marginTop: '5px' }}>{pdf.title}</p> {/* Ensure space for the title */}
                        </div>
                    ))}
                </div>

                {this.state.selectedPdf && (
                    <div style={finalPopupStyle}>
                        <span style={closeButtonStyle} onClick={this.closePopup}>&times;</span> {/* 'X' close button */}
                        <Document file={this.state.selectedPdf} onLoadSuccess={this.onDocumentLoadSuccess}>
                            {Array.from(new Array(this.state.numPages), (el, index) => (
                                <div key={index} style={pageStyle}>
                                <Page key={index} pageNumber={index + 1} width={window.innerWidth * 0.5} renderTextLayer={false} />
                                </div>
                            ))}
                        </Document>
                    </div>
                )}
            </div>
        );
    }
}

export default LettersToYou;