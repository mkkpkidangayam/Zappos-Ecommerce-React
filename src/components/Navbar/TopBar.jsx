import React, { useEffect, useState } from "react";
import { Axios } from "../../MainPage";

const TopBar = () => {
  const [topBarContents, setTopBarContents] = useState([]);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);

  useEffect(() => {
    Axios.get("/admin/get-contents")
      .then((response) => {
        setTopBarContents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching top bar content:", error);
      });
  }, []);

  useEffect(() => {
    if (topBarContents.length > 0) {
      const interval = setInterval(() => {
        setCurrentContentIndex((prevIndex) =>
          prevIndex === topBarContents.length - 1 ? 0 : prevIndex + 1
        );
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [topBarContents]);

  return (
    <div className="relative z-10 bg-[#e7f4ff]">
      <div className="flex justify-center">
        <div className="max-w-full">
          <div className="text-center text-black py-2 px-4 ">
            <marquee
              className="font-sans font-medium"
              behavior="scroll"
              direction="left"
            >
              {topBarContents.length > 0
                ? topBarContents[currentContentIndex].text
                : "Loading..."}
            </marquee>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
