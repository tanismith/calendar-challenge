import React, { useState } from "react";

export const GlobalContext = React.createContext({
  reminders: [],
  setReminders: () => {},
  filteredReminders: [],
  setFilteredReminders: () => {},
  reminderToEdit: {},
  setReminderToEdit: () => {},
  remindersList: [],
  setRemindersList: () => {},
});

export function GlobalContextProvider(props) {
  const localReminders = localStorage.getItem("reminders");
  const [reminders, setReminders] = useState(
    localReminders ? JSON.parse(localReminders) : []
  );
  const [filteredReminders, setFilteredReminders] = useState(reminders);
  const [reminderToEdit, setReminderToEdit] = useState({});
  const [remindersList, setRemindersList] = useState({});

  return (
    <GlobalContext.Provider
      value={{
        reminders,
        setReminders,
        filteredReminders,
        setFilteredReminders,
        reminderToEdit,
        setReminderToEdit,
        remindersList,
        setRemindersList,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
