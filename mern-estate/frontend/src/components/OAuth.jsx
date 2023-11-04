import React from "react";
import { app } from "../firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await axios.post("/api/auth/google", {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });
      console.log(result);
      dispatch(signInSuccess(res.data));
      navigate("/");
    } catch (err) {
      console.log("Could not sign in with google", err);
    }
  };
  return (
    <div>
      <button
        onClick={handleGoogleClick}
        type="button"
        className="gradient-background mt-2 text-white w-[30rem] h-[3rem] p-1 font-bold rounded-md"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default OAuth;
