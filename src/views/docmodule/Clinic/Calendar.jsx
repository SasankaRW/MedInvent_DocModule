import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Title from "../../../Components/MyComponents/Title";
import "../../../CssModules/CalendarOverride.css";
import { color } from "@mui/system";


const sessions = [
  {
    id: "1",
    room_no: "100",
    doc_name: "Dr Albert",
    specialization: "cardiologic",
    start: "2024-03-13T09:00:00",
    end: "2024-03-13T10:30:00",
    maxPatients: 10,
    patientsFilled: 8,
    cancellable: false,
  },
  {
    id: "1",
    room_no: "101",
    doc_name: "Dr Albert",
    specialization: "cardiologic",
    start: "2024-03-13T11:00:00",
    end: "2024-03-13T12:30:00",
    maxPatients: 10,
    patientsFilled: 8,
    cancellable: false,
  },
  {
    id: "1",
    room_no: "101",
    doc_name: "Dr Albert",
    specialization: "cardiologic",
    start: "2024-03-13T07:00:00",
    end: "2024-03-13T08:30:00",
    maxPatients: 10,
    patientsFilled: 8,
    cancellable: false,
  },
  
  // Other session objects...
];

function Calendar() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState(sessions);

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
  };

  const handleCloseDialog = () => {
    setSelectedEvent(null);
  };

  const handleToggleCancellable = () => {
    const updatedEvents = events.map((event) => {
      if (event.id === selectedEvent.id) {
        return {
          ...event,
          cancellable: !event.cancellable,
        };
      }
      return event;
    });
    setEvents(updatedEvents);
    setSelectedEvent(null);
  };

  const eventContent = (eventInfo) => (
    <div
        className={`event-content ${
        eventInfo.event.extendedProps.cancellable ? "cancellable" : ""
      }`}
      style={{
        backgroundColor: eventInfo.event.extendedProps.cancellable
          ? "#FFBCBC"
          : "#BDFFDB",
      }}
    >
      <p>{eventInfo.event.extendedProps.doc_name}</p>
      <p>{eventInfo.event.extendedProps.room_no}</p>
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
      <div>
        <Title>Calendar</Title>
      </div>
      <div className="bg-white shadow p-5 rounded-5" style={{ width: "90%" }}>
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
              <p>Doctor: {selectedEvent.extendedProps.doc_name}</p>
              <p>Start Time: {selectedEvent.start.toLocaleTimeString()}</p>
              <p>End Time: {selectedEvent.end.toLocaleTimeString()}</p>
              <p>
                Patients Filled: { selectedEvent.extendedProps.patientsFilled} / {selectedEvent.extendedProps.maxPatients}
              </p>
              <button
                onClick={handleToggleCancellable}
                className="calendarAcCanPopup"
              >
                {selectedEvent.extendedProps.cancellable
                  ? "Active Task"
                  : "Cancel Task"}
              </button>
              <button onClick={handleCloseDialog} class="calendarClosePopup">
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
