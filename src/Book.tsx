import Base from "./Base";
import BookingForm from "./components/BookingForm";
import Calendar from "./components/Calendar";

import "bootstrap/dist/css/bootstrap.css";
import React from "react";

const Book: React.FC = () => {
  return (
    //style={{ color: "black" }}
    <Base>
      <div className="stripe-blue">
        <div className="content-div px-5 ">
          <div className="pt-1 pb-5">
            <div className="card-container">
              <Calendar year={2023} month={4} />
              <BookingForm />
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Book;
