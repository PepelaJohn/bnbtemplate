import React from "react";
import Container from "./Container";
import Link from "next/link";
import UnderlineComponent from "./UnderlineComponent";

const navlinks = [
    "Book",
    "Locations",
    "Clients",
    "Check in",
    "Contact"
]

const Navbar = () => {
  return (
    <div className="bog bg-white text-black h-[100px] !text-2xl max-lg:text-lg w-full  flex justify-between items-center">
     <Container>
     <div className="flex justify-between items-center w-full ">
        <div className="flex items-center">
          
            <Link href='/' className=" overflow-hidden font-light">
              <img src="/logo.png" alt="Logo" className="h-[70px] " />
            </Link>
          
        </div>

        <nav className="flex-grow flex justify-center gap-8 text-black">
            {
                navlinks.map((link)=>{
                    return <UnderlineComponent className="uppercase" key={link} link={link} href={`/${link.split(" ").join("-").toLowerCase()}`}></UnderlineComponent>
                })
            }

        </nav>

        <div className="flex items-center space-x-3">
          <div className=" rounded-full p-1 #541414">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#000"
              className="w-8 h-8 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </div>
      </div>
     </Container>
    </div>
  );
};

export default Navbar;
