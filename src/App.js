import React, { useState, useContext, useEffect } from "react";
import "./App.scss";
import Day from "./components/Day";
import CalendarHeader from "./components/CalendarHeader";
import ReminderModal from "./components/ReminderModal";
import Sidebar from "./components/Sidebar";
import { GlobalContext } from "./context";
import RemindersModal from "./components/RemindersModal";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

//Getting the days of the whole month
function getDays() {
  const month = dayjs().month() + 1;
  const year = dayjs().year();
  const daysInMonth = dayjs().daysInMonth();
  const firstDayOfTheMonth = dayjs(`${month}-01-${year}`, "M-D-YYYY").day();
  const lastDayOfTheMonth = dayjs(
    `${month}-${daysInMonth}-${year}`,
    "M-D-YYYY"
  ).day();

  let days = [];

  for (let i = 0; i < daysInMonth; i++) {
    const date = dayjs(`${month}-${i + 1}-${year}`, "M-D-YYYY");
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

export default function App() {
  const days = getDays();
  const [showModal, setShowModal] = useState(false);
  const [showRemindersModal, setShowRemindersModal] = useState(false);
  const { reminderToEdit, remindersList } = useContext(GlobalContext);

  useEffect(() => {
    if (reminderToEdit.id) {
      setShowModal(true);
    }
  }, [reminderToEdit]);

  useEffect(() => {
    if (remindersList.length > 0) {
      setShowRemindersModal(true);
    } else {
      setShowRemindersModal(false);
    }
  }, [remindersList]);

  return (
    <div>
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
                <h3 className="dateTimePicker__title">
                  {dayjs().format("MMMM YYYY")}
                </h3>

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
      {showRemindersModal && <RemindersModal />}
    </div>
  );
}
