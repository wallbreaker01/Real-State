import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { app } from "../firebase";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { set } from "mongoose";

/*
 Firebase storage rules
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read;
      allow write: if 
      request.resource.size < 2*1024*1024 && 
      request.resource.contentType.matches('image/.*');
    }
  }
}


*/

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [file, setFile] = useState(undefined);
  const [filePercc, setFilePercc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
  
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on((snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePercc(Math.round(progress));
    });
    (error) => {
      fileUploadError(true);
    };
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFormData({ ...formData, avatar: downloadURL });
      });
    };
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data.data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());

      const res = await fetch("/api/auth/sign-out");
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateSignOutFailure(data.message));
        return;
      }

      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowListtings = async () => {
      try {
        setShowListingsError(false);
        const res = await fetch(`/api/user/listings/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          setShowListingsError(true);
          return;
        }

        setUserListings(data);

      } catch (error) {
       setShowListingsError(true);
      }
  };

  const handleDeleteListing = async (listingId) => {
      try {
        const res = await fetch(`/api/listing/delete/${listingId}`, {
          method: 'DELETE',

        });

        const data = await res.json();
        if(data.success === false){
          console.log(data.message);
          return;
        }
        setUserListings((prev) => prev.filter((listing) => listing._id !==listingId));

        
      } catch (error) {
        console.log(error.message);
      }
  }

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl font-semibold text-center">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">        
                  
        <input
          onChange={(e) => setFile(e.target.files[0])}
          id="avatar"
          type="file"
          ref={fileRef}   
          hidden                         
          accept="image/*"
        />
        

        <img
          onClick={() => fileRef.current.click()}
          src={file ? URL.createObjectURL(file) : currentUser.avatar}
          alt="profile"
          className="self-center rounded-full mt-4 h-24 w-24 cursor-pointer"
        />

        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          id="username"
          className="border p-3 rounded-lg bg-slate-300"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="email"
          defaultValue={currentUser.email}
          id="email"
          className="border p-3 rounded-lg bg-slate-300"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="password"
          defaultValue={currentUser.password}
          id="password"
          className="border p-3 rounded-lg bg-slate-300"
          onChange={handleChange}
        />

        <button onClick={handleSubmit} className="uppercase bg-slate-700 text-white rounded-lg hover:opacity-90 disabled:opacity-80">
          update
        </button>

        <Link
          className="bg-green-700 rounded-lg text-center text-white uppercase hover:opacity-85"
          to={"/create-listing "}
        >
          Create Listing
        </Link>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
      <button onClick={handleShowListtings} className="w-full text-green-700"> Show Listings</button>
      <p className='text-red-700 mt-5'>{showListingsError ? 'Error showing listings': ''}</p>

       { userListings && userListings.length > 0 && 

       userListings.map((listing) => (
          <div key={listing._id}  className="border rounded-lg p-3 flex justify-between items-center gap-4">
              <Link to={`/listing/${listing._id}`}>
              <img src={listing.imageURLs[0]} alt="listing cover" className="w-16 h-16 object-contain "/>

              </Link>

              <Link className="flex-1" to={`/listing/${listing._id}`}>
               <p className="text-slate-700 font-semibold  hover:underline truncate">{listing.title}</p>
              </Link>

              <div className="flex flex-col items-center">
                <button onClick={ () => handleDeleteListing(listing._id)} className="text-red-700 uppercase">Delete</button>
                
                <Link to= {`/update-listing/${listing._id}`} >
                <button  className="text-green-700 uppercase">Edit</button>
                </Link>

              </div>


          </div>
       ))}



    </div>
  );
}
