import React, { useContext } from "react";
import dayjs from "dayjs";
import { GlobalContext } from "../context";
export default function Reminder({ reminder }) {
  const date = dayjs(reminder.date);
  const { setReminderToEdit } = useContext(GlobalContext);
  return (
    <div
      className="dateDayBox__reminder"
      onClick={() => setReminderToEdit(reminder)}
      style={{ backgroundColor: reminder.color || "pink" }}
    >
      <small>{date.format("HH:MM")}</small>
      <p>{reminder.title}</p>
    </div>
  );
}
