import React, { useEffect, useState } from "react";
import LargeContainer from "../components/LargeContainer";
import LayOut from "../components/LayOut";
import { client } from "../sanity";
import imageUrlBuilder from "@sanity/image-url";
import Title from "../components/Title";

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

  console.log(galleryData);

  return (
    <LargeContainer>
      <LayOut>
        <div className="mb-8" id="gallery">
          <Title text={galleryData?.header} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {galleryData &&
            galleryData.images.map((image, index) => (
              <div key={index} className="p-2">
                <img
                  src={urlFor(image).url()}
                  alt={image.alt || "Gallery image"}
                  className="w-full h-64 object-cover rounded-md shadow-lg" // Fixed height of 64 units
                />
              </div>
            ))}
        </div>
      </LayOut>
    </LargeContainer>
  );
};

export default Gallery;
