import React from "react";
import Calendar from "./components/Calendar";
import BookingForm from "./components/BookingForm";

// npm run dev :D
// npm run deploy
const App: React.FC = () => {
  return (
    <>
      <Calendar year={2023} month={4} />
      <BookingForm />
    </>
  );
};

export default App;
