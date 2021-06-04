import React, { useState } from "react";
import styled from "styled-components";
import { isSameDay, format } from "date-fns";
import { enGB } from "date-fns/locale";
import { Calendar } from "react-nice-dates";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import "react-nice-dates/build/style.css";

const OutOfPlantEntry = () => {
  const [selectedDates, setSelectedDates] = useState([]);

  const modifiers = {
    selected: (date) =>
      selectedDates.some((selectedDate) => isSameDay(selectedDate, date)),
  };
  const handleDayClick = (date) => {
    format(date, "dd MMM yyyy", { locale: enGB });
    console.log(date);
    if (!selectedDates.includes(date)) {
      console.log("not added yet");
    } else {
      console.log("that has been added!!!");
    }

    setSelectedDates([
      ...selectedDates,
      format(date, "dd MMM yyyy", { locale: enGB }),
    ]);
  };

  const handleSave = () => {
    console.log(selectedDates);
  };

  return (
    <Wrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Button
            variant="contained"
            className="button"
            onClick={() => handleSave()}
          >
            Save
          </Button>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Calendar
            onDayClick={handleDayClick}
            modifiers={modifiers}
            format="dd MMM yyyy"
            locale={enGB}
          />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 25%;
  padding-left: 2rem;
  padding-bottom: 2rem;

  .button {
    background-color: var(--clr-grey-5);
    color: #fff;
    margin-left: 2rem;
    margin-top: 1rem;
  }
`;

export default OutOfPlantEntry;
