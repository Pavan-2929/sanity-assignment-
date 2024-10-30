import React, { useEffect, useState } from "react";
import { client } from "../sanity";
import imageUrlBuilder from "@sanity/image-url";
import LayOut from "../components/LayOut";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  const fetchData = async () => {
    const query = `*[_type == "footer"]`;
    const data = await client.fetch(query);
    setFooterData(data[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollToSection = () => {
    const element = document.querySelector("#home");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!footerData) {
    return (
      <div className="flex items-center justify-center h-16 w-full bg-cream">
        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-darkBrown"></div>
      </div>
    );
  }
  return (
    <div className="bg-cream pb-12">
      <LayOut>
        {footerData && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
              <div
                onClick={scrollToSection}
                className="flex cursor-pointer flex-col md:flex-row items-center space-x-0 md:space-x-4 text-darkBrown"
              >
                {footerData.logoImage && (
                  <img
                    className="w-16 h-16 md:w-24 md:h-24"
                    src={urlFor(footerData?.logoImage).url()}
                    alt="Logo Image"
                  />
                )}
                <p className="text-3xl md:text-5xl font-medium scale-y-125">
                  {footerData?.logo}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 md:flex md:space-x-12 text-center md:text-left">
                {footerData.menuItems &&
                  footerData.menuItems.map((menuItem, index) => (
                    <div key={index}>
                      <h1 className="text-xl md:text-2xl text-darkBrown mb-2 md:mb-4">
                        {menuItem.title}
                      </h1>
                      <div className="text-darkBrown">
                        {menuItem.subMenu &&
                          menuItem.subMenu.map((menu, index) => (
                            <p key={index}>{menu?.text}</p>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="border-t-2 border-darkBrown w-full my-8" />

            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-center md:text-left">
                {footerData.socialMediaLinks &&
                  footerData.socialMediaLinks.map((link, index) => (
                    <p className="underline underline-offset-4" key={index}>
                      {link.label}
                    </p>
                  ))}
              </div>
              <div className="flex gap-6 text-center md:text-left">
                <p className="underline underline-offset-4">
                  {footerData?.terms}
                </p>
                <p className="underline underline-offset-4">
                  {footerData?.privacy}
                </p>
              </div>
            </div>
          </div>
        )}
      </LayOut>
    </div>
  );
};

export default Footer;
