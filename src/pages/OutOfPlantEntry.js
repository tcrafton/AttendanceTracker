import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { isSameDay, format, startOfMonth, endOfMonth } from "date-fns";
import { enGB } from "date-fns/locale";
import { Calendar } from "react-nice-dates";
import Grid from "@material-ui/core/Grid";
import "react-nice-dates/build/style.css";
import axios from "axios";
import { EMPLOYEE_URL } from "../utils/contants";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const OutOfPlantEntry = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const [salaryEmployees, setSalaryEmployees] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const modifiers = {
    selected: (date) =>
      selectedDates.some((selectedDate) => isSameDay(selectedDate, date)),
  };

  const handleDayClick = (date) => {
    if (!selectedEmployee) {
      toast.error("Select Name");
      return;
    }

    let selectedDate = format(date, "MM/dd/yyyy");
    if (
      !selectedDates.some((currDate) => currDate.getTime() === date.getTime())
    ) {
      setSelectedDates([...selectedDates, date]);

      axios.post(
        `${EMPLOYEE_URL}InsertOutOfPlantDate?outOfPlantDate=${selectedDate}&employee=${selectedEmployee.EMPLOYEEID}`
      );
    } else {
      const newList = selectedDates.filter(
        (currDate) => currDate.getTime() !== date.getTime()
      );
      setSelectedDates(newList);
      axios.post(
        `${EMPLOYEE_URL}RemoveOutOfPlantDateForEmployee?employeeID=${selectedEmployee.EMPLOYEEID}&outOfPlantDate=${selectedDate}`
      );
    }
  };

  const handleEmployeeChange = (_, value) => {
    setSelectedEmployee(value ? value : "");
    setSelectedDates([]);
  };

  const handleMonthUpdate = (month) => {
    setSelectedMonth(month);
    setSelectedDates([]);
  };

  const updateData = (month) => {
    let start = format(new Date(startOfMonth(month)), "yyyy-MM-dd");
    let end = format(new Date(endOfMonth(month)), "yyyy-MM-dd");
    let datesOut = [];
    axios
      .get(
        `${EMPLOYEE_URL}GetDatesOutOfPlantForEmployee?employeeId=${selectedEmployee.EMPLOYEEID}&startDate=${start}&endDate=${end}`
      )
      .then((res) => {
        res.data.forEach((d) => {
          datesOut.push(new Date(d.DATE_OUT));
        });
      })
      .then(() => {
        setSelectedDates(datesOut);
      });
  };

  useEffect(() => {
    updateData(selectedMonth);
  }, [selectedEmployee, selectedMonth]);

  useEffect(() => {
    axios
      .get(`${EMPLOYEE_URL}GetSalaryEmployees`)
      .then((res) => {
        setSalaryEmployees(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedEmployee]);

  return (
    <Wrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} id="employee">
          <Autocomplete
            id="employeeName"
            value={
              selectedEmployee ? { NAME: selectedEmployee.NAME } : { NAME: "" }
            }
            options={salaryEmployees}
            getOptionLabel={(option) =>
              option !== undefined ? option.NAME : ""
            }
            style={{ width: 400 }}
            onChange={handleEmployeeChange}
            renderInput={(params) => (
              <TextField {...params} label="Select Name" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <label id="calenderLabel">Select Day(s) Out of Plant</label>
          <Calendar
            onDayClick={handleDayClick}
            modifiers={modifiers}
            format="dd MMM yyyy"
            month={selectedMonth}
            onMonthChange={(m) => handleMonthUpdate(m)}
            locale={enGB}
          />
        </Grid>
      </Grid>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Zoom}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 25%;
  padding-left: 2rem;
  padding-bottom: 2rem;

  #employee {
    padding-top: 2rem;
  }

  #calenderLabel {
    font-size: 18px;
    font-weight: bolder;
    color: black;
  }

  .button {
    background-color: var(--clr-grey-5);
    color: #fff;
    margin-left: 2rem;
    margin-top: 1rem;
  }
`;

export default OutOfPlantEntry;
