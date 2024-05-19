import Cookies from "js-cookie";
const apiKey = process.env.APP_API_KEY
const URL = process.env.APP_API_URL

export const getProfiles = async (userName) => {
  const accessToken = JSON.parse(Cookies.get('accessToken'));
    const userProfileUrl = `${URL}holidaze/profiles/${userName}`
   const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey
    },
  };
    try {
    const res = await fetch(userProfileUrl, options);
    
    if (!res.ok) {
      throw new Error(res.statusText); 
    }
    
    const data = await res.json();
    return data; 
  } catch (err) {
    console.log(err);
  }
    
}


export const updateUserProfile = async (data, userName) => {
 const accessToken = JSON.parse(Cookies.get('accessToken'));
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey
    },
    body: JSON.stringify(data),
  };

  try {
    const res = await fetch(`${URL}holidaze/profiles/${userName}`, options);
    if (!res.ok) {
      throw new Error("Failed to update user profile");
    }
    const responseData = await res.json();
    return responseData;
  } catch (err) {
    console.error(err);
    throw err; 
  }
};

export const getAllVenues = async (limit = 20, page = 1) => {
  const options = {
    method: "GET",
  };
  try {
    const res = await fetch(`${URL}holidaze/venues?limit=${limit}&page=${page}&_owner=true&_bookings=true`, options);
    if (!res.ok) {
      throw new Error("Failed to fetch venues");
    }
    const responseData = await res.json();
    return responseData;
  } catch (err) {
    console.error(err);
    throw err; 
  }
}


export const getAllVenueByProfile = async (userName) => {
  const accessToken = JSON.parse(Cookies.get('accessToken'));
  const userProfileUrl = `${URL}holidaze/profiles/${userName}/venues?_bookings=true&_owner=true`
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey
    },
  };
  try {
    const res = await fetch(userProfileUrl, options);
    if (!res.ok) {
      throw new Error("Failed to fetch venues");
    }
    const responseData = await res.json();
    return responseData;
  } catch (err) {
    console.error(err);
  }
}


export const getVenueById = async (id) => {
  const options = {
    method: "GET",
     headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await fetch(`${URL}holidaze/venues/${id}?_bookings=true`, options);
    if (!res.ok) {
      throw new Error("Failed to fetch venues");
    }
    const responseData = await res.json();
    return responseData;
  } catch (err) {
    console.error(err);
  }
}


export const createVenue = async (data) => {
  const accessToken = JSON.parse(Cookies.get('accessToken'));
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(data),
  };

  try {
    const res = await fetch(`${URL}holidaze/venues`, options);
    if (!res.ok) {
      throw new Error("Failed to create venue");
    }
    const responseData = await res.json();
    return responseData;
  } catch (err) {
    console.error(err);
    throw err; 
  }
}


export const updateVenue = async (data, venueId) => {
  const accessToken = JSON.parse(Cookies.get('accessToken'));
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(data),
  };

  try {
    const res = await fetch(`${URL}holidaze/venues/${venueId}`, options);
    if (!res.ok) {
      throw new Error("Failed to create venue");
    }
    const responseData = await res.json();
    return responseData;
  } catch (err) {
    console.error(err);
    throw err; 
  }
}

export const deleteVenue = async (venueId) => {
  const accessToken = JSON.parse(Cookies.get('accessToken'));
  const removeVenue = `${URL}holidaze/venues/${venueId}`
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  };

  try{
    const res = await fetch(removeVenue, options);
    if (!res.ok) {
      throw new Error("Failed to delete venue");
    }
  
  } catch (err) {
    console.log(err);
  }



}


export const createBooking = async (bookingData) => {
  try {
    const accessToken = JSON.parse(Cookies.get('accessToken'));
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
      body: JSON.stringify(bookingData),
    };

    const res = await fetch(`${URL}holidaze/bookings`, options);
    const responseData = await res.json();

   

    return responseData;
  } catch (err) {
    console.error("Error creating booking:", err);
    throw err; // Re-throw the error to handle it in the calling function
  }
};



export const usersBookings = async ( userName) => {
   const accessToken = JSON.parse(Cookies.get('accessToken'));
  const userProfileUrl = `${URL}holidaze/profiles/${userName}/bookings`
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey
    },
  };
  try {
    const res = await fetch(userProfileUrl, options);
    if (!res.ok) {
      throw new Error("Failed to fetch bookings");
    }
    const responseData = await res.json();
    return responseData;
  } catch (err) {
    console.error(err);
  }
}

export const deleteBooking = async (bookingId) => {
  const accessToken = JSON.parse(Cookies.get('accessToken'));
  const removeBooking = `${URL}holidaze/bookings/${bookingId}`
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  };

  try{
    const res = await fetch(removeBooking, options);
    if (!res.ok) {
      throw new Error("Failed to delete booking");
    }
  
  } catch (err) {
    console.log(err);
  }
}

