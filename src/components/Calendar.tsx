import React, { useEffect, useState } from "react";
import "./Calendar.css";

const apiURL = "https://api.kz2movingcompany.com:8443/schedule";

interface CalendarProps {
  year: number;
  month: number;
}

const Calendar: React.FC<CalendarProps> = ({ year, month }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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

  const convertToTitleCase = (input: string): string => {
    const words = input.toLowerCase().split(" ");
    const titleCaseWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return titleCaseWords.join(" ");
  };

  const getDateAvailability = (
    date: number,
    month: number
  ): { dateStatus: string; style: string } => {
    let style;
    let dateStatus = scheduleMap.get((month + 1) * 100 + date);
    dateStatus =
      dateStatus !== undefined ? convertToTitleCase(dateStatus) : "Available";
    switch (dateStatus) {
      case "Available":
        style = "text-bg-success p-3";
        break;
      case "Booked":
        style = "text-bg-danger p-3";
        break;
      default:
        style = "text-bg-warning p-3";
        break;
    }
    return { dateStatus, style };
  };

  const renderCalendar = () => {
    const emptyCellClassName =
      "calendar-day empty col border text-bg-light p-3";

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
          <br></br>
          <br></br>
          <br></br>
        </div>
      );
    }

    // Render days for the current month
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(year, month, i);
      const isSelected = selectedDate?.toDateString() === date.toDateString();

      let calDay;

      if (date < today) {
        calDay = (
          <div key={i} className={emptyCellClassName}>
            {i}
            <br></br>
            <br></br>
            <br></br>
          </div>
        );
      } else {
        const dateInfo = getDateAvailability(i, month);
        calDay = (
          <div
            key={i}
            className={`calendar-day col border ${dateInfo.style} ${
              isSelected ? "selected" : ""
            }`}
            onClick={() => handleDateClick(date)}
          >
            {i}
            <br></br>
            {dateInfo.dateStatus}
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
          <br></br>
          <br></br>
          <br></br>
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
          <div key={`week-${i / 7}`} className="calendar-week row no-gutters">
            {week}
          </div>
        );
        week = [];
      }
    }

    return weeks;
  };

  const monthName = new Date(year, month).toLocaleString("en-US", {
    month: "long",
  });

  return (
    <div className="calendar text-center calendar-container">
      <div className="calendar-header ">
        <h4>
          {data ? (
            <p>
              {monthName} {year}
            </p>
          ) : (
            <p>Loading...</p>
          )}
        </h4>
      </div>
      <div className="calendar-body">{renderCalendar()}</div>
    </div>
  );
};

export default Calendar;
