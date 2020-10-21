import React, { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GlobalContext } from "../context";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

const colors = ["#6a097d", "#c060a1", "#5c969e", "#3d7ea6"];
const mapBoxAPIKEY =
  "pk.eyJ1IjoidGFuaWEtc21pdGgiLCJhIjoiY2tnZm5sbW9iMGQydTJ6b2JrbHdvMmR2eSJ9.aus8exVibUBXqs5XdXS8Vw";
const weatherApiKey = "fd4dc66b609f4c4ad272de0cb1814d91";

// Defining customized Input for Selecting date and time from React Datepicker
class CustomInput extends React.Component {
  render() {
    const { value, onClick } = this.props;
    return (
      <input aria-label="dateInput" readOnly onClick={onClick} value={value} />
    );
  }
}

export default function ReminderModal({ setShowModal, reminder }) {
  const [title, setTitle] = useState(reminder.title || "");
  const [citySearch, setCitySearch] = useState(
    (reminder.selectedCity && reminder.selectedCity.place_name) || ""
  );
  const [citySearchResults, setCitySearchResults] = useState([]);
  const [selectedCity, setSelectedCity] = useState({});
  const [colorSelected, setColorSelected] = useState(
    reminder.color || colors[0]
  );
  const [weatherResult, setWeatherResult] = useState({});
  const [weather, setWeather] = useState({});
  const [date, setDate] = useState(
    (reminder.date && new Date(reminder.date)) || new Date()
  );

  const {
    reminders,
    setReminders,
    setFilteredReminders,
    setReminderToEdit,
  } = useContext(GlobalContext);

  // Asking for API response after waiting the user to finish typing the whole city name.
  useEffect(() => {
    const timeOutId = setTimeout(async () => {
      if (citySearch) {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${citySearch}.json?access_token=${mapBoxAPIKEY}`
        );
        const result = await response.json();
        setCitySearchResults(result.features);
        setSelectedCity(result.features[0]);
      }
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [citySearch]);

  // Asking API response for weather data based on the coordinates of the city selected by the user
  useEffect(() => {
    async function fetchData() {
      if (selectedCity.center) {
        const [lon, lat] = selectedCity.center;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
        );
        const result = await response.json();
        setWeatherResult(result);
      }
    }
    fetchData();
  }, [selectedCity]);

  //Selecting the closest weather object based on the date and time (timestamp format).
  //Here an array is used to gathering all results from the API.
  //The date from API was transformed in milliseconds to be compare with current time.
  useEffect(() => {
    if (weatherResult.current) {
      const allWeathers = [
        weatherResult.current,
        ...weatherResult.daily,
        ...weatherResult.hourly,
      ];
      const currentTs = date.getTime();
      let closest = {
        diff: null,
        closeWeather: {},
      };
      allWeathers.forEach((item) => {
        const diff = Math.abs(currentTs - dayjs.unix(item.dt).valueOf());
        if (!closest.diff || closest.diff > diff) {
          closest.diff = diff;
          closest.closeWeather = item;
        }
      });
      setWeather(closest.closeWeather);
    }
  }, [date, weatherResult]);

  //The below function allows to save the values of props selected and entered in a new reminder or and existing one
  //To save a reminder edited by the user, the function finds the ID and a new array its created
  // by filtering.
  function handleSave(e) {
    e.preventDefault(); //of submit form
    const reminderToSave = {
      id: reminder.id || uuidv4(),
      title,
      date: date.getTime(),
      color: colorSelected,
      selectedCity,
      weather,
    };
    let newReminders;
    if (reminder.id) {
      newReminders = [
        ...reminders.filter((item) => item.id !== reminder.id),
        reminderToSave,
      ];
    } else {
      newReminders = [...reminders, reminderToSave];
    }

    setReminders(newReminders);
    localStorage.setItem("reminders", JSON.stringify(newReminders));
    setFilteredReminders(newReminders);
    handleClose();
  }
  //Deleting the reminder by filtering from the reminders array
  function handleDelete() {
    const remindersLeft = reminders.filter((item) => item.id !== reminder.id);
    setReminders(remindersLeft);
    localStorage.setItem("reminders", JSON.stringify(remindersLeft));
    setFilteredReminders(remindersLeft);
    handleClose();
  }

  //Closing the modal: two states, to edit an existing one or for a new one.
  function handleClose() {
    setReminderToEdit({});
    setShowModal(false);
  }

  // Function to pass a valid prop to React component when displaying the temperature.
  // Weather API response has 'temp' as property and sometimes as object.
  // Here the function choose only the prop to be passed.
  function displayTemp(weather) {
    if (weather.temp.day) {
      return weather.temp.day;
    } else if (weather.temp) {
      return weather.temp;
    } else {
      return "";
    }
  }

  return (
    <div className="modal" aria-label="reminder-modal">
      <div className="addReminder">
        <div className="addReminder__closeBar">
          <h2 className="addReminder__titleOfBox">Remind me</h2>
          <div>
            {reminder.id && (
              <button className="deleteReminder" onClick={handleDelete}>
                <i className="fas fa-trash" />
              </button>
            )}
            <button className="addReminder__closeButton" onClick={handleClose}>
              <i className="fas fa-times" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSave} aria-label="reminderForm">
          <div className="addReminder__reminderContent">
            <label htmlFor="titlereminder" />
            <input
              aria-label="titlereminder"
              className="addReminder__title"
              id="titlereminder"
              type="text"
              placeholder="Add title to your reminder"
              maxLength={30}
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* Date and hour user picker*/}
            <DatePicker
              showTimeInput
              selected={date}
              onChange={(date) => setDate(date)} //React re-render the component with the new date
              customInput={<CustomInput />}
              dateFormat="MMMM d, yyyy h:mm aa"
              minDate={new Date()}
              maxDate={new Date(dayjs().endOf("month").valueOf())}
            />

            {/* Selecting the color for the reminder */}
            <div className="colorPickerBar">
              <p className="colorPickerBar__title">Select a color</p>
              {colors.map((item, i) => (
                <span
                  onClick={() => setColorSelected(item)}
                  className={`colorPickerBar__color ${
                    colorSelected === item ? "active" : ""
                  }`}
                  key={i}
                  style={{ backgroundColor: item }}
                />
              ))}
            </div>

            {/* Searching the city and showing options to choose one */}
            <div className="addReminder__cityBox">
              <label htmlFor="city" />
              <input
                aria-label="cityInput"
                className="addReminder__city"
                type="text"
                id="city"
                value={citySearch}
                onChange={(e) => {
                  setCitySearch(e.target.value);
                }}
                placeholder="Select a city"
              />
              {citySearchResults.length > 0 && (
                <select
                  className="addReminder__selectBox"
                  value={setSelectedCity.id}
                  onChange={(e) =>
                    setSelectedCity(
                      citySearchResults.find(
                        (item) => item.id === e.target.value
                      )
                    )
                  }
                >
                  {citySearchResults.map((item, i) => (
                    <option key={i} value={item.id}>
                      {" "}
                      {item.place_name}{" "}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Showing the weather temperature with icon and title */}
            {weather.temp && (
              <div className="weather">
                <img
                  className="weather__image"
                  src={
                    weather &&
                    weather.weather &&
                    weather.weather[0] &&
                    `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
                  }
                  alt="weather"
                />
                <p className="weather__degrees">{displayTemp(weather)} °C</p>
                <p className="weather__title">
                  {weather &&
                    weather.weather &&
                    weather.weather[0] &&
                    weather.weather[0].main}
                </p>
              </div>
            )}
          </div>

          {/* Submitting the reminder with all info that will be saved on local storage */}
          <button
            type="submit"
            className="addReminder__saveButton"
            aria-label="submitReminder"
          >
            Save Reminder
          </button>
        </form>
      </div>
    </div>
  );
}
