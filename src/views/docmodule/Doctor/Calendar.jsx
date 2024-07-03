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
import { useAlert } from "../../../Contexts/AlertContext";

const generateSessionArray = (res) => {
  const resArrayLength = res.data.data.length;
  if (resArrayLength !== 0) {
    const NumOfSessions = res.data.data[0].sessions.length;
    const SessionAccess = res.data.data[0].sessions;
    let SessionCount,
      z = [];
    for (SessionCount = 0; SessionCount < NumOfSessions; SessionCount++) {
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
  const[confirm,setConfirm]=useState(false);
  const { user } = useAuth();
  const { showAlert } = useAlert();

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
      .catch((err) =>{
        showAlert("error", "fetching sessions not successed");
      });
  }, []);

  const handleEventClick = (clickInfo) => {
    console.log(clickInfo.event);
    setSelectedEvent(clickInfo.event);
  };

  const handleCloseDialog = () => {
    setSelectedEvent(null);
  };

  const handleConfirmCancel=()=>{
    setConfirm(!confirm);
  };

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
          setConfirm(!confirm);
          showAlert("success", "Session Actived again successfully");
        })
        .catch((err) =>{
          showAlert("error", "failed to active the session again");
        });
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
          setConfirm(!confirm);
          showAlert("success", "cancel session messages sent successfully to patients");
        })
        .catch((err) =>{
          showAlert("error", "failed to send cancel session messages to patients");
        });
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
            <>
                <div className="overlay" onClick={handleCloseDialog}></div>
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
                    onClick={handleConfirmCancel}
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
            </>
          )}
          {confirm && (
             <>
              <div className="overlay_two" onClick={handleConfirmCancel}></div>
              <div className="dialog_two">
                <p>Are you sure you want to proceed with your decision?</p>
                {!selectedEvent.extendedProps.isCancelled &&(
                  <p>May I send Session cancel messages to Patients?</p>
                )}
                {selectedEvent.extendedProps.isCancelled &&(
                  <p>May I Active the session again?</p>
                )}
                <button
                  onClick={handleToggleCancellable}
                  className="calendarAcCanPopup"
                >
                {!selectedEvent.extendedProps.isCancelled
                      ? "Yes Send"
                      : "Yes Active"}
                </button>
                <button onClick={handleConfirmCancel} class="calendarClosePopup">
                  No mistake!
                </button>
              </div>
           </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Calendar;
