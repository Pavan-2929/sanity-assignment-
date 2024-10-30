import React, { useEffect, useState } from "react";
import { client } from "../sanity";
import LayOut from "../components/LayOut";
import imageUrlBuilder from "@sanity/image-url";
import { MdAccessTime } from "react-icons/md";
import Title from "../components/Title";
import { FaLocationDot } from "react-icons/fa6";

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

  console.log(eventsData);

  return (
    <div className="min-h-screen max-w-[100vw] bg-[#EED9BB] py-12" id="events">
      <LayOut>
        <div>
          <Title text={eventsData?.header} />
        </div>

        {eventsData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {eventsData.cards.slice(0, 3).map((card, index) => (
              <div
                key={index}
                className="bg-cream rounded-lg shadow-md pb-6 flex flex-col"
              >
                {card.image && (
                  <img
                    src={urlFor(card.image).url()}
                    alt={card.image.alt}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <div className="px-6">
                  <h2 className="text-2xl font-medium scale-y-110 mb-2">
                    {card.header}
                  </h2>

                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {card.content}
                  </p>

                  <div className="flex justify-between items-center mt-6">
                    <p className="text-2xl scale-y-125 pb-1">{card.date}</p>
                    <div className="flex flex-col text-lg space-y-2">
                      <div className="flex gap-x-2 items-center">
                        <span>
                          <FaLocationDot />
                        </span>
                        <span>{card.location}</span>
                      </div>

                      <div className="flex gap-x-2 items-center">
                        <span>
                          <MdAccessTime />
                        </span>
                        <span>{card.timeSlot}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full mt-4">
                    {card.buttonText && (
                      <button className="w-full mt-auto px-4 py-2 border border-[#3B2216] text-[#3B2216 rounded-md hover:bg-[#c78c73] transition duration-300">
                        {card.buttonText}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </LayOut>
    </div>
  );
};

export default Events;
