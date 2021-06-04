import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";

const events = [
  { title: "Tommy Crafton", start: "2021-06-01" },
  { title: "John Doe", start: "2021-06-01" },
  { title: "Scott Miller", start: "2021-06-01" },
  { title: "Brian Foster", start: "2021-06-01" },
  { title: "Tim Meadows", start: "2021-06-01" },
  { title: "Steve Glenn", start: "2021-06-01" },
  { title: "Bruce", start: "2021-06-01" },
];

const CalendarPage = () => {
  return (
    <Wrapper>
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        events={events}
        dayMaxEvents={true}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* max-height: 56.5vw !important; */
  max-width: 55%;
  padding-left: 2rem;
  padding-bottom: 2rem;
`;

export default CalendarPage;
