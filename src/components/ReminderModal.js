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

class CustomInput extends React.Component {
  render() {
    const { value, onClick } = this.props;
    return (
      <span
        style={{
          border: `1px solid gray`,
          padding: `1rem`,
          cursor: "pointer",
          margin: "5px 0",
        }}
        onClick={onClick}
      >
        {value}
      </span>
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

  function handleSave(e) {
    e.preventDefault();
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
      const reminderToReplaceIndex = reminders.findIndex(
        (item) => item.id === reminder.id
      );
      newReminders = [
        ...reminders.slice(0, reminderToReplaceIndex),
        ...reminders.slice(reminderToReplaceIndex + 1, -1),
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

  function handleClose() {
    setReminderToEdit({});
    setShowModal(false);
  }

  return (
    <div className="modal">
      <div className="addReminder">
        <div className="addReminder__closeBar">
          <h2 className="addReminder__titleOfBox">Remind me</h2>
          <button className="addReminder__closeButton" onClick={handleClose}>
            <i className="fas fa-times" />
          </button>
        </div>

        <form className="addReminder__contentBox" onSubmit={handleSave}>
          <div className="addReminder__dateTimeBox">
            {weather.temp && (
              <div className="weather">
                <img
                  className="weather__image"
                  style={{ objectFit: "contain" }}
                  src={
                    weather &&
                    weather.weather &&
                    weather.weather[0] &&
                    `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
                  }
                  alt="weather"
                />
                <p className="weather__degrees">{weather.temp || ""} °C</p>
                {/* <small className="weather__subtitle">No clouds</small> */}
                <p className="weather__title">
                  {weather &&
                    weather.weather &&
                    weather.weather[0] &&
                    weather.weather[0].main}
                </p>
              </div>
            )}
          </div>
          <div className="addReminder__reminderContent">
            <label htmlFor="titlereminder" />
            <input
              className="addReminder__title"
              id="titlereminder"
              type="text"
              placeholder="Add title to your reminder"
              maxLength={30}
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <DatePicker
              showTimeInput
              selected={date}
              onChange={(date) => setDate(date)}
              customInput={<CustomInput />}
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <label htmlFor="city" />
            <input
              className="addReminder__city"
              type="text"
              id="city"
              value={citySearch}
              onChange={(e) => {
                setCitySearch(e.target.value);
              }}
              placeholder="Choose city"
            />
            {citySearchResults.length > 0 && (
              <select
                value={setSelectedCity.id}
                onChange={(e) =>
                  setSelectedCity(
                    citySearchResults.find((item) => item.id === e.target.value)
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
          </div>
          <button type="submit" className="addReminder__saveButton">
            Save Reminder
          </button>
        </form>
      </div>
    </div>
  );
}
