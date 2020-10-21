## The challenge

---

✨Create a demo calendar application using React, Vue or Angular.
The app should allow the user to add a new "reminder" (max 30 chars) for a user entered day and time, also select color when creating a reminder and display it appropriately. The user can add a city that allows to get the weather forecast.

The created reminders must display on the calendar view in the correct time order, they should be able to be edited. Finally apply test functionality to add a new "reminder" entered day, time and city.

## The solution

---

Reminders Calendar 👍

A calendar web application to keep reminders built with React.

The project is totally focused on front-end and complies mandatory features mentioned above. It has the functionality to delete one or all the reminders for an specific day.

Calendar view: it shows the reminders displayed properly in the day and sorted by time.

![https://i.ibb.co/r3vqjhF/Screen-Shot-2020-10-20-at-21-21-02.png](https://i.ibb.co/r3vqjhF/Screen-Shot-2020-10-20-at-21-21-02.png)

Reminder modal, to create or edit one. It displays title, date picker, color picker, city to select and weather forecast.

![https://i.ibb.co/Y7zXjYg/2.png](https://i.ibb.co/Y7zXjYg/2.png)

Reminder's list Modal to manage overflow of reminders in a day. It allows to edit or delete a single reminder and allows to delete all reminder of a day.

![https://i.ibb.co/xgLdPxX/3.png](https://i.ibb.co/xgLdPxX/3.png)

### ✅You can preview the live project here:

https://reminders-calendar.netlify.app/(https://reminders-calendar.netlify.app/)

## Installation and Setup Instructions

---

Clone down this repository. You will need `node` and `yarn` or `npm`i nstalled globally on your machine.

Installation:

`yarn install` or `npm install`

To Run Test Suite:

`yarn test` or `npm run test`

To Start Server:

`yarn start` or `npm run start`

To Visit App:

`localhost:3000`

## Technologies Used

---

The technologies implemented in this project are React, React Context, JavaScript

I choose to use `create-react-app` boilerplate to minimize initial setup.
For managing time, I choose [day.js](https://day.js.org/en/) because of the bundle size and functionalities allowed.

Another small library used was [react-datepicker](https://reactdatepicker.com/) so the date picker when creating a new reminder works and looks the same in all browsers.

### Public APIS used

[OpenWeather API](https://openweathermap.org/) and [Mapbox Geocoding API](https://www.mapbox.com/) to get the weather forecast and the coordinates most approximate coordinates to the city selected by the user.

## Challenges

---

This was a 5 day challenge project.

One of the main challenges I ran into was using context to manage states and testing, this lead me to spend a few days on a research, at the end using React Context and Hooks to manage states made it easier to implement.

The other challenge was implementing tests, to accomplish this I tried using integration testing because of a better coverage of the functionality.
