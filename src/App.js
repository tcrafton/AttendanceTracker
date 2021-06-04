import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Footer, Navbar } from "./components";
import { CalendarPage, OutOfPlantEntry } from "./pages";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main">
        <Switch>
          <Route exact path="/AttendanceTracker/calendar">
            <CalendarPage />
          </Route>
          <Route exact path="/AttendanceTracker/outOfPlantEntry">
            <OutOfPlantEntry />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
