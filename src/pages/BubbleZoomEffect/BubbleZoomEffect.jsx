import React, { useEffect, useState } from "react";
import { CardWrapper } from "../../components";

const BubbleZoomEffect = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://randomuser.me/api/?results=10&inc=name,gender,email,picture"
      );
      const json = await response.json();
      setData(json?.results || []);
    } catch (e) {
      console.log("error fetching data: ", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <CardWrapper
      title="Bubble Zoom Effect"
      className="w-full flex flex-col pb-4 gap-4 relative"
    >
      <div className="avatars ">
        {data.map((item) => (
          <img
            src={item.picture?.large}
            alt={item.name?.first}
            className="avatar"
          />
        ))}
      </div>
    </CardWrapper>
  );
};

export default BubbleZoomEffect;
