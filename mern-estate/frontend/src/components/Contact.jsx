import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React, { useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import emailjs from "@emailjs/browser";
export default function Contact({ listing }) {
  const ref = useRef();
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const onChange = (e) => {
    setMessage(e.target.value);
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_kwa00u9",
        "template_arxv8ii",
        ref.current,
        "Yu_vD7UVTICZDhxb8"
      )
      .then(
        (result) => {
          setMessage("");
          toast.success("Message sent successfully!");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await axios.get(`/api/users/${listing.userRef}`);
        const data = res.data;
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <div>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <form ref={ref}> 
            <textarea
              name="message"
              id="message"
              rows="2"
              value={message}
              onChange={onChange}
              placeholder="Enter your message here..."
              className="w-full border p-3 rounded-lg"
            ></textarea>

            <button
              type="submit"
              onClick={handleSubmitForm}
              className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
            >
              Send Message
            </button>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
