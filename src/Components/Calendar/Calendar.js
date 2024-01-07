import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";

const lineContainerStyle = {
    position: 'absolute',
    width: '60%',
    left: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const lineStyle = {
    borderBottom: '1px solid #FFFFFF',
    flexGrow: 1,
    marginTop: '20px',
    margin: '0 10px'
};

const heartStyle = {
    color: '#DAA520',
    fontSize: '1.5rem',
};

const localizer = momentLocalizer(moment);

class MyCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            events: this.createEvents(),
            isPhoneScreen: window.matchMedia("(max-width: 680px)").matches,
            selectedEvent: null,
            isVisible: false
        };
    }

    componentDidMount()
    {
        const mediaQuery = window.matchMedia("(max-width: 680px)");
        const handler = (e) => this.setState({ isPhoneScreen: e.matches });
        mediaQuery.addEventListener('change', handler);

        setTimeout(() => {
            this.setState({ isVisible: true });
        }, 3000);
    }

    onSelectEvent = (event) => {
        this.setState({ selectedEvent: event });
        this.props.setPopupOpen(true);
    }

    closePopup = () => {
        this.setState({ selectedEvent: null });
        this.props.setPopupOpen(false);
    }


    createEvents = () => {
        const events = [];
        const startYear = 2023;
        const endYear = new Date().getFullYear() + 50;
        const startDate = new Date(2022, 10, 29);

        const getOrdinalSuffix = (number) => {
            const j = number % 10,
                k = number % 100;
            if (j === 1 && k !== 11) {
                return number + "st";
            }
            if (j === 2 && k !== 12) {
                return number + "nd";
            }
            if (j === 3 && k !== 13) {
                return number + "rd";
            }
            return number + "th";
        };

        events.push({
            title: "Where it all started",
            start: new Date(2022, 10, 29),
            end: new Date(2022, 10, 29)
        });
        events.push({
            title: "1st Monthiversary",
            start: new Date(2022, 11, 29),
            end: new Date(2022, 11, 29)
        });

        // Repeat for each year from startYear to endYear
        for (let y = startYear; y <= endYear; y++) {
            // Anniversary event
            events.push({
                title: `${getOrdinalSuffix(y - startYear + 1)} Anniversary💜🐻🐭🤍`,
                start: new Date(y, 10, 29), // November 29th
                end: new Date(y, 10, 29)
            });


            for (let m = 0; m < 12; m++) {
                if (m !== 10) { // Skip November
                    let monthDiff = (new Date(y, m) - startDate) / (1000 * 60 * 60 * 24 * 30); // Approximate month difference
                    let ordinalMonth = Math.round(monthDiff) + 1; // Adding 1 to account for the skipped month
                    let day = (m === 1 && !this.isLeapYear(y)) ? 28 : 29;

                    events.push({
                        title: `${getOrdinalSuffix(ordinalMonth)} Monthiversary💜🤍`,
                        start: new Date(y, m, day),
                        end: new Date(y, m, day)
                    });
                }
            }

            events.push({
                title: `Nib Nib's ${getOrdinalSuffix(y - 2004)} Birthday!!🐭🤍`,
                start: new Date(y, 6, 31),
                end: new Date(y, 6, 31)
            });

            events.push({
                title: `Bub Bub's ${getOrdinalSuffix(y - 2001)} Birthday🐻💜`,
                start: new Date(y, 10, 20),
                end: new Date(y, 10, 20)
            });
        }

        return events;
    }


    isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    render() {
        const headingStyle = {
            fontFamily: '"Playfair Display", serif',
            fontSize: '2.5rem',
            textAlign: 'center',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            color: "#FFFFFF"
        };

        const headingStyle2 = {
            fontFamily: '"Playfair Display", serif',
            maxWidth: "60%",
            fontSize: '1.3rem',
            textAlign: 'center',
            marginBottom: '30px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            margin: '0 auto',
            color: "#FFFFFF"
        };

        const popupStyle = {
            display: this.state.selectedEvent ? "block" : "none",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1001,
        };

        const popupContentStyle = {
            backgroundColor: '#fdfdfd', // Soft white background
            border: '2px solid #4F42B5', // Stylish border color
            borderRadius: '15px', // Rounded corners
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)', // Subtle shadow
            zIndex: 1002,
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '30%',
            height: "60%",
            maxWidth: '600px',
            padding: '40px',
            overflowY: 'auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        };

        const phonePopupStyle = {
            ...popupContentStyle,
            width: "70%",
        };

        const isPhoneScreen = window.innerWidth <= 768;
        const finalPopupStyle = isPhoneScreen ? phonePopupStyle : popupContentStyle;

        const closePopupStyle = {
            cursor: "pointer",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#4F42B5",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "50%",
            padding: "5px",
            position: "absolute",
            top: "15px",
            right: "15px",
        };


        const componentContainerStyle = {
            background: 'linear-gradient(to right, #32CD32, #006400)',
            padding: '20px',
            paddingBottom: "5%",
            borderRadius: '8px',
            margin: '20px 0',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            marginBottom: '-8px',
            position: 'relative',
        };

        const calendarContainerStyle = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px", // Adjusted padding
            margin: "50px auto", // Simplified margin
            width: isPhoneScreen ?  '90%' : '70%', // Adjust width as needed
            maxWidth: '100%', // Ensure it doesn't exceed screen width
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#FFFFFF",
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        };

        const { selectedEvent } = this.state;
        document.body.style.overflow = this.state.selectedPdf ? 'hidden' : 'initial';
        return (
            <div style={componentContainerStyle} id={"calendar"} className={this.state.isVisible ? 'fade-in' : 'hidden'}>
                <h2 style={headingStyle}>Our Calendar</h2>
                <h2 style={headingStyle2}>Here you will find marked all the dates that mean something to us &#128522;</h2>
                <div style={lineContainerStyle}>
                    <div style={lineStyle}></div>
                    <span style={heartStyle}>
                        <FontAwesomeIcon icon={faHeart} />
                    </span>
                    <div style={lineStyle}></div>
                </div>
                <div style={calendarContainerStyle}>
                    <Calendar
                        localizer={localizer}
                        events={this.state.events}
                        startAccessor="start"
                        endAccessor="end"
                        onSelectEvent={this.onSelectEvent}
                        style={{ height: this.state.isPhoneScreen ? '50vh': '70vh', width:this.state.isPhoneScreen ? '90%': '100%', fontWeight: "bold" }}
                    />
                </div>
                {this.state.selectedEvent && (
                    <div style={popupStyle} onClick={this.closePopup}>
                        <div style={finalPopupStyle} onClick={(e) => e.stopPropagation()} className="popup-content">
                            <span style={closePopupStyle} onClick={this.closePopup}>&times;</span>
                            <h2 style={{fontWeight: "bold"}}>Bub Bub and Nib Nib present</h2>
                            <h2>{selectedEvent.title}</h2>
                            <p>{selectedEvent.start.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default MyCalendar;
