import React, { useContext } from "react";
import dayjs from "dayjs";
import { GlobalContext } from "../context";

export default function RemindersModal() {
  const {
    remindersList,
    setRemindersList,
    setReminders,
    reminders,
    setFilteredReminders,
    setReminderToEdit,
  } = useContext(GlobalContext);

  function handleClose() {
    setRemindersList([]);
  }
  function handleDeleteAll() {
    const newReminders = reminders.filter(
      (item) => !remindersList.map((r) => r.id).includes(item.id)
    );
    setReminders(newReminders);
    localStorage.setItem("reminders", JSON.stringify(newReminders));
    setFilteredReminders(newReminders);
    handleClose();
  }
  function handleDelete(reminder) {
    const remindersLeft = reminders.filter((item) => item.id !== reminder.id);
    setReminders(remindersLeft);
    localStorage.setItem("reminders", JSON.stringify(remindersLeft));
    setFilteredReminders(remindersLeft);
    setRemindersList(remindersList.filter((item) => item.id !== reminder.id));
  }
  function handleEdit(reminder) {
    setReminderToEdit(reminder);
    handleClose();
  }

  return (
    <div className="dayBox">
      <div className="dayBox__controlsBar">
        <h2 className="dayBox__titleOfBox">
          {remindersList[0] &&
            dayjs(remindersList[0].date).format("dddd, DD MMMM YYYY")}
        </h2>
        <button className="dayBox__closeButton" onClick={handleClose}>
          <i className="fas fa-times" />
        </button>
      </div>
      <div className="remindersListBox">
        {remindersList.map((item, index) => (
          <div className="remindersListBox__reminder" key={index}>
            <div>
              <small className="timeReminder">
                {dayjs(item.date).format("HH:mm")}
              </small>
              <p className="descriptionReminder">{item.title}</p>
            </div>
            <div>
              <a className="editReminder" onClick={() => handleEdit(item)}>
                <i className="fas fa-edit" />
              </a>
              <a className="deleteReminder" onClick={() => handleDelete(item)}>
                <i className="fas fa-trash" />
              </a>
            </div>
          </div>
        ))}
      </div>
      <button className="dayBox__deleteAllButton" onClick={handleDeleteAll}>
        <i className="fas fa-trash" /> Delete all
      </button>
    </div>
  );
}
