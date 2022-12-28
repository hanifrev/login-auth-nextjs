import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const crud = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    const getData = async () => {
      const token = `Bearer ${Cookies.get("access_token")}`;
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/auth/products`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const theData = await data;
      setData(theData);
    };

    getData();
  }, []);

  console.log(data);

  return (
    <div>
      <Navbar />
      <div></div>
    </div>
  );
};

export default crud;
