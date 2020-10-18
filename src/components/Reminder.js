import React from "react";
import dayjs from "dayjs";

export default function Reminder({ reminder }) {
  const date = dayjs.unix(reminder.date);
  return (
    <div
      className="dateDayBox__reminder"
      style={{ backgroundColor: reminder.color }}
    >
      <small>{date.format("HH:MM")}</small>
      <p>{reminder.title}</p>
    </div>
  );
}
