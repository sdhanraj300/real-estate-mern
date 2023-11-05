import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../redux/userSlice";
import { app } from "../firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InfinitySpin } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const Profile = () => {
  const dispatch = useDispatch();
  const [file, setFile] = React.useState(undefined);
  const [filePerc, setFilePerc] = React.useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const handleDeleteListing = async (id) => {
    try {
      const res = await axios.delete(`/api/listings/delete/${id}`);
      const data = await res.data;
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      setUserListings(userListings.filter((listing) => listing._id !== id));
      if(userListings.length === 0){
        toast.success("No more listings to show");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleShowListings = async () => {
    try {
      const res = await fetch(`/api/users/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        return;
      }

      setUserListings(data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await axios.get("/api/auth/signout");
      const data = res.data;
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(signOutSuccess());
      toast.success(data.message);
      window.location.href = "/";
    } catch (error) {
      toast.error(error.message);
      dispatch(signOutFailure(error.message));
    }
  };
  const deleteUserHandler = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await axios.delete(`/api/users/delete/${_id}`);
      const data = await res.data;
      if (data.success === false) {
        toast.error(data.message);
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess());
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create a new form state with the existing values
    const updatedFormState = {
      email: formState.email,
      username: formState.username,
      avatar: formState.avatar,
    };

    // Include the password field only if it's not empty
    if (formState.password.trim() !== "") {
      updatedFormState.password = formState.password;
    }

    console.log(updatedFormState);

    try {
      dispatch(updateUserStart());
      const res = await axios.post(
        `/api/users/update/${_id}`,
        updatedFormState
      );
      const data = await res.data;
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      notify();
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      toast.error("Error updating profile");
      console.log(error);
    }
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const fileRef = useRef(null);
  const notify = () => toast.success("Profile Updated Successfully");
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormState({ ...formState, avatar: downloadURL })
        );
      }
    );
  };

  const { currentUser, loading, error } = useSelector((state) => state.user);
  const { _id } = currentUser;
  const [formState, setFormState] = React.useState({
    email: currentUser.email,
    username: currentUser.username,
    password: "",
    avatar: currentUser.avatar,
  });
  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  return (
    <div className="items-center justify-center">
      <div className="flex items-center flex-col mt-20">
        <h1 className="text-4xl text-slate-600 font-bold">Profile</h1>
        <form action="POST" className="flex flex-col items-center mt-10 gap-2">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            className="h-40 w-40 rounded-full object-cover shadow-md"
            onClick={() => fileRef.current.click()}
            src={formState.avatar || currentUser.avatar}
            alt="profile-img"
          />
          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">
                Error Image upload (image must be less than 2 mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">
                Image successfully uploaded!
              </span>
            ) : (
              ""
            )}
          </p>
          <input
            onChange={handleInputChange}
            value={formState.username}
            className="border-2 border-slate-400 rounded-md h-[3rem] w-[30rem] shadow-md p-5"
            type="text"
            name="username"
            id=""
            required
          />
          <input
            onChange={handleInputChange}
            value={formState.email}
            className="border-2 border-slate-400 rounded-md h-[3rem] w-[30rem] shadow-md p-5"
            type="email"
            name="email"
            id=""
            required
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
            disabled={loading}
            onClick={handleFormSubmit}
            type="submit"
            className="bg-blue-900 hover:bg-blue-500 shadow-md text-white w-[30rem] h-[3rem] p-1 font-bold rounded-md"
          >
            {loading ? "Updating..." : "Update"}
          </button>
          <Link to="/createlisting">
            <button
              disabled={loading}
              type="button"
              className="bg-pink-900 hover:bg-pink-600  shadow-md text-white w-[30rem] h-[3rem] p-1 font-bold rounded-md"
            >
              Create Listing
            </button>
          </Link>
        </form>
        {loading && <InfinitySpin width="200" color="#4fa94d" />}
        <div className="flex flex-row gap-5 mt-5">
          <button
            onClick={deleteUserHandler}
            type="button"
            className="text-white font-bold 
            text-lg border-2 bg-red-600 rounded-md h-10 w-40"
          >
            Delete Account
          </button>
          <button
            onClick={handleSignOut}
            type="button"
            className="text-white font-bold 
            text-lg border-2 bg-purple-600 rounded-md h-10 w-40"
          >
            Sign Out
          </button>
        </div>
        <button
          onClick={handleShowListings}
          className="text-center rounded-md hover:bg-green-400 text-white w-40 h-10 mt-2 border-2 bg-green-600"
        >
          Show Listings
        </button>
        {userListings &&
          userListings.length > 0 &&
          userListings.map((listing) => (
            <div
              className="w-[100%] lg:w-[40%] flex border rounded-lg p-3 gap-4 justify-between items-center mt-1"
              key={listing._id}
            >
              <Link>
                <img
                  className="h-16 w-16 object-cover shadow-md"
                  src={listing.imageUrls[0]}
                  alt="profile-img"
                />
              </Link>
              <Link
                to={`/listing/${listing._id}`}
                className="text-slate-700
                  font-semibold
                  flex-1 
                  hover:underline 
                  truncate
                "
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col item-center">
                <button
                  onClick={() => handleDeleteListing(listing._id)}
                  type="button"
                  className="text-red-700 uppercase
                  hover:underline
                  "
                >
                  Delete
                </button>
                <Link to={`/updatelisting/${listing._id}`}>
                  <button
                    type="button"
                    className="text-green-700 uppercase
                  hover:underline
                  "
                  >
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
