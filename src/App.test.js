import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

test("saves a new reminder", async () => {
  const { getByText, getByLabelText, queryByLabelText } = render(<App />);
  const createReminderButton = getByText(/Create reminder/i);

  expect(createReminderButton).toBeInTheDocument();

  fireEvent.click(createReminderButton);

  const modal = getByLabelText("reminder-modal");

  expect(modal).toBeInTheDocument();

  const titleInput = getByLabelText("titlereminder");
  const dateInput = getByLabelText("dateInput");
  const cityInput = getByLabelText("cityInput");
  const submitReminder = getByLabelText("submitReminder");

  fireEvent.change(titleInput, {
    target: { value: "My reminder" },
  });
  fireEvent.change(dateInput, {
    target: { value: "October 31, 2020 7:15 PM" },
  });

  fireEvent.change(cityInput, {
    target: { value: "Quito" },
  });

  userEvent.click(submitReminder);

  expect(queryByLabelText("reminder-modal")).toBeNull();
});
