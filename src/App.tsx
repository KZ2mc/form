import React from "react";
import Calendar from "./components/Calendar";
import Form from "./components/Form";

// npm run dev :D
// npm run deploy
const App: React.FC = () => {
  return (
    <>
      <Calendar year={2023} month={4} />
      <Form />
    </>
  );
};

export default App;
