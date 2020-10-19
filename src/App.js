import React, { useState, useContext, useEffect } from "react";
import "./App.scss";
import Day from "./components/Day";
import CalendarHeader from "./components/CalendarHeader";
import ReminderModal from "./components/ReminderModal";
import dayjs from "dayjs";
import Sidebar from "./components/Sidebar";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { GlobalContext } from "./context";
dayjs.extend(customParseFormat);

function getDays() {
  const month = dayjs().month() + 1;
  const year = dayjs().year();
  const daysInMonth = dayjs().daysInMonth();
  const firstDayOfTheMonth = dayjs(`${month}-01-${year}`, "MM-D-YYYY").day();
  const lastDayOfTheMonth = dayjs(
    `${month}-${daysInMonth}-${year}`,
    "MM-D-YYYY"
  ).day();

  let days = [];

  for (let i = 0; i < daysInMonth; i++) {
    const date = dayjs(`${month}-${i + 1}-${year}`, "MM-D-YYYY");
    days.push(date);
  }

  if (firstDayOfTheMonth !== 0) {
    for (let i = 0; i < firstDayOfTheMonth; i++) {
      days.unshift(null);
    }
  }

  if (lastDayOfTheMonth !== 6) {
    for (let i = 0; i < 6 - lastDayOfTheMonth; i++) {
      days.push(null);
    }
  }
  return days;
}

function App() {
  const days = getDays();

  const [showModal, setShowModal] = useState(false);
  const { reminderToEdit } = useContext(GlobalContext);

  useEffect(() => {
    if (reminderToEdit.id) {
      setShowModal(true);
    }
  }, [reminderToEdit]);

  return (
    <div>
      {/* Main screen- view of calendar */}
      <div className="appContainer">
        <header className="welcomeBar">
          <h1 className="welcomeBar__title">Check your running reminders</h1>
        </header>
        <main className="main">
          <Sidebar />
          <section className="calendarSection">
            <div className="controlsBar">
              <h3 className="controlsBar__title">Reminders calendar</h3>
              <div className="controlsBar__buttonsBox">
                <div className="dateTimePicker">
                  <button className="dateTimePicker__navButton">
                    <i className="fas fa-chevron-left" />
                  </button>
                  <h3 className="dateTimePicker__title">Month 2020</h3>
                  <button className="dateTimePicker__navButton">
                    <i className="fas fa-chevron-right" />
                  </button>
                </div>
                <button
                  className="newReminderButton"
                  onClick={() => setShowModal(true)}
                >
                  <i className="fas fa-plus" /> Create reminder
                </button>
              </div>
            </div>
            <div className="calendar">
              <CalendarHeader />
              <div>
                <div className="calendarMonthGrid">
                  {days.map((item, index) => (
                    <Day day={item} key={index} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      {showModal && (
        <ReminderModal
          setShowModal={setShowModal}
          reminder={reminderToEdit.id ? reminderToEdit : {}}
        />
      )}
    </div>
  );
}

export default App;
