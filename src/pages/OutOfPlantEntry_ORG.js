import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { isSameDay, format } from "date-fns";
import { enGB } from "date-fns/locale";
import { Calendar } from "react-nice-dates";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import "react-nice-dates/build/style.css";
import axios from "axios";
import { EMPLOYEE_URL } from "../utils/contants";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OutOfPlantEntry = () => {
  const [salaryEmployees, setSalaryEmployees] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const modifiers = {
    selected: (date) =>
      selectedDates.some((selectedDate) => isSameDay(selectedDate, date)),
  };

  const handleDayClick = (date) => {
    if (
      !selectedDates.some((currDate) => currDate.getTime() === date.getTime())
    ) {
      setSelectedDates([...selectedDates, date]);
    } else {
      const newList = selectedDates.filter(
        (currDate) => currDate.getTime() !== date.getTime()
      );
      setSelectedDates(newList);
    }
  };

  const handleSave = () => {
    if (selectedEmployee.length < 1) {
      toast.error("Select Name", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (selectedDates.length < 1) {
      toast.error("Select 1 or more dates", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    axios
      .post(
        `${EMPLOYEE_URL}SaveOutOfPlantDates?employee=${selectedEmployee.EMPLOYEEID}`,
        selectedDates
      )
      .then(function () {
        toast.success("Saved", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setSelectedEmployee("");
        setSelectedDates([]);
      })
      .catch((error) => {
        toast.error(`Error saving data: ${error}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(error);
      });
  };

  const handleEmployeeChange = (_, value) => {
    setSelectedEmployee(value ? value : "");
  };

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
            locale={enGB}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button
            variant="contained"
            className="button"
            onClick={() => handleSave()}
          >
            Save
          </Button>
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
