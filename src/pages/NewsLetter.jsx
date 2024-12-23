import React, { useEffect, useState } from "react";
import { client } from "../sanity";
import LayOut from "../components/LayOut";
import imageUrlBuilder from "@sanity/image-url";
import LargeContainer from "../components/LargeContainer";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const NewsLetter = () => {
  const [newsLetterData, setNewsLetterData] = useState(null);

  const fetchData = async () => {
    const query = `*[_type == "newsLetter"]`;
    const data = await client.fetch(query);
    setNewsLetterData(data[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!newsLetterData) {
    return (
        <div className="flex items-center justify-center h-16 w-full bg-cream">
        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-darkBrown"></div>
      </div>
    );
  }
  return (
    <LargeContainer>
      <LayOut>
        {newsLetterData && (
          <div
            id="newsLetter"
            className="relative w-full h-[70vh] md:h-[80vh] bg-cover bg-center"
            style={{
              backgroundImage: `url(${urlFor(newsLetterData.image).url()})`,
            }}
          >
            <div className="w-full bg-black bg-opacity-50 h-full flex flex-col justify-center text-cream absolute top-0 text-center px-4 md:px-8">
              <div className="space-y-4 md:space-y-6">
                <p className="text-3xl md:text-5xl scale-y-125 font-georgia tracking-wider">
                  {newsLetterData?.header}
                </p>
                <p className="text-3xl md:text-5xl scale-y-110 font-georgia tracking-wider">
                  {newsLetterData?.subHeader}
                </p>
              </div>
              <div className="max-w-md lg:max-w-xl mt-12 mb-8 mx-auto text-base md:text-lg lg:text-xl">
                <p>{newsLetterData?.Content}</p>
              </div>
              <div className="flex flex-col md:flex-row justify-center">
                <input
                  type="text"
                  className="bg-[#EED9BB] px-4 py-2 rounded-t-xl md:rounded-l-xl md:rounded-tr-none md:w-[280px] lg:w-[400px] text-black placeholder:text-black mb-4 md:mb-0"
                  placeholder="Email..."
                />
                <button className="bg-darkBrown text-cream rounded-b-xl md:rounded-r-xl md:rounded-bl-none px-20 py-3 text-sm font-semibold">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        )}
      </LayOut>
    </LargeContainer>
  );
};

export default NewsLetter;
