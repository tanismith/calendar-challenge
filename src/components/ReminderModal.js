import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GlobalContext } from "../context";

const colors = ["#6a097d", "#c060a1", "#5c969e", "#3d7ea6"];

const CustomInput = ({ value, onClick }) => {
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
};

export default function ReminderModal({ setShowModal }) {
  const [title, setTitle] = useState("");
  const [colorSelected, setColorSelected] = useState(colors[0]);
  const [date, setDate] = useState(new Date());
  const { reminders, setReminders, setFilteredReminders } = useContext(
    GlobalContext
  );

  function handleSave() {
    const reminder = {
      title,
      date: date.getTime(),
      color: colorSelected,
    };
    const newReminders = [...reminders, reminder];
    setReminders(newReminders);
    localStorage.setItem("reminders", JSON.stringify(newReminders));
    setFilteredReminders(newReminders);
    setShowModal(false);
  }

  return (
    <div className="modal">
      <div className="addReminder">
        <div className="addReminder__closeBar">
          <h2 className="addReminder__titleOfBox">Remind me</h2>
          <button
            className="addReminder__closeButton"
            onClick={() => setShowModal(false)}
          >
            <i className="fas fa-times" />
          </button>
        </div>

        <form className="addReminder__contentBox">
          <div className="addReminder__dateTimeBox">
            <div className="weather">
              <img className="weather__image" src="#" alt="weather" />
              <p className="weather__degrees">24</p>
              <small className="weather__subtitle">No clouds</small>
              <p className="weather__title">Sunny</p>
            </div>
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
              placeholder="Choose city"
            />
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
        </form>
        <button onClick={handleSave} className="addReminder__saveButton">
          Save Reminder
        </button>
      </div>
    </div>
  );
}
