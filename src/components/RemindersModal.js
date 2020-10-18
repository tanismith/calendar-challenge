import React from "react";

export default function RemindersModal() {
  return (
    <div className="dayBox">
      <div className="dayBox__controlsBar">
        <h2 className="dayBox__titleOfBox">Date</h2>
        <button className="dayBox__closeButton">
          <i className="fas fa-times" />
        </button>
      </div>
      <div className="remindersListBox">
        <div className="remindersListBox__reminder">
          <div>
            <small className="timeReminder">08:00</small>
            <p className="descriptionReminder">Reminder description</p>
          </div>
          <div>
            <a className="editReminder">
              <i className="fas fa-edit" />
            </a>
            <a className="deleteReminder">
              <i className="fas fa-trash" />
            </a>
          </div>
        </div>
        <div className="remindersListBox__reminder">
          <div>
            <small className="timeReminder">08:00</small>
            <p className="descriptionReminder">Reminder description</p>
          </div>
          <div>
            <a className="editReminder">
              <i className="fas fa-edit" />
            </a>
            <a className="deleteReminder">
              <i className="fas fa-trash" />
            </a>
          </div>
        </div>
      </div>
      <button className="dayBox__deleteAllButton">
        <i className="fas fa-trash" /> Delete all
      </button>
    </div>
  );
}
