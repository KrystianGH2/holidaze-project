"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getAllVenueByProfile, getProfiles } from "@/lib/api";
import { Button } from "@/components/ui/button";
import UpdateVenue from "../Modal/UpdateVenue/UpdateVenue";

export default function MyVenues() {
  const userDataFromCookie = Cookies.get("userData");
  const parsedUserData = userDataFromCookie
    ? JSON.parse(userDataFromCookie)
    : null;
  const userName = parsedUserData ? parsedUserData.name : null;
  const [venues, setVenues] = useState(null);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [iVenueManager, setIVenueManager] = useState(null);

  useEffect(() => {
    const myVenues = async () => {
      try {
        if (!userName) {
          throw new Error("User data not found in cookie");
        }
        const res = await getAllVenueByProfile(userName);
        setVenues(res.data);
        const res2 = await getProfiles(userName);
        setIVenueManager(res2.data.venueManager);
      } catch (err) {
        console.log(err);
      }
    };

    myVenues();
  }, [userName]);

  const handleEditClick = (venueId) => {
    setSelectedVenueId(venueId);
    const modal = document.getElementById("my_modal_2");
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <>
      <section>
        <div>
          {venues &&
            venues.map((venue) => (
              <div key={venue.id}>
                {venue.name}
                {iVenueManager ? (
                  <Button
                    value={selectedVenueId}
                    venueid={selectedVenueId}
                    onClick={() => handleEditClick(venue.id)}
                  >
                    Edit
                  </Button>
                ) : (
                  <div
                    className="tooltip "
                    data-tip="Register as a Venue Manager to continue."
                  >
                    <Button className="btn">Edit</Button>
                  </div>
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
