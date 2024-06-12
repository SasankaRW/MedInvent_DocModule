import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Title from "../../../Components/Title";
import styles from "./NewAppointment.module.css";
import { useEffect, useState } from "react";
import Button from "../../../Components/Button/Button";
import axios from "axios";
import Loader from "../../.././Components/Loader/Loader";
import Loader2 from "../../.././Components/Loader2/Loader2";
import { useAlert } from "../../../Contexts/AlertContext";
import { motion } from "framer-motion";
import { useAuth } from "../../../Contexts/AuthContext";
import config from "../../../config";

function NewAppointment() {
  const { showAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(false);
  const [isSessionsLoading, setIsSessionsLoading] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);

  const [title, setTitle] = useState("Mr");
  const [patientName, setPatientName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [nic, setNic] = useState("");

  const [patients, setPatients] = useState(0);

  const { user } = useAuth();

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(String(email).toLowerCase());
  }

  function validateMobileNumber(number) {
    const pattern = /^07\d{8}$/;
    return pattern.test(number);
  }

  function onFindClick() {
    if (selectedDoctor === null) {
      showAlert("error", "Please select a doctor");
      return;
    }

    setIsSessionsLoading(true);
    setSelectedSession(null);

    axios
      .get(
        `${config.baseURL}/session/get/upcoming?clinic_id=${user.id}&doctor_id=${selectedDoctor}`
      )
      .then((response) => {
        setSessions(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
        showAlert("error", "Error getting sessions");
      })
      .finally(() => {
        setIsSessionsLoading(false);
      });
  }

  function onSubmit() {
    if (selectedSession === null) {
      showAlert("error", "Please select a session");
      return;
    }

    if (!patientName || !mobileNumber || !area || !nic) {
      showAlert("error", "Please fill all fields");
      return;
    }

    if (!validateMobileNumber(mobileNumber)) {
      showAlert("error", "Please enter a valid mobile number");
      return;
    }

    if (email && !validateEmail(email)) {
      showAlert("error", "Please enter a valid email");
      return;
    }

    setIsLoading(true);
    const appointmentDetails = {
      patientTitle: title,
      patientName,
      contactNo: mobileNumber,
      email: email || null,
      area,
      nic,
      session_id: selectedSession.session_id,
    };
    axios
      .post(`${config.baseURL}/appointment/newappointment`, appointmentDetails)
      .then((response) => {
        showAlert("success", "Appointment booked successfully.");
        setTitle("Mr");
        setPatientName("");
        setMobileNumber("");
        setEmail("");
        setNic("");
        setArea("");
        setPatients((prev) => prev + 1);
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "Error booking the appointment.";
        console.error(errorMessage);
        showAlert("Error booking the appointment");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className={styles.main}>
      <Title>New Appointment</Title>
      <motion.div
        className="d-lg-flex"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="shadow bg-white rounded-5 p-5 col-lg-6 col-12">
          <div className="d-flex justify-content-between mb-4">
            <SearchComponent setSelectedDoctor={setSelectedDoctor} />
            <Button text="Find sessions" onClick={onFindClick} />
          </div>

          <div className="mt-2">
            {isSessionsLoading ? (
              <div className="mt-5">
                <Loader2 />
              </div>
            ) : selectedSession == null ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {sessions.map((session) => (
                  <SessionTemplate
                    key={session.session_id}
                    session={session}
                    setSelectedSession={setSelectedSession}
                    setActivePatients={setPatients}
                  />
                ))}
              </div>
            ) : (
              <SessionDetails
                session={selectedSession}
                activePatients={patients}
              />
            )}
          </div>
        </div>

        <div className="shadow bg-white rounded-5 p-5 col-lg-6 col-12 mx-lg-4 mt-lg-0 mt-4">
          <div>
            <InputLabel className="mb-2">Patient's Name</InputLabel>

            <div className="d-flex">
              <Select
                className="p-0 rounded-5"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                displayEmpty
                sx={{
                  borderRadius: "20px",
                  height: "40px",
                  padding: "0 10px",
                  width: "80px",
                  marginRight: "10px",
                }}
              >
                {["Mr", "Mrs", "Ms"].map((x) => (
                  <MenuItem key={x} value={x}>
                    {x}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                InputProps={{
                  style: {
                    borderRadius: "50px",
                    padding: "0 10px",
                    height: "40px",
                  },
                }}
                sx={{ flexGrow: 1 }}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6 mt-4 ">
              <InputLabel className="mb-2" value={"aefaef"}>
                Mobile Number
              </InputLabel>
              <TextField
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                InputProps={{
                  style: {
                    borderRadius: "50px",
                    padding: 0,
                    height: "40px",
                  },
                }}
              />
            </div>
            <div className="col-sm-6 mt-4 ">
              <InputLabel className="mb-2" value={"aefaef"}>
                NIC Number
              </InputLabel>
              <TextField
                value={nic}
                onChange={(e) => setNic(e.target.value)}
                InputProps={{
                  style: {
                    borderRadius: "50px",
                    padding: 0,
                    height: "40px",
                  },
                }}
              />
            </div>
          </div>

          <div className="mt-4">
            <InputLabel className="mb-2">Area</InputLabel>
            <TextField
              value={area}
              onChange={(e) => setArea(e.target.value)}
              InputProps={{
                style: {
                  borderRadius: "50px",
                  padding: "0 10px",
                  height: "40px",
                },
              }}
              sx={{ flexGrow: 1, display: "flex" }}
            />
          </div>

          <div className="mt-4">
            <InputLabel className="mb-2">Email (Optional)</InputLabel>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                style: {
                  borderRadius: "50px",
                  padding: "0 10px",
                  height: "40px",
                },
              }}
              sx={{ flexGrow: 1, display: "flex" }}
            />
          </div>

          <div className="mt-5 d-flex justify-content-end">
            {isLoading ? (
              <Loader2 />
            ) : (
              <Button text="Book aappointment" onClick={onSubmit} />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default NewAppointment;

const SearchComponent = ({ setSelectedDoctor }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [visitingDoctors, setVisitingDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const { showAlert } = useAlert();

  const handleSelectItem = (item) => {
    setSelectedDoctor(item.doctor.doctor_id);
    setSearchTerm(item.doctor.fname + " " + item.doctor.lname);
    setShowResults(false);
  };

  useEffect(() => {
    if (searchTerm.length >= 3) {
      setIsLoading(true);
      axios
        .get(
          `${config.baseURL}/visiting/get/allVisitings/byDocName?doc_name=${searchTerm}&clinic_id=${user.id}`
        )
        .then((response) => {
          setVisitingDoctors(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching doctors:", error);
          showAlert("error", "Error getting doctors");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setVisitingDoctors([]);
    }
  }, [searchTerm, user.id]);

  function onSearchTermChange(e) {
    setSearchTerm(e.target.value);
    setSelectedDoctor(null);
    searchTerm.length >= 2 ? setShowResults(true) : setShowResults(false);
  }

  return (
    <div>
      <TextField
        placeholder="Enter doctor's name"
        value={searchTerm}
        onChange={onSearchTermChange}
        InputProps={{
          style: {
            borderRadius: "50px",
            padding: 0,
            height: "40px",
            width: "100%",
          },
        }}
      />
      {searchTerm && showResults && (
        <div className={styles.results}>
          {isLoading ? (
            <div className="my-4">
              <Loader2 />
            </div>
          ) : visitingDoctors.length !== 0 ? (
            visitingDoctors.map((item, index) => (
              <>
                <div
                  key={index}
                  onClick={() => handleSelectItem(item)}
                  style={{ cursor: "pointer", padding: "0 10px" }}
                >
                  {item.doctor.fname} {item.doctor.lname}
                </div>
                <hr style={{ margin: 0, padding: 0 }} />
              </>
            ))
          ) : (
            <div>No result found</div>
          )}
        </div>
      )}
    </div>
  );
};

const SessionTemplate = ({
  session,
  setSelectedSession,
  setActivePatients,
}) => {
  function handleSelectSession(session) {
    setSelectedSession(session);
    setActivePatients(session.activePatients);
  }
  return (
    <div
      className={`${styles.session}`}
      onClick={() => handleSelectSession(session)}
    >
      <div>{formatDate(session.date)}</div>
      <div>{formatTime(session.timeFrom)}</div>
      <div>
        {session.activePatients === session.noOfPatients ? (
          <span style={{ color: "red" }}>Session Full</span>
        ) : (
          `${session.activePatients}/${session.noOfPatients}`
        )}
      </div>
      <div>
        Rs.
        {(parseFloat(session.docFee) + parseFloat(session.clinicFee)).toFixed(
          2
        )}
      </div>
    </div>
  );
};

const SessionDetails = ({ session, activePatients }) => {
  return (
    <div className={styles.sessionDetails}>
      <h5>Session Details</h5>
      <hr />
      <div className="row">
        <div className="col-3">Doctor</div>
        <div className="col-1">:</div>
        <div className="col-8">
          Dr {session.doctor.fname} {session.doctor.mname}{" "}
          {session.doctor.lname}
        </div>
      </div>

      <div className="row">
        <div className="col-3">Date</div>
        <div className="col-1">:</div>
        <div className="col-8">{formatDate(session.date)}</div>
      </div>

      <div className="row">
        <div className="col-3">Time</div>
        <div className="col-1">:</div>
        <div className="col-8">{formatTime(session.timeFrom)}</div>
      </div>

      <div className="row">
        <div className="col-3">Patients</div>
        <div className="col-1">:</div>
        <div className="col-8">{activePatients}</div>
      </div>

      <div className="row">
        <div className="col-3">Fees</div>
        <div className="col-1">:</div>
        <div className="col-8">
          Rs.
          {(parseFloat(session.docFee) + parseFloat(session.clinicFee)).toFixed(
            2
          )}
        </div>
      </div>
    </div>
  );
};

function formatDate(inputDate) {
  const date = new Date(inputDate);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const month = monthsOfYear[date.getMonth()];

  const dayWithSuffix = (day) => {
    if (day > 3 && day < 21) return day + "th";
    switch (day % 10) {
      case 1:
        return day + "st";
      case 2:
        return day + "nd";
      case 3:
        return day + "rd";
      default:
        return day + "th";
    }
  };

  return `${dayOfWeek}, ${dayWithSuffix(day)} ${month}`;
}

function formatTime(inputTime) {
  const [hours, minutes, seconds] = inputTime.split(":").map(Number);

  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${period}`;
}
