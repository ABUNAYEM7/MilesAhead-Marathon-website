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
