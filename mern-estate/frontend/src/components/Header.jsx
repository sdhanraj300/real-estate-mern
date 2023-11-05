import React, { useEffect, useState } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) setSearchTerm(searchTermFromUrl);
  }, [location.search]);

  return (
    <header className="shadow-md bg-blue-100 w-full">
      <div className="flex justify-between p-3 items-center max-w-6xl mx-auto font-bold">
        <Link to="/">
          <h1 className="text-sm font-bold sm:text-2xl flex flex-wrap">
            <span className="text-slate-500">Realest</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form
          action="POST"
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <button type="submit" className="bg-slate-200 p-3 rounded-lg">
            <FaSearch />
          </button>
        </form>
        <div className="flex items-center gap-4 text-xl">
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
              />
            ) : (
              <li className="hidden sm:inline text-slate-700 hover:underline">
                Sign In
              </li>
            )}
          </Link>
          <div className="sm:hidden">
            <FaBars
              className="text-2xl cursor-pointer"
              onClick={toggleMobileMenu}
            />
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <ul className="flex flex-col justify-center items-center text-2xl">
          <Link to="/">
            <li className="text-slate-700 hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="text-slate-700 hover:underline">About</li>
          </Link>
        </ul>
      )}
    </header>
  );
};

export default Header;
