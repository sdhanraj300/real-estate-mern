import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="shadow-md bg-blue-100">
      <div className="flex justify-between p-3 items-center max-w-6xl mx-auto font-bold">
        <Link to="/">
          <h1 className="text-sm font-bold sm:text-2xl flex flex-wrap">
            <span className="text-slate-500">Realest</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form
          action=""
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <button className="bg-slate-200 p-3 rounded-lg">
            <FaSearch />
          </button>
        </form>
        <ul className="flex justify-between gap-4 text-xl">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                className="h-8 w-8 rounded-full object-cover"
                alt="profile-img"
              ></img>
            ) : (
              <li className="hidden sm:inline text-slate-700 hover:underline">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
