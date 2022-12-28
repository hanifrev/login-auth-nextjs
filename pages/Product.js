import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CardProduct from "../components/CardProduct";
import Navbar from "../components/Navbar";
import ReactPaginate from "react-paginate";

const Product = () => {
  const [data, setData] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const router = useRouter();
  const PER_PAGE = 15;

  useEffect(() => {
    const getData = async () => {
      const token = `Bearer ${Cookies.get("access_token")}`;
      const data = await axios
        .get(`${process.env.NEXT_PUBLIC_API}/auth/products?limit=100`, {
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

  const handlePageClick = ({ selected: selectedPage }) => {
    console.log("selectedPage", selectedPage);
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * PER_PAGE;

  const pageCount = Math.ceil(data.length / PER_PAGE);

  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap justify-center gap-3 pt-3 max-w-[1366px] mx-auto">
        {data &&
          data.slice(offset, offset + PER_PAGE).map((x) => {
            return (
              <CardProduct key={x.id} title={x.title} image={x.thumbnail} />
            );
          })}
      </div>
      <ReactPaginate
        previousLabel={" "}
        nextLabel={" "}
        previousClassName={"prev"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Product;
