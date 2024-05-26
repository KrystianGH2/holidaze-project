"use client";
import { useState, useEffect } from "react";
import { getAllVenues } from "@/lib/api";
import Link from "next/link";
import { Rating } from "@smastrom/react-rating";
import Hero from "./Hero";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeProducts() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await getAllVenues();
        setVenues(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchVenues();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center rounded border-red-500 border p-4 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <>
      {" "}
      <main className="flex justify-center flex-col items-center w-full">
        <Hero />
        <section className="flex w-full max-w-7xl flex-col md:px-6 px-4">
          <h1 className="text-2xl font-semibold text-left py-2 pb-[20px]">
            Trending destinations
          </h1>
          <div className="grid grid-cols-3 gap-4">
            {venues.slice(0, 5).map((venue, index) => (
              <Link
                href={`/Venue/${venue.id}`}
                key={venue.id}
                className={`bg-white border rounded-md overflow-hidden shadow-lg ${
                  index === 3 && "col-span-2"
                }`}
              >
                <img
                  src={venue.media[0]?.url || "/default.jpg"}
                  alt={venue.name}
                  className="w-full h-48 object-cover"
                />
                <div className="flex flex-col">
                  <div className="p-4 flex flex-row justify-between items-center text-left font-semibold">
                    <p className="text-blue-500">
                      {venue.name.charAt(0).toUpperCase() + venue.name.slice(1)}
                    </p>
                    <small className="flex justify-start gap-1">
                      <Rating style={{ maxWidth: 80 }} value={venue.rating} />
                      <p>{venue.rating}</p>
                    </small>
                  </div>
                  <div className="px-4 py-2 flex flex-row justify-between items-center text-left font-semibold">
                    <p className=" text-sm">NOK {venue.price} </p>
                    <small className="flex justify-start gap-1 text-gray-500">
                      <p>Max Guests {venue.maxGuests}</p>
                    </small>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="flex w-full max-w-7xl flex-col md:px-6 px-4 pt-10">
          <h1 className="text-2xl font-semibold text-left py-2 pb-[20px]">
            Our Venues
          </h1>
          <Slider
            className="carousel"
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {venues.slice(5, 10).map((venue, index) => (
              <div
                key={venue.id}
                id={`slide${index + 1}`}
                className="relative w-full"
              >
                <Link href={`/Venue/${venue.id}`}>
                  <img
                    src={venue.media[0]?.url}
                    className="w-full h-[450px] object-cover"
                    alt={`Venue ${index + 1}`}
                  />
                </Link>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <button
                    className="btn btn-circle"
                    onClick={() => {
                      const prevIndex = index === 0 ? 4 : index - 1;
                      const prevSlide = document.getElementById(
                        `slide${prevIndex + 1}`
                      );
                      if (prevSlide)
                        prevSlide.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    ❮
                  </button>
                  <button
                    className="btn btn-circle"
                    onClick={() => {
                      const nextIndex = index === 4 ? 0 : index + 1;
                      const nextSlide = document.getElementById(
                        `slide${nextIndex + 1}`
                      );
                      if (nextSlide)
                        nextSlide.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    ❯
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-4">
                  <div className="flex flex-col">
                    <div className="p-4 flex flex-row justify-between items-center text-left font-semibold">
                      <p className="text-white text-lg">
                        {venue.name.charAt(0).toUpperCase() +
                          venue.name.slice(1)}
                      </p>
                      <small className="flex justify-start gap-1">
                        <Rating style={{ maxWidth: 80 }} value={venue.rating} />
                        <p className="text-white">{venue.rating}</p>
                      </small>
                    </div>
                    <div className="px-4 py-2 flex flex-row justify-between items-center text-left font-semibold">
                      <p className=" text-sm text-white">NOK {venue.price} </p>
                      <small className="flex justify-start gap-1 text-white">
                        <p>Max Guests {venue.maxGuests}</p>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>
      </main>
    </>
  );
}
