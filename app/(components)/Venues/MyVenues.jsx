"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getAllVenueByProfile, getProfiles } from "@/lib/api";
import { Button } from "@/components/ui/button";
import UpdateVenue from "../Modal/UpdateVenue/UpdateVenue";
import useDeleteVenue from "../Modal/DeleteVenue/useDeleteVenue";
import BookingDetails from "../BookingDetails";
export default function MyVenues() {
  const userDataFromCookie = Cookies.get("userData");
  const userName = userDataFromCookie
    ? JSON.parse(userDataFromCookie).name
    : null;

  const [venues, setVenues] = useState(null);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [iVenueManager, setIVenueManager] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        if (!userName) throw new Error("User data not found in cookie");
        const [venueRes, profileRes] = await Promise.all([
          getAllVenueByProfile(userName),
          getProfiles(userName),
        ]);
        setVenues(venueRes.data);
        setIVenueManager(profileRes.data.venueManager);
      } catch (err) {
        console.log(err);
      }
    };
    fetchVenues();
  }, [userName]);

  const handleEditClick = (venueId) => {
    setSelectedVenueId(venueId);
    const modal = document.getElementById("my_modal_2");
    modal && modal.showModal();
  };

  const { removeVenue } = useDeleteVenue(selectedVenueId);

  const handleDelete = (venueId) => {
    setSelectedVenueId(venueId);
    console.log("Venue deleted", venueId);
    removeVenue(venueId);
    setTimeout(() => window.location.reload(), 1200);
  };

  return (
    <>
      <section>
        <div>
          {venues &&
            venues.map((venue) => (
              <div key={venue.id}>
                {venue.name} <p>Number of bookings: {venue.bookings.length}</p>
                <div
                  className="tooltip"
                  data-tip={
                    iVenueManager
                      ? null
                      : "Register as a Venue Manager to continue."
                  }
                >
                  <Button
                    value={selectedVenueId}
                    venueid={selectedVenueId}
                    onClick={() => handleEditClick(venue.id)}
                    disabled={!iVenueManager}
                  >
                    Edit
                  </Button>
                </div>
                <div
                  className="tooltip"
                  data-tip={
                    iVenueManager
                      ? null
                      : "Register as a Venue Manager to continue."
                  }
                >
                  <Button
                    className="hover:bg-red-500"
                    onClick={() => handleDelete(venue.id)}
                    disabled={!iVenueManager}
                  >
                    Delete venue
                  </Button>
                </div>
                {venue.bookings.length <= 0 ? (
                  ""
                ) : (
                  <>
                    <BookingDetails bookings={venue.bookings} />
                  </>
                )}
              </div>
            ))}
        </div>
      </section>

      {selectedVenueId && (
        <UpdateVenue
          id={"my_modal_2"}
          venueid={selectedVenueId}
          venues={venues}
        />
      )}
    </>
  );
}
