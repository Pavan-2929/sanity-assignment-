import React, { useEffect, useState } from "react";
import { client } from "../sanity";
import imageUrlBuilder from "@sanity/image-url";
import Slider from "react-slick";
import Navbar from "../components/Navbar";
import LayOut from "../components/LayOut";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const Home = () => {
  const [homeData, setHomeData] = useState(null);

  const fetchData = async () => {
    const query = `*[_type == "home"]`;
    const data = await client.fetch(query);
    setHomeData(data[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "25px",
          width: "100%",
          zIndex: 20,
        }}
      >
        <ul className="flex justify-center">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        className="dot"
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "white",
          margin: "0 5px",
        }}
      />
    ),
  };
  return (
    <div id="home" className="relative w-full h-screen overflow-hidden">
      {homeData ? (
        <Slider {...settings}>
          {homeData.background?.map((item, index) => {
            const imageUrl = urlFor(item.image).url();
            return (
              <div
                key={index}
                className="w-full h-screen  md:h-[100vh] lg:h-screen"
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                  }}
                />
              </div>
            );
          })}
        </Slider>
      ) : (
        <p>Loading...</p>
      )}

      <div className="hidden absolute top-12 md:flex flex-col items-center z-40 ">
        <Navbar />
      </div>
      <div className="absolute inset-0 flex flex-col items-center text-[#F3E7D5] text-center md:text-start z-10 ">
        <div className="absolute md:hidden inline top-24 text-7xl">
          ISS Club
        </div>
        <div className="absolute bottom-24 flex md:flex-row flex-col space-y-8 justify-between items-end max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="md:max-w-[90%] space-y-8">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-medium scale-y-125">
              {homeData?.headerText}
            </h1>
            <p className="text-base md:text-lg mt-2 max-w-[80%] mx-auto md:mx-0 md:max-w-[60%]">
              {homeData?.description}
            </p>
          </div>
          <div className="mx-auto md:mx-0 pb-2">
            {homeData?.buttonText && (
              <button className="mt-4 md:mt-0 px-8 sm:px-10 md:px-12 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded">
                {homeData.buttonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
