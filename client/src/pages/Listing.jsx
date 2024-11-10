import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper';
import { Navigation } from "swiper/modules";
import 'swiper/css/bundle';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true); 
      try {
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();

        if (!data.success) {
          setError(true);
        } else {
          setListing(data);
        }
      } catch (error) {
        setError(true); 
      }
      setLoading(false); 
    };
    
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">loading...</p>}
      {error && <p className="text-center my-7 text-2xl text-red-800">Something went wrong!</p>}
      
      {listing && !loading && !error && (
        <Swiper modules={[Navigation]} navigation>
          {listing.imageURLs && listing.imageURLs.length > 0 && listing.imageURLs.map((url, index) => (
            <SwiperSlide key={index}>
              <div
                className="h-[500px]"
                style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover' }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </main>
  );
}
