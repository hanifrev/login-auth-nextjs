import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
        username: email,
        password: password,
      })
      .then((res) => {
        // console.log(res);
        Cookies.set("access_token", res.data.token);
        router.push("/crud");
      })
      .catch((error) => {
        console.error("error >>>", error);
      });
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${inter.className} h-screen bg-sky-500 login-box flex flex-col justify-center`}
      >
        <div className="card">
          <div className="text-center pt-8 pb-10 text-white text-2xl font-semibold">
            LOGIN
          </div>
          <div className="loginForm">
            <form className="flex flex-col the-form gap-2">
              <input
                className="userName"
                type="email"
                name="email"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="pass"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className={`h-[42px] mt-6 ${
                  !email || !password ? "bg-[#B9B9B9]" : "bg-[#34174a]"
                } text-white`}
                disabled={!email || !password}
                onClick={handleLogin}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}