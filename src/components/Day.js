import React, { useContext } from "react"; //use hook to manage states
import Reminder from "./Reminder";
import dayjs from "dayjs";
import { GlobalContext } from "../context";

export default function Day({ day }) {
  const context = useContext(GlobalContext);

  //empty box day if it doesn't match with the day of the week and date
  if (!day) {
    return <div className="dateDayBox"></div>;
  }

  //It shows the reminders of this specific day sorted by time in the box day
  let reminders = context.filteredReminders
    .filter((item) => {
      const rmdDate = dayjs(item.date);
      return day.date() === rmdDate.date();
    })
    .sort((a, b) => a.date - b.date);

  return (
    <div className="dateDayBox">
      <div className="dateDayBox__header">
        <p
          className={`dateDayTitle ${
            day.date() === dayjs().date() ? "active" : ""
          }`}
        >
          {day.date()}
        </p>
        {reminders.length > 0 && (
          <button
            className="listOfReminders"
            onClick={() => {
              context.setRemindersList(reminders);
            }}
          >
            <i className="fas fa-ellipsis-v"></i>
          </button>
        )}
      </div>
      {reminders.map((item, index) => (
        <Reminder reminder={item} key={index} />
      ))}
    </div>
  );
}
