import React from "react";
import Calendar from "./components/Calendar";
import BookingForm from "./components/BookingForm";
import FormWFormik from "./components/FormWFormik";

// npm run dev :D
// npm run deploy
const App: React.FC = () => {
  return (
    <>
      <Calendar year={2023} month={4} />
      <BookingForm />
    </>
  );
  //return <FormWFormik />;
};

export default App;
