import React, { useContext } from "react";
import Reminder from "./Reminder";
import dayjs from "dayjs";
import { GlobalContext } from "../context";

export default function Day({ day }) {
  const context = useContext(GlobalContext);

  if (!day) {
    return <div className="dateDayBox"></div>;
  }

  let reminders = context.filteredReminders
    .filter((item) => {
      const rmdDate = dayjs(item.date);
      return day.date() === rmdDate.date();
    })
    .sort((a, b) => a.date - b.date);

  return (
    <div className="dateDayBox">
      <p className="dateDayTitle">{day.date()}</p>
      {reminders.map((item, index) => (
        <Reminder reminder={item} key={index} />
      ))}
    </div>
  );
}
