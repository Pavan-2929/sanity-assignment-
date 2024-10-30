import { useState, useEffect } from "react";
import { client } from "../sanity";
import imageUrlBuilder from "@sanity/image-url";
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

function Navbar() {
  const [navbarData, setNavbarData] = useState(null);

  const fetchData = async () => {
    const query = `*[_type == "navbar"]`;
    const data = await client.fetch(query);
    setNavbarData(data[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <div className="w-[100vw] text-darkBrown z-40 ">
      <div className=" max-w-7xl  mx-auto flex justify-between py-4 bg-cream lg:px-12 px-6 rounded-md">
        <div className="flex gap-x-2 items-center">
          {navbarData?.logoImage && (
            <img
              src={urlFor(navbarData?.logoImage).url()}
              alt="Image Logo"
              className="h-10 w-10"
            />
          )}
          <h1 className="text-3xl font-medium ">
            {navbarData?.title || "Loading Navbar..."}
          </h1>
        </div>
        <ul className="flex items-center space-x-6 font-medium uppercase tracking-wide ">
          {navbarData?.links?.map((link, index) => (
            <li
              key={index}
              onClick={() => scrollToSection(`#${link.url}`)}
              className="cursor-pointer hover:text-red-800"
            >
              {link.label}
            </li>
          ))}
        </ul>
        <ul className="flex items-center space-x-4">
          {navbarData?.endLinks?.map((endLink, index) => (
            <li key={index}>
              <a className="cursor-not-allowed" href={endLink.url}>{endLink.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
