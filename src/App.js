import logo from './logo.svg';
import './App.css';
import Heading from "./Components/Heading/Heading";
import OurStory from "./Components/Story/OurStory";
import Letters from "./Components/PDFSection/Letters";

function App() {
  return (
      <>
        <Heading/>
        <OurStory/>
          <Letters/>
      </>
  );
}

export default App;
