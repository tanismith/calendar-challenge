import React, { useState } from "react";

export const GlobalContext = React.createContext({
  reminders: [],
  setReminders: () => {},
  filteredReminders: [],
  setFilteredReminders: () => {},
});

export function GlobalContextProvider(props) {
  const localReminders = localStorage.getItem("reminders");

  const [reminders, setReminders] = useState(
    localReminders ? JSON.parse(localReminders) : []
  );
  const [filteredReminders, setFilteredReminders] = useState(reminders);

  return (
    <GlobalContext.Provider
      value={{
        reminders,
        setReminders,
        filteredReminders,
        setFilteredReminders,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
