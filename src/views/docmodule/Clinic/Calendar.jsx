import Title from "../../../Components/Title";
import React, { useState , useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
//import CalendarCss from '../../../CssModules/calendar.module.css';
import "../../../CssModules/CalendarOverride.css";
import { color } from "@mui/system";
import axios from "axios";
import { motion } from "framer-motion";

const generateSessionArray = (res)=>{
    const resArrayLength = res.data.data.length;
    if(resArrayLength!=0)
    {
      const NumOfSessions = res.data.data[0].sessions.length;
      const SessionAccess = res.data.data[0].sessions;
      let SessionCount,z=[];
      for(SessionCount=0;SessionCount<NumOfSessions;SessionCount++)
      {
          z.push({
            doctorName: `${SessionAccess[SessionCount].doctor.fname} ${SessionAccess[SessionCount].doctor.mname} ${SessionAccess[SessionCount].doctor.lname}`,
            start: SessionAccess[SessionCount].date + "T" + SessionAccess[SessionCount].timeFrom.substring(0, 8),
            end: SessionAccess[SessionCount].date + "T" + SessionAccess[SessionCount].timeTo.substring(0, 8),
            maxPatients: SessionAccess[SessionCount].noOfPatients,
            activePatients: SessionAccess[SessionCount].activePatients,
            isCancelled: SessionAccess[SessionCount].isCancelled,
            session_id: SessionAccess[SessionCount].session_id,
            clinic_id: SessionAccess[SessionCount].clinic_id,
            doctor_id: SessionAccess[SessionCount].doctor_id,
            specialization:SessionAccess[SessionCount].doctor.specialization,
            isArrived:SessionAccess[SessionCount].isArrived
          });
      }
      return z;
    }
    else{
      return [];
    }
}



function Calendar() {

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [OpenBox, setOpenBox] = useState(false);


  useEffect(()=>{
      console.log("hello");
      axios.get('http://localhost:8080/api/Session/get/All/Sessions/details/by/49f89e71-67a4-46ed-b621-b45d914e861a')
      .then(res=>{
        console.log(res);
        const objectArray = generateSessionArray(res);
        console.log(objectArray);
        setEvents(objectArray);
      } )
      .catch(err=>console.log(err));
  },[])


  const handleEventClick = (clickInfo) => {
    console.log(clickInfo.event);
    setSelectedEvent(clickInfo.event);
  };

  const handleCloseDialog = () => {
    setSelectedEvent(null);
  };

  const confirmationPopUp=()=>{
    setOpenBox(true);
  }

  const handleMistakeDialog=()=>{
    setOpenBox(false);
  }

  const handleArriveDialog=()=>{

        axios.put(`http://localhost:8080/api/Session/update/isArrive/${selectedEvent.extendedProps.session_id}`,
        {
          "isArrived":!selectedEvent.extendedProps.isArrived
        })
        .then(res=>{
          console.log(res);
          const updatedEvents = events.map((event) => {
            if (event.session_id === selectedEvent.extendedProps.session_id) {
      
              return {
                ...event,
                isArrived:true,
              };
            }
            return event;
          });
          console.log(updatedEvents);
          setEvents(updatedEvents);
          setOpenBox(false);
          setSelectedEvent(null);
        })
        .catch(err=>console.log(err)); 
  };

  const handleToggleCancellable = () => {

    if(selectedEvent.extendedProps.isCancelled==true){

      axios.put(`http://localhost:8080/api/Session/update/active/${selectedEvent.extendedProps.session_id}`,
      {
        "cancelledByType":null,
        "isCancelled":false,
        "cancelledById":null
      })
      .then(res=>{
        console.log(res);
        const updatedEvents = events.map((event) => {
          if (event.session_id === selectedEvent.extendedProps.session_id) {
    
            return {
              ...event,
              isCancelled:false,
            };
          }
          return event;
        });
        console.log(updatedEvents);
        setEvents(updatedEvents);
        setSelectedEvent(null);
      })
      .catch(err=>console.log(err)); 

    }
    else{

      axios.put(`http://localhost:8080/api/Session/update/Cancel/Session/${selectedEvent.extendedProps.session_id}`,
      {
        "clinic_id": selectedEvent.extendedProps.clinic_id
      })
      .then(res=>{
        console.log(res);
        const updatedEvents = events.map((event) => {
          if (event.session_id === selectedEvent.extendedProps.session_id) {
    
            return {
              ...event,
              isCancelled:true,
            };
          }
          return event;
        });
        console.log(updatedEvents);
        setEvents(updatedEvents);
        setSelectedEvent(null);
      })
      .catch(err=>console.log(err));

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
      <p>{eventInfo.event.extendedProps.doctorName}</p>
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
        <Title>Calender</Title>
      </div>
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
              <p>Doctor: {selectedEvent.extendedProps.doctorName}</p>
              <p>Start Time: {selectedEvent.start.toLocaleTimeString()}</p>
              {/* <p>End Time: {selectedEvent.end.toLocaleTimeString()}</p> */}
              <p>
                Patients Filled: {selectedEvent.extendedProps.activePatients} /{" "}
                {selectedEvent.extendedProps.maxPatients}
              </p> 
              <p>
                specialization: {selectedEvent.extendedProps.specialization}
              </p> 
              <button
                onClick={handleToggleCancellable}
                className="calendarAcCanPopup"
              >
                {selectedEvent.extendedProps.isCancelled
                  ? "Active Task"
                  : "Cancel Task"}
              </button>
              <button onClick={handleCloseDialog} class="calendarClosePopup">
                Close
              </button>
              {!selectedEvent.extendedProps.isArrived && (
                <button onClick={confirmationPopUp} class="calendarClosePopup">
                   Update as doctor Arrived
                </button>
              )}
              {selectedEvent.extendedProps.isArrived &&(
                <button class="calendarClosePopup">
                  Arrived
                </button>
              )}
            </div>
          )}
          {OpenBox && (
            <div className="dialog">
              <p>
                Are you sure doctor Arrived to hospital now?
              </p> 
              <p>
                May I send messages to Patients?
              </p> 
              <button
                onClick={handleArriveDialog}
                className="calendarAcCanPopup"
              >
                  Yes send!
              </button>
              <button onClick={handleMistakeDialog} class="calendarClosePopup">
                No mistake!
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Calendar;
