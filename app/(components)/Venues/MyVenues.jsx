"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getAllVenueByProfile } from "@/lib/api";
import { Button } from "@/components/ui/button";
import UpdateVenue from "../Modal/UpdateVenue/UpdateVenue";
import { useAuth } from "@/app/Context/AuthContext";

export default function MyVenues() {
  const { isVenueManager } = useAuth();
  const userDataFromCookie = Cookies.get("userData");
  const parsedUserData = userDataFromCookie
    ? JSON.parse(userDataFromCookie)
    : null;
  const userName = parsedUserData ? parsedUserData.name : null;
  const [venues, setVenues] = useState(null);
  const [selectedVenueId, setSelectedVenueId] = useState(null);

  useEffect(() => {
    const myVenues = async () => {
      try {
        if (!userName) {
          throw new Error("User data not found in cookie");
        }
        const res = await getAllVenueByProfile(userName);
        setVenues(res.data);
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
                {isVenueManager ? (
                  <Button
                    value={selectedVenueId}
                    venueid={selectedVenueId}
                    onClick={() => handleEditClick(venue.id)}
                  >
                    Edit
                  </Button>
                ) : (
                  <div
                    className="tooltip tooltip-error"
                    data-tip="Register as a Venue Manager to continue."
                  >
                    <button disabled={true} className="btn btn-error">
                      Edit
                    </button>
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
