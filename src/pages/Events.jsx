import React, { useEffect, useState } from "react";
import { client } from "../sanity";
import LayOut from "../components/LayOut";
import imageUrlBuilder from "@sanity/image-url";
import { MdAccessTime } from "react-icons/md";
import Title from "../components/Title";
import { FaLocationDot, FaArrowRight } from "react-icons/fa6";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const Events = () => {
  const [eventsData, setEventsData] = useState(null);

  const fetchData = async () => {
    const query = `*[_type == "events"]`;
    const data = await client.fetch(query);
    setEventsData(data[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!eventsData) {
    return (
      <div className="flex items-center justify-center h-16 w-full bg-cream">
        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-darkBrown"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen max-w-[100vw] bg-[#EED9BB] py-12 " id="events">
      <LayOut>
        <div>
          <Title text={eventsData?.header} />
        </div>

        {eventsData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 font-poppins">
            {eventsData.cards.slice(0, 3).map((card, index) => (
              <div
                key={index}
                className="bg-cream rounded-lg shadow-md pb-6 flex flex-col"
              >
                {card.image && (
                  <img
                    src={urlFor(card.image).url()}
                    alt={card.image.alt}
                    className="w-full h-48 object-cover rounded-md mb-6"
                  />
                )}
                <div className="px-6 text-darkBrown">
                  <h2 className="text-xl line-clamp-1 font-medium scale-y-110 mb-2 ">
                    {card.header}
                  </h2>

                  <p className="font-extralight  opacity-80 mb-4 line-clamp-3 text-sm">
                    {card.content}
                  </p>

                  <div className="flex justify-between items-center mt-10">
                    <div className="flex items-center space-x-2">
                      <p className="text-5xl scale-y-150 pb-1">{card.day}</p>
                      <div className="scale-y-150 text-xs tracking-wide font-extralight opacity-80 leading-4 text-center">
                        {card.month.match(/.{1,3}/g).map((part, index) => (
                          <p key={index}>{part}</p>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 ">
                      <div className="flex gap-x-2 items-center">
                        <span>
                          <FaLocationDot />
                        </span>
                        <span className="opacity-80 text-sm">
                          {card.location}
                        </span>
                      </div>

                      <div className="flex gap-x-2 items-center">
                        <span>
                          <MdAccessTime />
                        </span>
                        <span className="opacity-80 text-sm">
                          {card.timeSlot}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full mt-8">
                    {card.buttonText && (
                      <button className="w-full mt-auto px-4 py-2 border border-darkBrown text-darkBrown rounded-md hover:bg-[#c78c73] transition duration-300">
                        {card.buttonText}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center border border-darkBrown rounded-2xl w-fit mx-auto px-4 py-[6px]  mt-12">
          <button className="flex gap-x-2 items-center uppercase text-xs opacity-80">
            {eventsData && eventsData.buttonText}
            <FaArrowRight className="opacity-60" />
          </button>
        </div>
      </LayOut>
    </div>
  );
};

export default Events;
