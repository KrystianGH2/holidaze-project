"use client";
import React, { useState, useEffect } from "react";
import { getVenueById } from "@/lib/api";
import DatePickerWithRange from "@/app/(components)/Calendar";

export default function VenuePage({ params }) {
  const id = params.id;
  const [venue, setVenue] = useState(null);
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const venue = await getVenueById(id);
        console.log(venue);
        setVenue(venue.data);
        setBookings(venue.data.bookings);
      } catch (err) {
        console.log(err);
      }
    };

    fetchVenue();
  }, [id]);

  return (
    <div>
      <h1>Venue Page</h1>
      <h2>{venue?.name}</h2>
      {venue?.media && (
        <img src={venue.media[0].url} alt={venue.media[0].alt} />
      )}
      <p>{venue?.description}</p>
      <p> {venue?.price} NOK per Night </p>
      {venue && bookings && (
        <DatePickerWithRange
          venueId={venue.id}
          bookings={bookings}
          price={venue?.price}
        />
      )}
    </div>
  );
}
