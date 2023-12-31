import React from 'react';

class OurStory extends React.Component {
    constructor() {
        super();
        this.state = {
            matches: window.matchMedia("(min-width: 680px)").matches,
            isVisible: false,
            monthsInWords: this.calculateMonthsInWords()
        }
    }

    componentDidMount() {
        const handler = e => this.setState({ matches: e.matches });
        window.matchMedia("(min-width: 680px)").addEventListener('change', handler);
        setTimeout(() => {
            this.setState({ isVisible: true });
        }, 1000);
    }

    calculateMonthsInWords() {
        const start_date = new Date(2022, 10, 29); // Month is 0-indexed in JavaScript Date
        const current_date = new Date();
        const difference_in_months = (current_date.getFullYear() - start_date.getFullYear()) * 12 + current_date.getMonth() - start_date.getMonth();

        return this.numberToWords(difference_in_months);
    }

    numberToWords(num) {
        const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
        const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

        if (num < 10) return ones[num];
        if (num < 20) return teens[num - 10];
        if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + ones[num % 10] : '');

        if (num < 1000) {
            return ones[Math.floor(num / 100)] + ' hundred' + (num % 100 !== 0 ? ' ' + this.numberToWords(num % 100) : '');
        }

        return num.toString();
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
            width: this.state.matches ? '30%' : '80%',
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
                    <p style={{fontSize: "15px"}}>
                        This was an accident.
                        Our story begins when he asked me to dance on October 25, 2022. Growing up surrounded by dance, I dreamed of dancing in college, and he made my dream come true. I said yes in a heartbeat and we met for the first time on October 29, 2022. We sat in THDA 204, looking at each other in silence. He was behind his computer tinkering with the music while I was tying my sunshine yellow lehenga. He looked up from his computer puzzled and I just played my music and began working out a choreography.
                    </p>
                    <p style={{fontSize: "15px"}}>
                        We met for the second time on October 31, 2022. I showed him my phone and asked him “hey you going to this party?” He laughed and said “I live there.” I didn’t think he was a party guy, but he quickly dismissed my thoughts, “my housemates throw the parties. I guard the upstairs.” He didn’t even look at me the rest of rehearsal.
                    </p>
                    <p style={{fontSize: "15px"}}>
                        The week before Diwali, I found out my grandfather was in end of life care, but as my life fell apart, he brought me laughter and sunshine. I felt light around him, I could laugh and enjoyed being with him. The night of Diwali, I was pulled in a tug of war between running home and finishing our performance. I called him up; fear, anxiety, and grief clinging to my voice. He met me in JWALL for our performance and without a thought I ran to him, throwing my arms around him. His hug felt like home.
                    </p>
                    <p style={{fontSize: "15px"}}>
                        The next morning, as my grandfather took his last breath, I texted him and he immediately sent me a prayer. We were from two different religions, but the prayer healed a crack in my heart. The next five days were spent texting back and forth every day. I briefly mentioned my love for hot cheetos, but my hatred for powdered fingers. When I stood in my dorm room, I got a text “I’m downstairs” I ran to the elevator, counting the seconds to see him. He stood in the main lounge, a bag in his hand. Inside was two chocolate bars, a bag of hot cheetos and a pair of chopsticks. My heart felt so full, it was on the verge of bursting. He sat with me for the next half an hour as I told him everything that happened.
                    </p>
                    <p style={{fontSize: "15px"}}>
                        After I shared my grief, he offered to take me to the art museum to cheer me up. It was not the time to tell him I get bored of art museums. I was excited to spend the day with him. The art museum was the first day I looked at him with adoration in my eyes. He felt right, like a perfect fit. As we sat across from each other at lunch, it felt as though we had done this millions of times before. Talking about the mundane things in our lives or playfully poking each other. He told me about his family, and I shared about mine. He told me his birthday was the next day and I immediately began planning.
                    </p>
                    <p style={{fontSize: "15px"}}>
                        My first formal dance of college, I was side by side with a friend I could share my heart with. We had already decided to spend the evening together and finish the night by celebrating his birthday. After the dance, as we cut his cake and watched a movie, I could only think of him.
                    </p>
                    <p style={{fontSize: "15px"}}>
                        Six days later, he asked me to be his. There was no doubt in my mind that I was going to say yes. I wanted to scream it from the rooftops, but my heart had just lost my grandfather and was afraid of adding someone new. I asked him for a couple of days but told him the very next day. I wanted to be by his side forever.
                    </p>
                    <p style={{fontSize: "15px"}}>
                        It has been {this.state.monthsInWords} months since I said yes. Our story is not perfect, there have been mistakes, and pain, but there has always been love. Love trumps all, and that is the only definition of our story. I accidentally stumbled upon the MASECA booth and coincidentally met him. He reached out and started our story. Our story began with a simple DM and goes on forever.
                    </p>
                    <p style={{fontSize: "15px"}}>
                        I am so grateful to be part of your story.
                    </p>
                </div>
                {!this.state.matches && (
                    <img src={process.env.PUBLIC_URL + "/StoryPic.png"} alt="Our Story" style={imageStyle} />
                )}
            </div>
            </div>
        );
    }
}

export default OurStory;
