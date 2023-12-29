import logo from './logo.svg';
import './App.css';
import Heading from "./Components/Heading/Heading";
import OurStory from "./Components/Story/OurStory";
import Letters from "./Components/PDFSection/Letters";
import Footer from "./Components/Footer";
import Pics from "./Components/Pictures/Pics";

function App() {
  return (
      <>
        <Heading/>
        <OurStory/>
          <Pics/>
          <Letters/>
          <Footer/>
      </>
  );
}

export default App;
