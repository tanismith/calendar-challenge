import React from "react";

export default function Sidebar() {
  return (
    <section className="sideBar">
      <img
        className="sideBar__image"
        src="/images/reminders-ilustration@2x.png"
        alt="reminders-ilustration"
      />
      <div className="sideBar__colorsBox">
        <h2 className="sideBar__title">Welcome!</h2>
        <a href="#" className="sideBar__boxForColors">
          <div className="sideBar__color" />
          <div className="sideBar__color" />
          <div className="sideBar__color" />
          <div className="sideBar__color" />
          <div className="sideBar__color" />
          <div className="sideBar__color" />
          <div className="sideBar__color" />
          <div className="sideBar__color" />
        </a>
      </div>
    </section>
  );
}
