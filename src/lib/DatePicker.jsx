/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */

import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faHouse,
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Calendrier from "./Calendrier";
import "../src/styles/datePicker.css";
import moment from "moment";

const getMonthName = (monthIndex) => {
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  return months[monthIndex];
};

const DatePicker = ({ value, onChange }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value || "");
  const [selectedMonth, setSelectedMonth] = useState(moment().month());
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const currentDay = moment().date();
  const currentMonth = selectedMonth;
  const currentYear = selectedYear;
  const currentDate = moment()
    .year(currentYear)
    .month(currentMonth)
    .date(currentDay);
  const firstDayOfMonth = (currentDate.startOf("month").day() + 6) % 7; // Décaler pour commencer par lundi
  const daysInMonth = currentDate.daysInMonth();

  const monthWeeks = [];
  let week = [];

  // Remplir les premières cases vides
  for (let i = 0; i < firstDayOfMonth; i++) {
    week.push(null);
  }

  // Ajouter les jours du mois
  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      monthWeeks.push(week);
      week = [];
    }
  }

  // Compléter la dernière semaine
  while (week.length < 7) {
    week.push(null);
  }
  monthWeeks.push(week);

  const handleClickOutside = (event) => {
    if (!event.target.closest(".datePicker-container")) {
      setShowCalendar(false);
      setShowMonthDropdown(false);
      setShowYearDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDateSelect = (day) => {
    const dayFormatted = day.toString().padStart(2, "0");
    const monthFormatted = (currentMonth + 1).toString().padStart(2, "0");
    const formattedDate = `${dayFormatted}/${monthFormatted}/${currentYear}`;
    setSelectedDate(formattedDate);
    onChange(formattedDate);
    setShowCalendar(false);
  };

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const handleToday = () => {
    setSelectedMonth(moment().month());
    setSelectedYear(moment().year());
  };

  const handleMonthSelect = (monthIndex) => {
    setSelectedMonth(monthIndex);
    setShowMonthDropdown(false);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setShowYearDropdown(false);
  };

  return (
    <div className="datePicker-container">
      <input
        type="text"
        id="datePicker"
        value={selectedDate}
        onFocus={() => setShowCalendar(true)}
        placeholder="Sélectionnez une date"
        readOnly
      />
      {showCalendar && (
        <div className="datePicker-popup">
          <div className="datePicker-header">
            <button
              className="datePicker-header-arrowLeft"
              onClick={handlePrevMonth}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className="datePicker-header-home" onClick={handleToday}>
              <FontAwesomeIcon icon={faHouse} />
            </button>
            <div className="datePicker-header-chooseMonth-container">
              <button
                className="datePicker-header-chooseMonth"
                onClick={() => setShowMonthDropdown(!showMonthDropdown)}
              >
                {getMonthName(currentMonth)}{" "}
                <FontAwesomeIcon icon={faChevronDown} />
              </button>
              {showMonthDropdown && (
                <div className="month-dropdown">
                  {Array.from({ length: 12 }, (_, index) => (
                    <div
                      key={index}
                      className="dropdown-item"
                      onClick={() => handleMonthSelect(index)}
                    >
                      {getMonthName(index)}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="datePicker-header-chooseYear-container">
              <button
                className="datePicker-header-chooseYear"
                onClick={() => setShowYearDropdown(!showYearDropdown)}
              >
                {currentYear} <FontAwesomeIcon icon={faChevronDown} />
              </button>
              {showYearDropdown && (
                <div className="year-dropdown">
                  {Array.from({ length: 101 }, (_, index) => (
                    <div
                      key={index}
                      className="dropdown-item"
                      onClick={() => handleYearSelect(currentYear - 50 + index)}
                    >
                      {currentYear - 50 + index}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              className="datePicker-header-arrowRight"
              onClick={handleNextMonth}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <div className="datePicker-body">
            <Calendrier
              monthWeeks={monthWeeks}
              currentMonth={currentMonth}
              currentYear={currentYear}
              currentDay={currentDay}
              onDateSelect={handleDateSelect}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
