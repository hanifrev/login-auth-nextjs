import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  const handleSignout = () => {
    Cookies.remove("access_token");
    router.push("/");
  };

  return (
    <div className="px-3 bg-sky-700">
      <div id="navbar">
        <div className="text-white font-bold">Products</div>
        <div>
          <button
            className="text-white hover:text-red-500 font-bold w-24"
            onClick={handleSignout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
