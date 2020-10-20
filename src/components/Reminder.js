import React, { useContext } from "react"; //using hook to manage states
import dayjs from "dayjs";
import { GlobalContext } from "../context"; //to consume  reminders fron Global Context

export default function Reminder({ reminder }) {
  const date = dayjs(reminder.date);
  const { setReminderToEdit } = useContext(GlobalContext);
  return (
    <div
      className="dateDayBox__reminder"
      onClick={() => setReminderToEdit(reminder)}
      style={{ backgroundColor: reminder.color || "pink" }}
    >
      <small>{date.format("HH:mm")}</small>
      <p>{reminder.title}</p>
    </div>
  );
}
