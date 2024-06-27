import Title from "../../../Components/Title";
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../../../CssModules/CalendarOverride.css";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "../../../Contexts/AuthContext";
import config from "../../../config";

// const sessions = [
//   {
//     id: "1",
//     hospital: "Hospital A",
//     start: "2024-03-09T09:00:00",
//     end: "2024-03-09T09:30:00",
//     maxPatients: 10,
//     patientsFilled: 5,
//     cancellable: false,
//   },
//   {
//     id: "2",
//     hospital: "Hospital B",
//     start: "2024-03-09T14:00:00",
//     end: "2024-03-09T17:00:00",
//     maxPatients: 15,
//     patientsFilled: 8,
//     cancellable: false,
//   },
//   {
//     id: "3",
//     hospital: "Hospital C",
//     start: "2024-03-08T14:00:00",
//     end: "2024-03-08T17:00:00",
//     maxPatients: 20,
//     patientsFilled: 10,
//     cancellable: false,
//   },
//   {
//     id: "4",
//     hospital: "Hospital d",
//     start: "2024-03-10T08:00:00",
//     end: "2024-03-10T10:00:00",
//     maxPatients: 20,
//     patientsFilled: 10,
//     cancellable: true,
//   },
//   {
//     id: "5",
//     hospital: "Hospital d",
//     start: "2024-03-10T14:00:00",
//     end: "2024-03-10T17:00:00",
//     maxPatients: 20,
//     patientsFilled: 10,
//     cancellable: false,
//   },
//   {
//     id: "6",
//     hospital: "Hospital d",
//     start: "2024-03-11T14:00:00",
//     end: "2024-03-11T17:00:00",
//     maxPatients: 20,
//     patientsFilled: 10,
//     cancellable: true,
//   },
//   {
//     id: "7",
//     hospital: "Hospital d",
//     start: "2024-03-12T14:00:00",
//     end: "2024-03-12T17:00:00",
//     maxPatients: 20,
//     patientsFilled: 10,
//     cancellable: false,
//   },
// ];

const generateSessionArray = (res) => {
  const resArrayLength = res.data.data.length;
  if (resArrayLength !== 0) {
    const NumOfSessions = res.data.data[0].sessions.length;
    const SessionAccess = res.data.data[0].sessions;
    let SessionCount,
      z = [];
    for (SessionCount = 0; SessionCount < NumOfSessions; SessionCount++) {
      //date:SessionAccess[SessionCount].SessionDates[t].date,
      //start: SessionAccess[SessionCount].timeFrom,
      //end: SessionAccess[SessionCount].timeTo,

      //const start = SessionAccess[SessionCount].SessionDates[t].date + "T" + SessionAccess[SessionCount].timeFrom.substring(0, 8);
      //const end = SessionAccess[SessionCount].SessionDates[t].date + "T" + SessionAccess[SessionCount].timeTo.substring(0, 8);
      //date:SessionAccess[SessionCount].SessionDates[t].date,

      z.push({
        clinicName: SessionAccess[SessionCount].clinic.name,
        start:
          SessionAccess[SessionCount].date +
          "T" +
          SessionAccess[SessionCount].timeFrom.substring(0, 8),
        end:
          SessionAccess[SessionCount].date +
          "T" +
          SessionAccess[SessionCount].timeTo.substring(0, 8),
        maxPatients: SessionAccess[SessionCount].noOfPatients,
        activePatients: SessionAccess[SessionCount].activePatients,
        isCancelled: SessionAccess[SessionCount].isCancelled,
        session_id: SessionAccess[SessionCount].session_id,
        clinic_id: SessionAccess[SessionCount].clinic_id,
        doctor_id: SessionAccess[SessionCount].doctor_id,
      });
    }
    return z;
  } else {
    return [];
  }
};

