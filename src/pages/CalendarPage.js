import styled from "styled-components";
import { format } from "date-fns";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import { EMPLOYEE_URL } from "../utils/contants";

const CalendarPage = () => {
  return (
    <Wrapper>
      <FullCalendar
        defaultView="dayGridMonth"
        height={800}
        plugins={[dayGridPlugin]}
        events={(info, success, failure) => {
          axios
            .get(
              `${EMPLOYEE_URL}GetSalaryEmpOutOfPlantForDateRange?startDate=${info.startStr}&endDate=${info.endStr}`
            )
            .then((res) => {
              success(
                res.data.map((e) => {
                  let dateOut = format(new Date(e.DATE_OUT), "yyyy-MM-dd");
                  return {
                    title: e.NAME,
                    start: dateOut,
                  };
                })
              );
            });
        }}
        dayMaxEvents={true}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* max-height: 56.5vw !important; */
  max-width: 90%;
  max-height: 25%;
  padding-left: 2rem;
  padding-bottom: 2rem;
`;

export default CalendarPage;
