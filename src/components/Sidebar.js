import React, { useContext, useState } from "react";
import { GlobalContext } from "../context";

export default function Sidebar() {
  const [colorSelected, setColorSelected] = useState("all");

  const { reminders, setFilteredReminders } = useContext(GlobalContext);

  const colors = reminders.map((item) => item.color);
  const uniqueColors = [...new Set(colors)];

  function handleFilter(color) {
    if (color === "all") {
      setFilteredReminders(reminders);
    } else {
      setFilteredReminders(reminders.filter((item) => item.color === color));
    }
    setColorSelected(color);
  }

  return (
    <section className="sideBar">
      <img
        className="sideBar__image"
        src="/images/reminders-ilustration@2x.png"
        alt="reminders-ilustration"
      />
      <div className="sideBar__colorsBox">
        <h2 className="sideBar__title">Welcome!</h2>
        <h2 className="sideBar__title">Filter by:</h2>
        <div
          onClick={() => handleFilter("all")}
          className={colorSelected === "all" ? "active" : ""}
          style={{
            backgroundColor: "pink",
            textAlign: "center",
            padding: "5px",
            borderRadius: "15px",
            cursor: "pointer",
          }}
        >
          ALL
        </div>
        <span className="sideBar__boxForColors">
          {uniqueColors.map((item, i) => (
            <div
              onClick={() => handleFilter(item)}
              className={`sideBar__color ${
                item === colorSelected ? "active" : ""
              }`}
              key={i}
              style={{ backgroundColor: item }}
            />
          ))}
        </span>
      </div>
    </section>
  );
}
