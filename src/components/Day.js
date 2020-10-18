import React from "react";
import Reminder from "./Reminder";
import dayjs from "dayjs";

const rmds = [
  {
    date: 1603378814,
    title: "Hola",
    color: "black",
    city: "Quito",
  },
  {
    date: 1603378314,
    title: "Hola",
    color: "black",
    city: "Quito",
  },
  {
    date: 1602195614,
    title: "Hola 2",
    color: "red",
    city: "Quito",
  },
];

export default function Day({ day }) {
  if (!day) {
    return <div className="dateDayBox"></div>;
  }

  let reminders = rmds
    .filter((item) => {
      const rmdDate = dayjs.unix(item.date);
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
