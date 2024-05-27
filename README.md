# Project Exam - Holidaze 
[Deployment Site](https://holidaze-project-six.vercel.app/)

# Clone this repo?
First, clone the repository:

```bash
https://github.com/KrystianGH2/holidaze-project.git
```
npm install:

```bash
npm install
```

run development:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Overview
This project allows registered users to list their venues as a venue manager. Registered users can create, update, and delete venues as well as manage bookings. Customers can view a list of available venues for their holidays and manage their bookings.

## Project Features - Pages
### Register
- The register page includes a form where users can create a profile as either a regular customer or an admin/venue manager. This form is made with React Hook Form, a library that helps validate forms. It is a minimal library without any other dependencies, while being performant and straightforward to use, requiring developers to write fewer lines of code than other form libraries. The form data is validated with Yup validation.

### Login
- The login page includes a form where registered users can sign in. This login form is made with React Hook Form, providing flexibility and easy management with less code, helping keep the code file organized. The form also uses Yup for validating the input fields, ensuring it performs correctly by showing success or errors.

### Profile
- The profile page shows the user's profile. It provides an option for the user to edit their profile, where they can update their avatar, banner, and register/unregister as an admin. The profile page also includes a button redirecting to their created venues and bookings. A create venue button is also present, which opens a modal for creating venues.

### My Venues Page
- This page shows a list of venues managed by the registered venue manager. The list provides a table with venue information and upcoming bookings. Action buttons are present within the table for managing the venue.

### Updating and Deleting a Venue
- On the My Venues page, the listed venues in the table have two action buttons: edit venue, which opens a popup modal for updating their venues, and delete venue, allowing the user to delete the chosen venue.

### My Bookings Page
- This page shows a list of upcoming venues the customer has booked. It provides information such as venue name, date from, date to, number of guests, and an action button to cancel upcoming bookings.

### Home Page
- The home page contains a hero section with a button to the Venue page. It also contains a grid of venues and a carousel of venues. A search field is also present for searching a venue.

### Venue Page
- The venue page provides a list of venues listed by venue managers. The venue cards include a title, rating, location, max guests, and price per night. A filtering section allows users to find their desired venue more easily. The venue card links direct the user to the Venue by ID page.

### Venue by ID Page
- This page contains more information about the chosen venue, including name, description, location, max guests, rating, price, and a calendar for checking availability. Due to not all venues having latitude and longitude data, a fake map is used for design purposes.

### Booking Calendar
- The booking calendar component is a form that collects the required data: date from, date to, and guests. The calendar calculates the number of nights and returns the total price. The user can then reserve the chosen days and will see a success or error toast. The calendar disables already booked dates.

### Search Bar
- The search bar makes a request to get venues matching the query parameter. It then redirects to the search page, returning the searched venues. It also includes filtering so users can find venues that meet their needs.

### Sign Out
- This removes the saved user information in cookies.



## Project Stacks
- Next JS
- TailwindCSS
- DasiyUI
- Shadcn UI
- Vercel
- Figma
- Monday.com
- React Stars - React Ions
- Yup Validation
- Zustand
- prettier
- eslint






This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
