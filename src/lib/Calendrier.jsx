/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from "react";
import moment from "moment";

const Calendrier = ({
  monthWeeks,
  currentMonth,
  currentYear,
  currentDay,
  onDateSelect,
}) => {
  const handleClick = (e) => {
    const dayClicked = parseInt(e.target.textContent, 10);
    if (dayClicked) {
      onDateSelect(dayClicked);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Lun</th>
          <th>Mar</th>
          <th>Mer</th>
          <th>Jeu</th>
          <th>Ven</th>
          <th>Sam</th>
          <th>Dim</th>
        </tr>
      </thead>
      <tbody>
        {monthWeeks.map((week, weekIndex) => (
          <tr key={weekIndex}>
            {week.map((dayObj, dayIndex) => {
              const { day, isCurrentMonth } = dayObj;
              const isActive =
                day === currentDay &&
                moment().month() === currentMonth &&
                moment().year() === currentYear;
              return (
                <td
                  key={dayIndex}
                  onClick={handleClick}
                  className={`${isActive ? "active" : ""} ${
                    !isCurrentMonth ? "not-current-month" : ""
                  }`}
                >
                  {day ? day.toString().padStart(2, "0") : ""}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Calendrier;
