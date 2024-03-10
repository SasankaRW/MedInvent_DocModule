import Title from "../../../Components/MyComponents/Title";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
//import CalendarCss from '../../../CssModules/calendar.module.css';
import '../../../CssModules/CalendarOverride.css';
import { color } from "@mui/system";

function Calendar() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([
        {
            id: '1',
            hospital: 'Hospital A',
            start: '2024-03-09T09:00:00',
            end: '2024-03-09T09:30:00',
            maxPatients: 10,
            patientsFilled: 5,
            cancellable: false
        },
        {
            id: '2',
            hospital: 'Hospital B',
            start: '2024-03-09T14:00:00',
            end: '2024-03-09T17:00:00',
            maxPatients: 15,
            patientsFilled: 8,
            cancellable: false
        },
        {
            id: '3',
            hospital: 'Hospital C',
            start: '2024-03-08T14:00:00',
            end: '2024-03-08T17:00:00',
            maxPatients: 20,
            patientsFilled: 10,
            cancellable: false
        },
        {
            id: '4',
            hospital: 'Hospital d',
            start: '2024-03-10T08:00:00',
            end: '2024-03-10T10:00:00',
            maxPatients: 20,
            patientsFilled: 10,
            cancellable: true
        },
        {
            id: '5',
            hospital: 'Hospital d',
            start: '2024-03-10T14:00:00',
            end: '2024-03-10T17:00:00',
            maxPatients: 20,
            patientsFilled: 10,
            cancellable: false
        },
        {
            id: '6',
            hospital: 'Hospital d',
            start: '2024-03-11T14:00:00',
            end: '2024-03-11T17:00:00',
            maxPatients: 20,
            patientsFilled: 10,
            cancellable: true
        },
        {
            id: '7',
            hospital: 'Hospital d',
            start: '2024-03-12T14:00:00',
            end: '2024-03-12T17:00:00',
            maxPatients: 20,
            patientsFilled: 10,
            cancellable: false
        },
    ]);

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
                    cancellable: !event.cancellable
                };
            }
            return event;
        });
        setEvents(updatedEvents);
        setSelectedEvent(null);
    };

    const eventContent = (eventInfo) => (
        <div
            className={`event-content ${eventInfo.event.extendedProps.cancellable ? 'cancellable' : ''}`}
            style={{ backgroundColor: eventInfo.event.extendedProps.cancellable ? '#FFBCBC' : '#BDFFDB' }}
        >
            <p>{eventInfo.event.extendedProps.hospital}</p>
            <p>{eventInfo.timeText}</p>
        </div>
    );
    const handleDayCellDidMount = (arg) => {
      const today = new Date();
      if (arg.date.getFullYear() === today.getFullYear() && 
          arg.date.getMonth() === today.getMonth() && 
          arg.date.getDate() === today.getDate()) {

          arg.el.style.backgroundColor = '#ffffff'; 
      }
    };

    return (
       <div>
              <div>
                <Title>Calender</Title>
              </div>
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
                        today: 'Today',
                        month: 'Month',
                        week: 'Week',
                        day: 'Day'
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
                          <p>Hospital: {selectedEvent.extendedProps.hospital}</p>
                          <p>Start Time: {selectedEvent.start.toLocaleTimeString()}</p>
                          <p>End Time: {selectedEvent.end.toLocaleTimeString()}</p>
                          <p>Patients Filled: {selectedEvent.extendedProps.patientsFilled} / {selectedEvent.extendedProps.maxPatients}</p>
                          <button onClick={handleToggleCancellable} className="calendarAcCanPopup">
                              {selectedEvent.extendedProps.cancellable ? "Active Task" : "Cancel Task"}
                          </button>
                          <button onClick={handleCloseDialog} class="calendarClosePopup">Close</button>
                      </div>
                  )}
              </div>
       </div>
    );
}

export default Calendar;
