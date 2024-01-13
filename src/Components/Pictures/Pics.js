import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

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
    color: '#FFFFFF',
    fontSize: '1.5rem',
};

class Pics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPic: null,
            isVisible: false,
            isPhoneScreen: window.matchMedia("(max-width: 680px)").matches
        };
        this.overlayRef = React.createRef();
    }

    componentDidMount()
    {
        setTimeout(() => {
            this.setState({ isVisible: true });
        }, 1500);
        const mediaQuery = window.matchMedia("(max-width: 680px)");
        const handler = (e) => this.setState({ isPhoneScreen: e.matches });
        mediaQuery.addEventListener('change', handler);

        return ()=> mediaQuery.removeEventListener('change', handler);
    }

    openPopup = (pic) => {
        document.body.style.overflow = 'hidden';
        this.setState({ selectedPic: pic });
        this.props.setPopupOpen(true);
    };

    closePopup = () => {
        document.body.style.overflow = 'initial';
        this.setState({ selectedPic: null });
        this.props.setPopupOpen(false);
    };


    render() {
        const { isPhoneScreen } = this.state;
        const pics = [
            {
                title: "Anniversary cake for Nib Nib",
                description: "Nib Nib is always hungy, and it is rule number 1 in the Nib NIb handbook that she must always be kept well fed, which is why Bub Bub is seen here feeding her cake!",
                path: process.env.PUBLIC_URL + "/Pics/1.png",
            },
            {
                title: "Color the Nib Nib",
                description: "This is one of my favorite pictures of us, because we both look so happy in it! I remember that spring dinner like it was yesterday, and i will cherish that memory, forever and always",
                path: process.env.PUBLIC_URL + "/Pics/2.png",
            },
            {
                title: "Siwwy",
                description: "This is one of the first pictures we took together, and it is so silly and cartooney! We are so cute!!",
                path: process.env.PUBLIC_URL + "/Pics/3.png",
            },
            {
                title: "A beautiful kiss",
                description: "I love this picture with all my heart, because it reminds me just how much I love you, and that despite any hardship or hurdle, we will always overcome it. Your kisses are truly magic, meri jaan!🥰",
                path: process.env.PUBLIC_URL + "/Pics/4.png",
            },
            {
                title: "Signature look of concern",
                description: "I don't know what is happening here, either you are biting my ear off or you are sucking my cheek. Either way, I look so concerned!!🤣",
                path: process.env.PUBLIC_URL + "/Pics/5.png",
            },
            {
                title: "Literally a band's cover photo",
                description: "I love how random and strange we are, and how silly we can be with each other. We randomly took this picture and became an absolute masterpiece!😎",
                path: process.env.PUBLIC_URL + "/Pics/6.png",
            },
            {
                title: "And at last I see the light",
                description: "I will never forget how magical this night was! Getting to watch a performance where our interests intersected, while being surrounded by candles, just like in Tangled... I wish I could relive that day a thousand times. I love you so much meri jaan!😍",
                path: process.env.PUBLIC_URL + "/Pics/7.png",
            },
            {
                title: "The sexiest girl in the world!",
                description: "I just had to put this picture in here, because you look so FREAKIN beautiful in it, and so damn sexy!🥵 I look at this picture at least 900 times a day, and I fall in love with you each time I do😍",
                path: process.env.PUBLIC_URL + "/Pics/8.png",
            },
            {
                title: "Kinda nervous, my date is too pretty!",
                description: "I remember this very spontaneous date! It is always an honor for me to take you out on a date, and see you enjoy with me. I secretly cry internally, for I remember just how lucky I am to have you in my life!🥺",
                path: process.env.PUBLIC_URL + "/Pics/9.png",
            },
            {
                title: "Most well dressed couple of the evening",
                description: "She's everything! He's just Ken. I absolutely adore this picture, because it shows me how well we fit together. We were meant to find each other, in this lifetime and in every other one after it!😍😍",
                path: process.env.PUBLIC_URL + "/Pics/10.png",
            },
            {
                title: "Pouty little demon👹",
                description: "When my Nib Nib pouts, I can never resist her adorable and sassy little face, and she always ends up getting what she wants. She is the cutest little demon out there, and I love her very, very much😍💜🥰",
                path: process.env.PUBLIC_URL + "/Pics/11.png",
            },
            {
                title: "Speepy Bub Bub",
                description: "Here, Bub Bub can be found in his natural sleeping position: cuddling Winnie The Pooh! He is sleeping in peace, dreaming about waking up and seeing his Nib Nib😍",
                path: process.env.PUBLIC_URL + "/Pics/12.JPG",
            },
            {
                title: "Hand in hand",
                description: "This picture is a vow, that no matter what the situaiton, we will always walk out, with your hand in mine. Hold my hand, and never let go💜💜 Also, ignore the bowl of yummy ramen🤣",
                path: process.env.PUBLIC_URL + "/Pics/13.JPG",
            },
            {
                title: "An honor to be in the presence of such beauty",
                description: "You looked so damn pretty on Diwali, I was completely in awe. It's like the color black was made for you. You looked stunning, and to be with you in this picture, it's an honor, meri jaan. I am so in love with you.🥰😍",
                path: process.env.PUBLIC_URL + "/Pics/14.JPG",
            },
            {
                title: "KOALA🐨",
                description: "I love that feeling in the morning when we wake up next to each other, and I can feel you. Your skin. I absolutely love the feeling when I cuddle you and hold you, and when we do Koala🥰. I love your shoulders, your back. Your skin. I love everything about you.😍",
                path: process.env.PUBLIC_URL + "/Pics/15.JPG",
            },
            {
                title: "The Nib Nib and Bub Bub Show",
                description: "I told you just how much I love this photo. It is so cute and silly, and we actually look like the cover of a sitcom. I have this picture saved in my favorites and this is the one I am going to frame in my office, because baby, I think this is the picture that defines us just perfectly, and captures the essence of our relationship: cute, and siwwy💜😍",
                path: process.env.PUBLIC_URL + "/Pics/16.JPG",
            },
            {
                title: "Wholesome and 👀👀🥵🥵",
                description: "This picture was taken the day after we 👀🥵. It is a treasured memory for me, because it showed that being intimate does not need to just stay in the physical sphere, and that emotions are a big part of it too. The room was filled with love before, during, and after it, and I will never forget how special it felt baby. I love you💜🥰",
                path: process.env.PUBLIC_URL + "/Pics/17.png",
            },
            {
                title: "'New Years' Kiss",
                description: "Since we haven't actually gotten to celebrate New Year's together, I have always regarded this as our new Year's kiss. This picture is special to me. It's important. It reminds me of your love, when I am at my lowest. Some day, when we can celebrate New Year's together, I want to recreate this one with you. That, will be the proof, that love overlooked all difficulties and differences. That will be proof, that we made it.💜💜",
                path: process.env.PUBLIC_URL + "/Pics/18.JPG",
            },
            {
                title: "Unparalleled Beauty",
                description: "I made a special request to recreate that one picture of you that I love so damn much, and when I saw the result, I immediately set it as my wallpaper because I was absolutely in awe of how beautiful you are. I know you said you did not like this one that much baby, I am mesmerized by your beauty in this photo. I love you so much, and I will never stop obsessing over you.💜😍🥰",
                path: process.env.PUBLIC_URL + "/Pics/19.JPG",
            },
            {
                title: "🐻🐭=💜🤍",
                description: "It is not even up for debate that Bub Bub 🐻 and Nib Nib 🐭 are the cutest couple in the world, and that they are truly made for each other. The love they share is permanent, and forever. It will span the entirety of this lifetime, and every other lifetime after this one. They will always find each other. Bub Bub loves Nib Nib very much!💜🤍",
                path: process.env.PUBLIC_URL + "/Pics/20.png",
            },
        ];

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
            fontSize: isPhoneScreen ? "1rem" : "1rem"
        };

        const popupStyle = {
            display: this.state.selectedPic ? "block" : "none",
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
            height: "60%",
        };

        const finalPopupStyle = isPhoneScreen ? phonePopupStyle : popupContentStyle;

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
            background: 'linear-gradient(to right, #e5e5db, #d2b48c)',
            padding: '20px',
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
            <div id={"memories"} style={componentContainerStyle} className={this.state.isVisible ? 'fade-in' : 'hidden'}>
                <h2 style={headingStyle}>Memories</h2>
                <h2 style={headingStyle2}>We have made a lot of memories together. Here are some of the sweetest ones! &#128525;</h2>
                <div style={lineContainerStyle}>
                    <div style={lineStyle}></div>
                    <span style={heartStyle}>
                        <FontAwesomeIcon icon={faHeart} />
                    </span>
                    <div style={lineStyle}></div>
                </div>
                <div style={picsContainerStyle}>
                    {pics.map((pic, index) => (
                        <div
                            key={index}
                            style={thumbnailContainerStyle}
                            onClick={() => this.openPopup(pic)}
                        >
                            <img
                                src={pic.path}
                                alt={pic.title}
                                style={thumbnailImageStyle}
                            />
                            <b style={thumbnailTextStyle}>{pic.title}</b>
                        </div>
                    ))}
                </div>
                {this.state.selectedPic && (
                    <div style={popupStyle} onClick={this.closePopup} ref={this.overlayRef}>
                        <div style={finalPopupStyle}>
                            <span
                                style={closePopupStyle}
                                onClick={this.closePopup}
                            >
                                &times;
                            </span>
                            <img
                                src={this.state.selectedPic.path}
                                alt={this.state.selectedPic.title}
                                style={responsiveImageStyle}
                            />
                            <h2>{this.state.selectedPic.title}</h2>
                            <p>{this.state.selectedPic.description}</p>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Pics;
