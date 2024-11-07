import React, { useEffect, useState } from "react";
import LargeContainer from "../components/LargeContainer";
import LayOut from "../components/LayOut";
import { client } from "../sanity";
import imageUrlBuilder from "@sanity/image-url";
import Title from "../components/Title";
import { FaArrowRight } from "react-icons/fa6";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const Gallery = () => {
  const [galleryData, setGalleryData] = useState(null);

  const fetchData = async () => {
    const query = `*[_type == "gallery"]`;
    const data = await client.fetch(query);
    setGalleryData(data[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!galleryData) {
    return (
      <div className="flex items-center justify-center h-16 w-full bg-cream">
        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-darkBrown"></div>
      </div>
    );
  }
  return (
    <LargeContainer>
      <LayOut>
        <div className="mb-8" id="gallery">
          <Title text={galleryData?.header} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {galleryData &&
            galleryData.images.map((image, index) => (
              <div
                key={index}
                className={`p-2 ${
                  index === 1 || index === 5 ? "col-span-2" : "col-span-1"
                }`}
              >
                <img
                  src={urlFor(image).url()}
                  alt={image.alt || "Gallery image"}
                  className="w-full h-64 object-cover rounded-md shadow-lg"
                />
              </div>
            ))}
        </div>
        <div className="flex justify-center border border-darkBrown rounded-2xl w-fit mx-auto px-4 py-[6px]  mt-12">
          <button className="flex gap-x-2 items-center uppercase text-xs opacity-80">
            {galleryData && galleryData.buttonText}
            <FaArrowRight className="opacity-60" />
          </button>
        </div>
      </LayOut>
    </LargeContainer>
  );
};

export default Gallery;
