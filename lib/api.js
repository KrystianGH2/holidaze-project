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

    return res; 
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

