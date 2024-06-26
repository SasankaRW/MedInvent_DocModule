import { useEffect, useState } from "react";
import Title from "../../../Components/Title";
import MyDatePicker from "../../../Components/MyDatePicker";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import MyModal from "../../../Components/MyModal";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { SessionDetailsModal } from "../../../Components/SessionDetailsModal";
import CancelSessionModal from "../../../Components/CancelSessionModal";
import { motion } from "framer-motion";
import Button from "../../../Components/Button/Button";
import Loader from "../../../Components/Loader/Loader";
import axios from "axios";
import config from "../../../config";
import { useAlert } from "../../../Contexts/AlertContext";
import { useAuth } from "../../../Contexts/AuthContext";
import TimePicker from "../../../Components/TimePicker/TimePicker";
import NumberSelect from "../../../Components/NumberSelect/NumberSelect";
import Loader2 from "../../../Components/Loader2/Loader2";

const columns = [
  { id: "doctor", label: "Doctor", minWidth: 170 },
  { id: "date", label: "Date", minWidth: 100 },
  {
    id: "time",
    label: "Time",
    minWidth: 150,
  },
  {
    id: "patients",
    label: "Patients",
    minWidth: 150,
  },
  {
    id: "arrived",
    label: "",
    minWidth: 100,
  },
  {
    id: "actions",
    label: "",
    minWidth: 80,
  },
];

function UpcomingSessions() {
  const [date, setDate] = useState("");
  const [doctor, setDoctor] = useState("");
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState(sessions);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [isLoading, setIsLoading] = useState(false);

  const { showAlert } = useAlert();

  const { user } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${config.baseURL}/session/get/clinic/upcoming/${user.clinic_id}`)
      .then((res) => {
        setSessions(res.data.data);
      })
      .catch((err) => {
        showAlert("error", "Error loading sessions.");
        console.log("Error getting upcoming sessions. Error:" + err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user.clinic_id]);

  useEffect(() => {
    const filtered = sessions.filter((session) => {
      const sessionDate = new Date(session.date).toISOString().split("T")[0];
      return (
        (date === "" || sessionDate === date) &&
        (doctor === "" ||
          session.doctor.fname + " " + session.doctor.lname === doctor)
      );
    });
    setFilteredSessions(filtered);
    setPage(0);
  }, [date, doctor, sessions]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onClearClick = () => {
    setDate("");
    setDoctor("");
  };

  function convertTimeFormat(time) {
    let [hours, minutes] = time.split(":").map(Number);
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    minutes = minutes.toString().padStart(2, "0");
    return `${hours}:${minutes} ${period}`;
  }

  const updateSessionState = (updatedSession) => {
    setSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.session_id === updatedSession.session_id
          ? { ...session, ...updatedSession }
          : session
      )
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Title>Upcoming sessions</Title>
      <motion.div
        className="shadow bg-white rounded-5 p-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="d-flex">
          <MyDatePicker
            selectedDate={date}
            handleDateChange={(e) => setDate(e.target.value)}
            minDate={new Date().toISOString().split("T")[0]}
          />
          <FormControl style={{ width: "20%", marginRight: "20px" }}>
            <InputLabel id="doctor" size="small">
              Select doctor
            </InputLabel>
            <Select
              size="small"
              labelId="doctor"
              id="demo-simple-select"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              label="Select doctor"
              sx={{
                borderRadius: "20px",
              }}
            >
              {Array.from(
                new Set(
                  sessions.map((x) => x.doctor.fname + " " + x.doctor.lname)
                )
              )
                .sort()
                .map((doctor) => (
                  <MenuItem key={doctor} value={doctor}>
                    {doctor}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <Button text="Clear" onClick={onClearClick} />
        </div>
        <hr className="my-4" />

        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    <b>{column.label}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSessions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      key={row.session_id}
                      hover
                      sx={row.isCancelled && { backgroundColor: "#ffe3e3" }}
                    >
                      <TableCell>
                        {row.doctor.fname} {row.doctor.lname}
                      </TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{convertTimeFormat(row.timeFrom)}</TableCell>
                      <TableCell>
                        {row.activePatients}/{row.noOfPatients}
                      </TableCell>
                      <TableCell>
                        {row.isArrived && (
                          <span
                            style={{
                              backgroundColor: "green",
                              color: "white",
                              padding: "4px 8px",
                              borderRadius: "5px",
                            }}
                          >
                            Arrived
                          </span>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <div className="d-flex justify-content-end">
                          <MyModal
                            icon={<RemoveRedEyeOutlinedIcon fontSize="small" />}
                          >
                            <SessionDetailsModal
                              session={row}
                              updateSessionState={updateSessionState}
                              type="clinic"
                            />
                          </MyModal>
                          {!row.isCancelled && (
                            <>
                              <MyModal
                                icon={<CancelOutlinedIcon fontSize="small" />}
                              >
                                <CancelSessionModal
                                  session={row}
                                  updateSessionState={updateSessionState}
                                  type="clinic"
                                />
                              </MyModal>
                              <MyModal
                                icon={
                                  <BorderColorOutlinedIcon fontSize="small" />
                                }
                              >
                                <UpdateSessionModal
                                  session={row}
                                  updateSessionState={updateSessionState}
                                />
                              </MyModal>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={sessions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </motion.div>
    </div>
  );
}

export default UpcomingSessions;

export function UpdateSessionModal({
  session,
  updateSessionState,
  closeModal,
}) {
  const [timeFrom, setTimeFrom] = useState(session.timeFrom);
  const [timeTo, setTimeTo] = useState(session.timeTo);
  const [noOfPatients, setNoOfPatients] = useState(session.noOfPatients);

  const [isLoading, setIsLoading] = useState(false);

  const { showAlert } = useAlert();

  function handleStartTime(time) {
    setTimeFrom(time.target.value);
  }

  function handleEndTime(time) {
    setTimeTo(time.target.value);
  }

  function handleNoOfPatients(number) {
    setNoOfPatients(number.target.value);
  }

  function onUpdate() {
    const newData = {
      timeFrom: timeFrom === session.timeFrom ? timeFrom : timeFrom + ":00",
      timeTo: timeTo === session.timeTo ? timeTo : timeTo + ":00",
      noOfPatients: parseInt(noOfPatients),
    };
    if (
      timeFrom === session.timeFrom &&
      timeTo === session.timeTo &&
      noOfPatients === session.noOfPatients
    ) {
      closeModal();
      return;
    }

    setIsLoading(true);
    axios
      .put(`${config.baseURL}/session/update/${session.session_id}`, newData)
      .then((res) => {
        showAlert("success", "Session updated successfully.");
        updateSessionState({ ...session, ...newData });
        closeModal();
      })
      .catch((err) => {
        showAlert("error", "Error updating the session.");
        console.log("Error updating the session. Error:" + err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleClose = () => {};

  return (
    <div className="p-3">
      <div className="text-secondary mx-2">Time slot</div>
      <div style={{ display: "flex" }} className="mt-2">
        <TimePicker
          label={"from"}
          time={timeFrom}
          handleTime={handleStartTime}
        />
        <TimePicker label={"to"} time={timeTo} handleTime={handleEndTime} />
      </div>

      <div className="text-secondary mx-2 mt-4">Maximum patients</div>
      <div style={{ display: "flex" }} className="mt-2">
        <NumberSelect number={noOfPatients} handleNumber={handleNoOfPatients} />
      </div>
      {isLoading ? (
        <Loader2 />
      ) : (
        <div className="mt-4 d-flex justify-content-end">
          <Button text="Update" onClick={onUpdate} />
        </div>
      )}
    </div>
  );
}
