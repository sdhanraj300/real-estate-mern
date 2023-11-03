import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", formState);
      console.log(res);
      setLoading(false);
      toast("User Signed Up!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // const res = await fetch("/api/users/signup", {
      //   method: "POST",
      //   body: JSON.stringify(formState),
      //   headers: { "Content-Type": "application/json" },
      // });
      // const data = await res.json();
      // console.log(data);
    } catch (err) {
      setLoading(false);
      console.log(err);
      setError(err.response.data.message);
    }
  };
  return (
    <div className="items-center justify-center">
      <div className="flex items-center flex-col mt-20">
        <h1 className="text-4xl text-slate-600 font-bold">Sign Up</h1>
        <form action="POST" className="flex flex-col items-center mt-10 gap-2">
          <input
            onChange={handleInputChange}
            value={formState.username}
            className="border-2 border-slate-400 rounded-md h-[3rem] w-[30rem] shadow-md p-5"
            type="text"
            name="username"
            id=""
            placeholder="Username"
          />
          <input
            onChange={handleInputChange}
            value={formState.email}
            className="border-2 border-slate-400 rounded-md h-[3rem] w-[30rem] shadow-md p-5"
            type="email"
            name="email"
            id=""
            placeholder="Email"
          />
          <input
            onChange={handleInputChange}
            value={formState.password}
            className="border-2 border-slate-400 rounded-md h-[3rem] w-[30rem] shadow-md p-5"
            type="password"
            name="password"
            id=""
            placeholder="Password"
          />
          <button
            onClick={handleFormSubmit}
            type="submit"
            className="bg-blue-900 text-white w-[30rem] h-[3rem] p-1 font-bold rounded-md"
          >
            Sign Up
          </button>
        </form>
        <button
          type="button"
          className="gradient-background mt-2 text-white w-[30rem] h-[3rem] p-1 font-bold rounded-md"
        >
          Continue with Google
        </button>
        {loading && <InfinitySpin width="200" color="#4fa94d" />}
        <span className="mt-3 flex text-lg">
          <p className="font-bold">Have an Account?</p>
          <Link to="/signin" className="text-blue-400 ml-1 hover:underline">
            Sign In
          </Link>
        </span>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
