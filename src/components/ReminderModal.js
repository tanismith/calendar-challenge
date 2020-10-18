import React from "react";

export default function ReminderModal({ setShowModal }) {
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
            <label htmlFor="date" />
            <input
              className="addReminder__date"
              type="date"
              id="date"
              name="date"
              defaultValue=" "
              placeholder="mm dd,yyyy"
            />
            <label htmlFor="time" />
            <input
              className="addReminder__time"
              type="time"
              id="time"
              name="time"
              required
            />
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
            />
            <select
              id="dropdown"
              name="frecuency"
              className="addReminder__frecuency"
              required
            >
              <option selected value="Daily">
                Daily
              </option>
              <option value="Weekdays">Weekdays(Mon-Fri)</option>
              <option value="Weekly">Weekly(every "Friday")</option>
              <option value="Monthly">Monthly (third Friday)</option>
              <option value="Monthly">Monthly (same date)</option>
              <option value="Yearly">Yearly (every "14 Oct")</option>
            </select>
            <label htmlFor="city" />
            <input
              className="addReminder__city"
              type="text"
              id="city"
              placeholder="Choose city"
            />
            <div className="colorPickerBar">
              <p className="colorPickerBar__title">Select a color</p>
              <button className="colorPickerBar__color" />
              <button className="colorPickerBar__color" />
              <button className="colorPickerBar__color" />
            </div>
          </div>
        </form>
        <button className="addReminder__saveButton">Save Reminder</button>
      </div>
    </div>
  );
}
