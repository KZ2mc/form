import React, { useEffect, useState } from "react";
import "./Calendar.css";

const apiURL = "https://api.kz2movingcompany.com:8443/schedule";

interface CalendarProps {
  year: number;
  month: number;
}

//const Calendar: React.FC<CalendarProps> = ({ year, month }) => {
const Calendar: React.FC<CalendarProps> = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const startDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const today = new Date();

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch(apiURL);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSchedule();
  }, []);

  const mapFromJSON = (jsonString: string): Map<number, string> => {
    const obj = JSON.parse(jsonString);
    const map = new Map<number, string>();

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const numericKey = parseInt(key, 10);
        map.set(numericKey, obj[key]);
      }
    }

    return map;
  };

  // Usage
  const scheduleMap = data
    ? mapFromJSON(JSON.stringify(data))
    : new Map<number, string>();

  const getDateAvailability = (
    date: number,
    month: number
  ): { dateStatus: string; style: string } => {
    let style = "calendar-status ";
    let dateStatus = scheduleMap.get((month + 1) * 100 + date);
    dateStatus = dateStatus !== undefined ? dateStatus : "Available";
    switch (dateStatus) {
      case "Available":
        style += "available";
        break;
      case "Booked":
        style += "booked";
        break;
      default:
        style += "partially-available";
        dateStatus = dateStatus.match("Evening") ? "Evening" : "Morning";
        break;
    }
    return { dateStatus, style };
  };

  const renderCalendar = () => {
    const emptyCellClassName =
      "square-cell calendar-day empty col border text-bg-light";

    const totalDays = daysInMonth(year, month);
    const startDay = startDayOfMonth(year, month);

    const calendarDays = [];

    // Render days of the week
    for (let i = 0; i < 7; i++) {
      let dayName: string;

      switch (i) {
        case 0:
          dayName = "Sun";
          break;
        case 1:
          dayName = "Mon";
          break;
        case 2:
          dayName = "Tue";
          break;
        case 3:
          dayName = "Wed";
          break;
        case 4:
          dayName = "Thu";
          break;
        case 5:
          dayName = "Fri";
          break;
        case 6:
          dayName = "Sat";
          break;
        default:
          dayName = "Unknown";
          break;
      }
      calendarDays.push(
        <div key={dayName} className="col">
          {dayName}
        </div>
      );
    }

    // Render empty cells for previous month's days
    for (let i = 0; i < startDay; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className={emptyCellClassName}>
          <br />
          <br />
          <br />
        </div>
      );
    }

    // Render days for the current month
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(year, month, i, 17); // Date becomes blank after the set time (24hr format)
      const isSelected = selectedDate?.toDateString() === date.toDateString();

      let calDay;
      const todayStyle =
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
          ? " current-date "
          : "";

      if (date < today) {
        calDay = (
          <div key={i} className={`${todayStyle}${emptyCellClassName}`}>
            {i}
            <br />
            <br />
            <br />
          </div>
        );
      } else {
        const dateInfo = getDateAvailability(i, month);
        calDay = (
          <div
            key={i}
            className={`${todayStyle} ${emptyCellClassName} ${
              isSelected ? " selected " : ""
            }`}
            data-date={i}
            onClick={() => handleDateClick(date)}
          >
            {i}
            <br />
            <br />
            <div className={`calendar-status ${dateInfo.style}`}>
              {dateInfo.dateStatus}
            </div>
          </div>
        );
      }
      calendarDays.push(calDay);
    }

    const endEmptyCells = 7 - (calendarDays.length % 7);

    // Render empty cells for next month's days
    for (let i = 0; i < endEmptyCells && endEmptyCells !== 7; i++) {
      calendarDays.push(
        <div key={`empty-end-${i}`} className={emptyCellClassName}>
          <br />
          <br />
          <br />
        </div>
      );
    }

    const weeks = [];
    let week = [];

    // Split calendar days into weeks
    for (let i = 0; i < calendarDays.length; i++) {
      week.push(calendarDays[i]);

      if (week.length === 7) {
        weeks.push(
          <div
            key={`week-${i / 7}`}
            className="calendar-week row row-cols-7 no-gutters"
          >
            {week}
          </div>
        );
        week = [];
      }
    }

    return weeks;
  };

  const getArrowButton = (direction: number) => {
    const isPreviousDisabled =
      direction < 0 &&
      year === today.getFullYear() &&
      month === today.getMonth();
    const isNextDisabled =
      direction > 0 &&
      year === today.getFullYear() &&
      month === today.getMonth() + 6;

    const arrowClassDirection = direction < 0 ? "arrow-left" : "arrow-right";

    const onClick = () => {
      if (isPreviousDisabled || isNextDisabled) {
        return; // Do nothing if the button is disabled
      }

      if (direction > 0) {
        // Increase month
        setMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
        setYear((prevYear) => (month === 11 ? prevYear + 1 : prevYear));
      } else {
        // Decrease month
        setMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
        setYear((prevYear) => (month === 0 ? prevYear - 1 : prevYear));
      }
    };

    const arrowClassName =
      isPreviousDisabled || isNextDisabled
        ? "disabled " + arrowClassDirection
        : arrowClassDirection;

    return (
      <button className={`arrow-button ${arrowClassName}`} onClick={onClick}>
        {direction < 0 ? "<" : ">"}
      </button>
    );
  };

  const monthName = new Date(year, month).toLocaleString("en-US", {
    month: "long",
  });

  return (
    <div className="calendar text-center calendar-container">
      <div className="calendar-header ">
        <p>
          {data ? (
            <p>
              {getArrowButton(-1)}
              {monthName} {year}
              {getArrowButton(1)}
            </p>
          ) : (
            <p>Loading...</p>
          )}
        </p>
      </div>
      <div className="calendar-body">{renderCalendar()}</div>
    </div>
  );
};

export default Calendar;
