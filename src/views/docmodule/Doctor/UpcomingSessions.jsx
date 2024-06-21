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
import { motion } from "framer-motion";
import MyModal from "../../../Components/MyModal";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { SessionDetailsModal } from "../../../Components/SessionDetailsModal";
import CancelSessionModal from "../../../Components/CancelSessionModal";
import Button from "../../../Components/Button/Button";
import Loader from "../../../Components/Loader/Loader";
import axios from "axios";
import config from "../../../config";
import { useAlert } from "../../../Contexts/AlertContext";
import { useAuth } from "../../../Contexts/AuthContext";
import { UpdateSessionModal } from "../Clinic/UpcomingSessions";

const columns = [
  { id: "clinic", label: "Clinic", minWidth: 170 },
  { id: "date", label: "Date", minWidth: 100 },
  {
    id: "time",
    label: "Time",
    minWidth: 170,
  },
  {
    id: "patients",
    label: "Patients",
    minWidth: 170,
  },
  {
    id: "actions",
    label: "",
    minWidth: 100,
  },
];

function UpcomingSessions() {
  const [date, setDate] = useState("");
  const [clinic, setClinic] = useState("");
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
      .get(`${config.baseURL}/session/get/doctor/upcoming/${user.id}`)
      .then((res) => {
        setSessions(res.data.data);
      })
      .catch((err) => {
        showAlert("error", "Error upcoming sessions.");
        console.log("Error getting upcoming sessions. Error:" + err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user.id]);

  useEffect(() => {
    const filtered = sessions.filter((session) => {
      const sessionDate = new Date(session.date).toISOString().split("T")[0];
      return (
        (date === "" || sessionDate === date) &&
        (clinic === "" || session.clinic.name === clinic)
      );
    });
    setFilteredSessions(filtered);
    setPage(0);
  }, [date, clinic, sessions]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onClearClick = () => {
    setDate("");
    setClinic("");
  };

  function convertTimeFormat(time) {
    let [hours, minutes, seconds] = time.split(":").map(Number);
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
        <div className="d-flex align-items-center">
          <MyDatePicker
            selectedDate={date}
            handleDateChange={(e) => setDate(e.target.value)}
            minDate={new Date().toISOString().split("T")[0]}
          />
          <FormControl style={{ width: "20%", marginRight: "20px" }}>
            <InputLabel id="clinic" size="small">
              Select Clinic
            </InputLabel>
            <Select
              size="small"
              labelId="clinic"
              id="demo-simple-select"
              value={clinic}
              onChange={(e) => setClinic(e.target.value)}
              label="Select clinic"
              sx={{
                borderRadius: "20px",
              }}
            >
              {Array.from(new Set(sessions.map((x) => x.clinic.name)))
                .sort()
                .map((clinic) => (
                  <MenuItem key={clinic} value={clinic}>
                    {clinic}
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
                      <TableCell>{row.clinic.name}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{convertTimeFormat(row.timeFrom)}</TableCell>
                      <TableCell>
                        {row.activePatients}/{row.noOfPatients}
                      </TableCell>
                      <TableCell align="right">
                        <div className="d-flex justify-content-end">
                          <MyModal
                            icon={<RemoveRedEyeOutlinedIcon fontSize="small" />}
                          >
                            <SessionDetailsModal
                              session={row}
                              type="upcoming"
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
                                  type="doctor"
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
          count={filteredSessions.length}
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
