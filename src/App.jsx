import React from "react";
import Home from "./pages/Home";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import About from "./pages/About";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import NewsLetter from "./pages/NewsLetter";
import Footer from "./components/Footer";
import "@fontsource/poppins";

const App = () => {
  return (
    <div className="font-georgia">
      <Home />
      <About />
      <Events />
      <Gallery />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default App;
