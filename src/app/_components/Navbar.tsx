import Link from "next/link";
import React, { useState } from "react";
import { Menu, Close } from "@mui/icons-material";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  const links = [
    {
      id: 1,
      link: "/",
      text: "home",
    },
    {
      id: 2,
      link: "/events",
      text: "events",
    },
    {
      id: 3,
      link: "/dashboard",
      text: "dashboard",
    },
  ];

  return (
    <div className="nav relative flex h-20 w-full items-center justify-between bg-green-600 px-4 text-white">
      <h1 className="font-signature ml-2 text-2xl font-bold">
        <a className="link-underline link-underline-black" href="/">
          GreenHarmony
        </a>
      </h1>

      <ul className="hidden md:flex">
        {links.map(({ id, link, text }) => (
          <li
            key={id}
            className="nav-links link-underline cursor-pointer px-4 font-medium capitalize text-gray-200 duration-200 hover:scale-105 hover:text-white"
          >
            <Link href={link}>{text ?? link}</Link>
          </li>
        ))}
        <li className="nav-links link-underline cursor-pointer px-4 font-medium capitalize text-gray-200 duration-200 hover:scale-105 hover:text-white">
          <Link href={isLoggedIn ? "/api/auth/signout" : "/login"}>
            {isLoggedIn ? "Log Out" : "Log In"}
          </Link>
        </li>
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="z-10 cursor-pointer pr-4 text-white md:hidden"
      >
        {nav ? <Close /> : <Menu />}
      </div>

      {nav && (
        <ul className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-start bg-green-600 text-gray-200">
          {links.map(({ id, link, text }) => (
            <li
              key={id}
              className="z-10 cursor-pointer px-4 py-6 text-2xl capitalize"
            >
              <Link onClick={() => setNav(!nav)} href={link}>
                {text ?? link}
              </Link>
            </li>
          ))}
          <li className="cursor-pointer px-4 py-6 text-2xl capitalize">
            <Link href={isLoggedIn ? "/api/auth/signout" : "/login"}>
              {isLoggedIn ? "Log Out" : "Log In"}
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
