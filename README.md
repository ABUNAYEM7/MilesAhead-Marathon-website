# MilesAhead Marathon Website

**MilesAhead** is a dynamic web platform designed to help users explore and register for marathons worldwide. The application provides an interactive interface where users can view detailed marathon information, sort through marathons based on creation date and registration date, and paginate through results efficiently.

## Project Live Link

You can view the live project here: [MilesAhead Marathon Website](https://milesahead-34c38.web.app)

## Features

- **Marathon Listing**: View a comprehensive list of marathons with essential details like location, distance, registration dates, and more.
- **Sorting**: Sort marathons by their creation date or registration date, helping users easily find the latest or most relevant events.
- **Pagination**: Navigate through large sets of marathons with pagination controls to load more results in a user-friendly way.
- **Countdown Timer**: A countdown timer is displayed on each marathon detail page, showing the time remaining until the marathon starts.
- **Responsive Design**: The site is fully responsive and optimized for both mobile and desktop experiences.
- **Loading Skeletons**: Smooth loading experience with skeleton loaders while the data is being fetched.
- **Error Handling**: Graceful error messages when data fetch fails, ensuring the user always knows what’s happening.
- **SweetAlert Notifications**: Integration of `react-sweetalert` for interactive, customizable alerts.
- **Animations**: Using `react-lottie` for smooth, interactive animations to enhance the user experience.
- **Date Picker**: Integration of `react-datepicker` for easy date selection on marathon registration forms.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **React Router**: A library for routing and navigation in React applications.
- **React Query**: A library for fetching, caching, and synchronizing remote data.
- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **Tailwind CSS**: A utility-first CSS framework for building custom designs.
- **date-fns**: A JavaScript library for manipulating and formatting dates.
- **react-countdown-circle-timer**: A library for displaying countdown timers with circular progress indicators.
- **react-sweetalert**: A library for customizable alert dialogs with sweet animations and interactions.
- **react-lottie**: A library for integrating Lottie animations into React applications, providing smooth, interactive animations.
- **react-datepicker**: A library for date selection, making it easy to choose dates from a calendar UI.

## Features in Detail

### Marathon Listing

Users can view a list of marathons with essential details like:

- Title
- Location
- Distance
- Registration Dates
- Marathon Start Date

Each marathon card is clickable, leading to a detailed page with more information, including a countdown timer until the event starts.

### Sorting Marathons

Users can sort the marathon list by two fields:

- **Create Date**: Sort marathons from the newest to oldest or vice versa.
- **Registration Date**: Sort marathons by registration dates in ascending order.

### Countdown Timer

On the marathon details page, a countdown timer shows the days, hours, minutes, and seconds left until the marathon starts, using the **react-countdown-circle-timer** component.

### Pagination

The marathon list supports pagination, allowing users to browse large sets of marathons with ease. Users can navigate between pages using the "Prev" and "Next" buttons or by selecting a specific page number.

### SweetAlert Notifications

The application uses **react-sweetalert** to provide interactive and visually appealing alert dialogs. This is used for error handling, confirmation dialogs, and other user interactions, providing a polished and seamless experience.

### Animations with Lottie

Interactive animations are integrated into the website using **react-lottie**. These animations improve the overall user experience, making the application more engaging.

### Date Picker for Registration

For easier date selection during marathon registration, **react-datepicker** is used, allowing users to pick dates from a calendar UI, enhancing the form experience.

### Responsive Design

The layout is designed to be mobile-friendly, ensuring an optimal user experience on both desktop and mobile devices.

## New Sections (Extra 2 sections)

### Manage Your Event

As a marathon organizer, **MilesAhead** gives you all the tools needed to easily manage your event. From setting up event details to sorting through registrations, you can manage everything with ease. MilesAhead allows you to:

- **Create New Marathons**: Set up new events with just a few clicks.
- **Sort and Filter**: Organize marathons based on creation date or registration date.
- **Edit and Update**: Easily edit or update marathon details.
- **Monitor Registrations**: Track how many participants have signed up and manage registration processes.

With **MilesAhead**, managing marathons becomes effortless. The intuitive interface and smooth workflows will save you time, so you can focus on organizing a successful race.

To make this section even more attractive, here's a simple Lottie animation that depicts the ease of managing marathons:

## How to Run Locally

Follow these steps to set up and run the project on your local machine:

1. **Clone the repository:**
   ```bash
   git clone "https://github.com/your-repository-url.git"
   ```

2. **Navigate to the project folder:**
   ```bash
   cd milesahead
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Set up your Firebase and API credentials:**

   Create a `.env` file in the root directory of the project and add the following environment variables:
   
   - `VITE_apiKey=AIzaSyCl_Lsr_vbXpNYmW8uV4Vx9OA4xdC9wFiM`
   - `VITE_authDomain=milesahead-34c38.firebaseapp.com`
   - `VITE_projectId=milesahead-34c38`
   - `VITE_storageBucket=milesahead-34c38.firebasestorage.app`
   - `VITE_messagingSenderId=858466692384`
   - `VITE_appId=1:858466692384:web:1cab26ce1631b6af55fb45`
   - `VITE_API_URL=https://server-kohl-mu.vercel.app`

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open the browser** and go to:
   ```
   http://localhost:3000
   ```

## Dependencies

```json
{
  "name": "milesahead",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.62.8",
    "axios": "^1.7.9",
    "date-fns": "^4.1.0",
    "firebase": "^11.1.0",
    "lodash": "^4.17.21",
    "lottie-react": "^2.4.0",
    "react": "^18.3.1",
    "react-countdown-circle-timer": "^3.2.1",
    "react-datepicker": "^7.5.0",
    "react-dom": "^18.3.1",
    "react-helmet": "^6.1.0",
    "react-icons": "^5.4.0",
    "react-loading-skeleton": "^3.5.0",
    "react-router-dom": "^7.1.0",
    "sweetalert2": "^11.15.3",
    "swiper": "^11.1.15"
  },
  "devDependencies": {
    "@eslint/js": "^9.17.0",
    "@types/react": "^18.3.17",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "daisyui": "^4.12.22",
    "eslint": "^9.17.0",
    "eslint-plugin-react": "^7.37.2",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.16",
    "globals": "^15.13.0",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "vite": "^6.0.3"
  }
}
```