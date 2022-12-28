import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CardProduct from "../components/CardProduct";
import Navbar from "../components/Navbar";

const crud = () => {
  const [data, setData] = useState("");

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const token = `Bearer ${Cookies.get("access_token")}`;
      const data = await axios
        .get(`${process.env.NEXT_PUBLIC_API}/auth/products`, {
          headers: {
            Authorization: token,
          },
        })
        .catch((error) => {
          if (error.response && error.response.status == 401) {
            console.log("Token expired");
            if (confirm("Token expired, please re-login")) {
              Cookies.remove("access_token");
              localStorage.removeItem("access_token");
              router.push("/");
            } else {
              console.log(cancel);
            }
          }
        });

      const theData = await data.data;
      const product = theData.products;
      setData(product);
    };

    getData();
  }, []);

  console.log(data);

  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap justify-center gap-3 pt-3">
        {data &&
          data.map((x) => {
            return (
              <CardProduct key={x.id} title={x.title} image={x.thumbnail} />
            );
          })}
      </div>
    </div>
  );
};

export default crud;
