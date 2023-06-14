import React from "react";
import ReactDOM from "react-dom/client";
import Calendar from "./components/Calendar";
import BookingForm from "./components/BookingForm";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Calendar year={2023} month={4} />
    <BookingForm />
  </React.StrictMode>
);