function Calendar() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get(
        `${config.baseURL}/Session/get/All/Sessions/details/${user.doctor_id}`
      )
      .then((res) => {
        console.log(res);
        const objectArray = generateSessionArray(res);
        console.log(objectArray);
        setEvents(objectArray);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEventClick = (clickInfo) => {
    console.log(clickInfo.event);
    setSelectedEvent(clickInfo.event);
  };

  const handleCloseDialog = () => {
    setSelectedEvent(null);
  };

  //"isCancelled":!selectedEvent.extendedProps.isCancelled,

  const handleToggleCancellable = () => {
    if (selectedEvent.extendedProps.isCancelled == true) {
      axios
        .put(
          `${config.baseURL}/Session/update/active/${selectedEvent.extendedProps.session_id}`,
          {
            cancelledByType: null,
            isCancelled: false,
            cancelledById: null,
          }
        )
        .then((res) => {
          console.log(res);
          const updatedEvents = events.map((event) => {
            if (event.session_id === selectedEvent.extendedProps.session_id) {
              return {
                ...event,
                isCancelled: false,
              };
            }
            return event;
          });
          console.log(updatedEvents);
          setEvents(updatedEvents);
          setSelectedEvent(null);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .put(
          `${config.baseURL}/Session/update/Cancel/Session/${selectedEvent.extendedProps.session_id}`,
          {
            doctor_id: selectedEvent.extendedProps.doctor_id,
          }
        )
        .then((res) => {
          console.log(res);
          const updatedEvents = events.map((event) => {
            if (event.session_id === selectedEvent.extendedProps.session_id) {
              return {
                ...event,
                isCancelled: true,
              };
            }
            return event;
          });
          console.log(updatedEvents);
          setEvents(updatedEvents);
          setSelectedEvent(null);
        })
        .catch((err) => console.log(err));
    }
  };

  const eventContent = (eventInfo) => (
    <div
      className={`event-content ${
        eventInfo.event.extendedProps.isCancelled ? "cancellable" : ""
      }`}
      style={{
        backgroundColor: eventInfo.event.extendedProps.isCancelled
          ? "#FFBCBC"
          : "#BDFFDB",
      }}
    >
      <p>{eventInfo.event.extendedProps.clinicName}</p>
      <p>{eventInfo.timeText}</p>
    </div>
  );
  const handleDayCellDidMount = (arg) => {
    const today = new Date();
    if (
      arg.date.getFullYear() === today.getFullYear() &&
      arg.date.getMonth() === today.getMonth() &&
      arg.date.getDate() === today.getDate()
    ) {
      arg.el.style.backgroundColor = "#ffffff";
    }
  };

  return (
    <div>
      <Title>Calender</Title>

      <motion.div
        className="bg-white shadow p-5 rounded-5"
        style={{ width: "90%" }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="CalendarDesign">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={"timeGridDay"}
            headerToolbar={{
              start: "today prev,next",
              center: "title",
              end: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            buttonText={{
              today: "Today",
              month: "Month",
              week: "Week",
              day: "Day",
            }}
            height={"90vh"}
            events={events}
            eventContent={eventContent}
            eventClick={handleEventClick}
            dayCellDidMount={handleDayCellDidMount}
          />
          {selectedEvent && (
            <div className="dialog">
              <p>Date: {selectedEvent.start.toLocaleDateString()}</p>
              <p>Hospital: {selectedEvent.extendedProps.clinicName}</p>
              <p>Start Time: {selectedEvent.start.toLocaleTimeString()}</p>
              {/* <p>End Time: {selectedEvent.end.toLocaleTimeString()}</p> */}
              <p>
                Patients Filled: {selectedEvent.extendedProps.activePatients} /{" "}
                {selectedEvent.extendedProps.maxPatients}
              </p>
              <button
                onClick={handleToggleCancellable}
                className="calendarAcCanPopup"
              >
                {selectedEvent.extendedProps.isCancelled
                  ? "Active Session"
                  : "Cancel Session"}
              </button>
              <button onClick={handleCloseDialog} class="calendarClosePopup">
                Close
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Calendar;
