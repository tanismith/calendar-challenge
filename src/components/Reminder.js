import React from "react";
import dayjs from "dayjs";

export default function Reminder({ reminder }) {
  const date = dayjs(reminder.date);
  return (
    <div
      className="dateDayBox__reminder"
      style={{ backgroundColor: reminder.color || "pink" }}
    >
      <small>{date.format("HH:MM")}</small>
      <p>{reminder.title}</p>
    </div>
  );
}
