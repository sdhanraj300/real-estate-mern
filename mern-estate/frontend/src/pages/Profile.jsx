import React, { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InfinitySpin } from "react-loader-spinner";
const Profile = () => {
  const [file, setFile] = React.useState(undefined);
  const [filePerc, setFilePerc] = React.useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  console.log(filePerc);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  console.log();
  //   {
  //     rules_version = '2';

  // // Craft rules based on data in your Firestore database
  // // allow write: if firestore.get(
  // //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
  // service firebase.storage {
  //   match /b/{bucket}/o {
  //     match /{allPaths=**} {
  //       allow read;
  //       allow write: if request.source.size < 2*1024 &&
  //       request.source.contentType.matches('image/.*');
  //     }
  //   }
  // }
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

  const { currentUser } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.user);
  const [formState, setFormState] = React.useState({
    email: currentUser.email,
    username: currentUser.username,
    password: "",
    avatar: currentUser.avatar,
  });
  console.log(formState);
  console.log(formState.avatar);
  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e) => {};
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
          className="h-40 w-40 rounded-full"
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
            onClick={handleFormSubmit}
            type="submit"
            className="bg-blue-900 text-white w-[30rem] h-[3rem] p-1 font-bold rounded-md"
          >
            Update
          </button>
        </form>
        {loading && <InfinitySpin width="200" color="#4fa94d" />}
        <div className="flex flex-row gap-5 mt-5">
          <button
            type="button"
            className="text-white font-bold 
            text-lg border-2 bg-red-600 rounded-md h-10 w-40"
          >
            Delete Account
          </button>
          <button
            type="button"
            className="text-white font-bold 
            text-lg border-2 bg-purple-600 rounded-md h-10 w-40"
          >
            Sign Out
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
