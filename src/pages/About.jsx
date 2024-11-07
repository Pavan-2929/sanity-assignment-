import React, { useEffect, useState } from "react";
import LayOut from "../components/LayOut";
import LargeContainer from "../components/LargeContainer";
import { client } from "../sanity";
import imageUrlBuilder from "@sanity/image-url";
import Title from "../components/Title";

const builder = imageUrlBuilder(client);
const urlFor = (source) => (source ? builder.image(source).url() : "");

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  const fetchData = async () => {
    const query = `*[_type == "about"]`;
    const data = await client.fetch(query);
    setAboutData(data[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <LargeContainer>
      <LayOut>
        <div id="about">
          <Title text={aboutData?.header} />
          {aboutData ? (
            <div className="flex gap-x-12 text-darkBrown md:mt-2 mt-0 md:flex-row flex-col">
              <div className="max-w-lg space-y-12">
                {aboutData?.aboutUsLogo && (
                  <img
                    src={urlFor(aboutData?.aboutUsLogo)}
                    alt="Header Image"
                    className="md:w-[350px] w-[200px] h-auto mt-12 grayscale"
                  />
                )}
                <p className="text-2xl scale-y-110 tracking-widest leading-8 lg:pt-6 font-medium">
                  {aboutData.leftContent}
                </p>
              </div>
              <div className="flex flex-col justify-between pt-8">
                <div className="space-y-3">
                  <h1 className="text-3xl font-medium text-darkBrown scale-y-110">
                    {aboutData.subHeader}
                  </h1>
                  <p className="text-md tracking-wider">
                    {aboutData.subDescription}
                  </p>
                </div>
                <div className="flex justify-between gap-x-6 mt-12">
                  <img
                    src={urlFor(aboutData.about1)}
                    alt=""
                    className="w-[45%] md:h-[400px]"
                  />
                  <img
                    src={urlFor(aboutData.about2)}
                    alt=""
                    className="w-[45%] h-full"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-48">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-darkBrown"></div>
            </div>
          )}
        </div>
      </LayOut>
    </LargeContainer>
  );
};

export default About;
