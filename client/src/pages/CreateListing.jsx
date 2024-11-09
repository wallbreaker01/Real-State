import { useState,React  } from "react";
import { app } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { setLogLevel } from "firebase/app";
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom'

export default function CreateListing() {
  const navigate = useNavigate();
  const {currentUser} = useSelector(state => state.user)
  const [files, setFiles] = useState([]);

  const [formData, setFormData] = useState({
    imageURLs: [],
    title: "",
    description: "",
    address: "",
    type: "rent",
    bathrooms: 1,
    bedrooms: 1,
    regularPrice: 0,
    discountedPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploader] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length <= 6) {
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(uploadImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({
          ...formData,
          imageURLs: formData.imageURLs.concat(urls),
        });
      });
    }
  };

  const uploadImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferd / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress} done`);
        },
        (error) => {
          reject(error);
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;

    if (id === "sell" || id === "rent") {
      setFormData({
        ...formData,
        type: value,
      });
    }

    // Convert checkbox values to Boolean for specific fields
    if (id === "parking" || id === "furnished" || id === "offer") {
      setFormData({
        ...formData,
        [id]: checked, // checked will be true or false
      });
    } else {
      setFormData({
        ...formData,
        [id]: type === "checkbox" ? checked : value, // Default to string for non-checkbox inputs
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 ">
        Create Listing
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row justify-between gap-6"
      >
        <div className="flex flex-col gap-4 flex-1">

          <input

            type="text"
            placeholder="title"
            className="border p-3 rounded-lg bg-slate-200"
            id="title"
            maxLength="62" 
            required

            onChange={handleChange}
            value={formData.title}
          />

          <textarea
            type="text"
            placeholder="description"
            className="border p-3 rounded-lg bg-slate-200"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />

          <input
            type="text"
            placeholder="address"
            className="border p-3 rounded-lg bg-slate-200"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sell"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sell"}
              />
              <span>Sell</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex gap-6 flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10000"
                required
                className="p-1 border rounded-lg border-gray-300"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="15"
                required
                className="p-1 border rounded-lg border-gray-300"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Bathrooms</p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="0"
                max="108788"
                required
                className="p-1 border rounded-lg border-gray-300"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <p>Regular Price</p>
              <span className="text-xs">(BDTTK / month)</span>
            </div>
             
             {formData.offer && (
              <div className="flex flex-col items-center gap-2">
              <input
                type="number"
                id="dicountedPrice"
                min="0"
                max="1000000000"
                required
                className="p-1 border rounded-lg border-gray-300"
                onChange={handleChange}
                value={formData.dicountedPrice}
              />
              <p>DiscountedPrice</p>
              <span className="text-xs">(BDTTK / month)</span>
            </div>
             )}
            
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be cover (max 6)
            </span>
          </p>

          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              type="file"
              id="images"
              accept="image/*"
              multiple
              className=" p-3 rounded-lg w-full hover:shadow-lg"
              required
            />

            <button
              type="button"
              onClick={handleImageSubmit}
              className="p-3 rounded-lg border border-green-700 text-green-700 uppercase hover:opacity-85 hover:shadow-lg disabled:opacity-80"
            >
              Upload
            </button>
          </div>

          <p className="text-red-600">
            {" "}
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageURLs.length > 0 &&
            formData.imageURLs.map((url, index) => (
              <div key={url || index} className="flex justify-between">
                <img
                  src={url}
                  alt="listing"
                  className="w-full h-52 object-cover rounded-lg"
                />
                <button className="text-red-700 p-3 rounded-lg uppercase hover:opacity-85">
                  Delete
                </button>
              </div>
            ))}

          <button className="p-3 rounded-lg bg-green-700 text-white uppercase hover:opacity-85 hover:shadow-lg disabled:opacity-80">
            {loading ? 'Creating...' : 'Create listing'}
          </button>
          {error && <p className ='text-red-700 text-sm'>{error}</p>}
        </div>
        <p> </p>
      </form>
    </main>
  );
}
