"use client";
import React, { useState, useEffect } from "react";
import { getVenueById } from "@/lib/api";
import DatePickerWithRange from "@/app/(components)/Calendar";
import { SlLocationPin } from "react-icons/sl";
import { FaWifi } from "react-icons/fa";
import { LuParkingSquare } from "react-icons/lu";
import { MdOutlineEmojiFoodBeverage, MdPets } from "react-icons/md";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";

export default function VenuePage({ params }) {
  const id = params.id;
  const [venue, setVenue] = useState(null);
  const [bookings, setBookings] = useState(null);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const venue = await getVenueById(id);
        setVenue(venue.data);
        setBookings(venue.data.bookings);
        setRating(venue.data.rating);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchVenue();
  }, [id]);

  return (
    <>
      <main className="flex flex-col justify-center items-center w-full lg:px-8 px-6">
        <section className="flex flex-col justify-start w-full max-w-7xl xl:px-8 gap-5">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Venue</a>
              </li>
              <li>
                {venue?.name
                  ? venue?.name.charAt(0).toUpperCase() + venue?.name.slice(1)
                  : ""}
              </li>
            </ul>
          </div>

          {loading ? (
            <section className="flex w-full justify-center">
              <div className="flex justify-start items-center w-full max-w-7xl">
                <div className="flex flex-col gap-4 w-[800px]">
                  <div className="skeleton h-[400px] w-full"></div>
                  <div className="skeleton h-8 w-28"></div>
                  <div className="skeleton h-8 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-8 w-full"></div>
                </div>
              </div>
            </section>
          ) : (
            <>
              <div className="flex flex-col gap-3">
                <h2 className="font-semibold text-xl tracking-wide">
                  {venue?.name
                    ? venue?.name.charAt(0).toUpperCase() + venue?.name.slice(1)
                    : ""}
                </h2>
                <div className="flex flex-row justify-start items-center gap-2 font-light text-sm">
                  <SlLocationPin />
                  <p>
                    <span>
                      {venue?.location.city ? (
                        <>{venue?.location.city?.charAt(0).toUpperCase()}</>
                      ) : (
                        <>{venue?.location?.address?.charAt(0).toUpperCase()}</>
                      )}
                    </span>
                    {venue?.location?.address && venue?.location?.city && (
                      <>
                        {venue?.location?.address.slice(1)},{" "}
                        {venue?.location?.city}
                      </>
                    )}
                    {venue?.location?.address && !venue?.location?.city && (
                      <>{venue?.location?.address.slice(1)}</>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex w-full justify-start items-start flex-col-reverse gap-4 md:flex-row md:h-[500px]">
                <div className="flex w-full md:h-full max-w-[800px] h-[500px]">
                  {venue?.media && (
                    <img
                      className="w-full h-full object-cover"
                      src={venue.media[0].url}
                      alt={venue.media[0].alt}
                    />
                  )}
                </div>

                <div className="flex flex-col fw-full gap-4 overflow-hidden">
                  <section className="flex w-full flex-col justify-center items-end md:max-w-[300px] p-4 rounded border md:gap-1">
                    <div className="flex flex-col py-2 gap-1">
                      <div className="flex flex-col py-2 gap-1 items-end">
                        <div className="flex flex-row gap-2">
                          <Rating
                            style={{ maxWidth: 80, paddingTop: "12px" }}
                            value={rating}
                          />
                          <p className="p-1 bg-blue-500 rounded-r-lg rounded-t-md h-auto px-3">
                            {venue.rating}
                          </p>
                        </div>
                        <small className="font-light tracking-wide text-gray-400">
                          Booked {venue._count.bookings} times
                        </small>
                      </div>
                      <hr />
                      <div className="flex justify-end items-center">
                        <div className="avatar">
                          <div className="w-[40px] rounded-full">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                          </div>
                        </div>
                        <p className="text-[13px] pt-2 font-extralight text-right">
                          “Fine room, great view, convenient location, nice bar
                          and restaurant, friendly staff.”
                        </p>
                      </div>
                    </div>
                  </section>

                  <div className="relative md:flex w-full  group">
                    <img
                      className="w-full h-[285px] object-cover opacity-60 md:max-w-[300px] group-hover:opacity-90 transition-opacity blur-0"
                      src="https://i.imgur.com/uvkX4Yu.png"
                    />
                    <Button
                      variant="secondary"
                      className="rounded-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                    >
                      Show on map
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-1 md:text-[14px] text-[13px] font-light">
                <ul className="flex flex-row gap-2">
                  <li
                    className={`flex flex-row justify-center items-center gap-2 ${
                      venue?.meta.wifi ? "border p-2 rounded" : null
                    }`}
                  >
                    {venue?.meta.wifi && (
                      <>
                        <FaWifi />
                        <p>Wifi</p>
                      </>
                    )}
                  </li>
                  <li
                    className={`flex flex-row justify-center items-center gap-2 ${
                      venue?.meta.parking ? "border p-2 rounded" : null
                    }`}
                  >
                    {venue?.meta.parking && (
                      <>
                        <LuParkingSquare />
                        <p>Parking</p>
                      </>
                    )}
                  </li>
                  <li
                    className={`flex flex-row justify-center items-center gap-2 ${
                      venue?.meta.breakfast ? "border p-2 rounded" : null
                    }`}
                  >
                    {venue?.meta.breakfast && (
                      <>
                        <MdOutlineEmojiFoodBeverage />
                        <p>Breakfast</p>
                      </>
                    )}
                  </li>
                  <li
                    className={`flex flex-row justify-center items-center gap-2 ${
                      venue?.meta.pets ? "border p-2 rounded" : null
                    }`}
                  >
                    {venue?.meta.pets && (
                      <>
                        <MdPets />
                        <p>Pets</p>
                      </>
                    )}
                  </li>
                </ul>
              </div>
              <div className="max-w-[700px] flex flex-col gap-2">
                <h3 className="font-semibold text-xl tracking-wide">
                  Property Description
                </h3>
                <p className="font-light text-[15px]">{venue?.description}</p>
              </div>
              {venue && bookings && (
                <DatePickerWithRange
                  venueId={venue.id}
                  bookings={bookings}
                  price={venue?.price}
                />
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
}
