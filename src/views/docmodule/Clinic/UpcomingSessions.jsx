import { useEffect, useState } from "react";
import Title from "../../../Components/Title";
import MyDatePicker from "../../../Components/MyDatePicker";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

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

const columns = [
  { id: "doctor", label: "Doctor", minWidth: 170 },
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
      .get(`${config.baseURL}/session/get/clinic/upcoming/${user.id}`)
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
    let [hours, minutes, seconds] = time.split(":").map(Number);
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    minutes = minutes.toString().padStart(2, "0");
    return `${hours}:${minutes} ${period}`;
  }

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
                    <TableRow key={row.session_id} hover>
                      <TableCell>
                        {row.doctor.fname} {row.doctor.lname}
                      </TableCell>
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
                          <MyModal
                            icon={<CancelOutlinedIcon fontSize="small" />}
                          >
                            <CancelSessionModal session={row} />
                          </MyModal>
                          <IconButton style={{ padding: "0px 5px" }}>
                            <BorderColorOutlinedIcon fontSize="small" />
                          </IconButton>
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

const sessions = [
  {
    doctor: "Dr Stephen Strange",
    clinic: "Medicare Clinic",
    activePatients: 12,
    maxPatients: 20,
    date: "2024/03/21",
    time: "7.30 PM",
    isRefundableAppointments: true,
    docFee: 2000,
  },
  {
    doctor: "Dr John Doe",
    clinic: "Healthy Life Clinic",
    activePatients: 15,
    maxPatients: 25,
    date: "2024/03/22",
    time: "10.00 AM",
    isRefundableAppointments: false,
    docFee: 1800,
  },
  {
    doctor: "Dr Jane Smith",
    clinic: "Family Wellness Center",
    activePatients: 18,
    maxPatients: 30,
    date: "2024/03/23",
    time: "2.00 PM",
    isRefundableAppointments: true,
    docFee: 2200,
  },
  {
    doctor: "Dr Michael Johnson",
    clinic: "Sunset Healthcare",
    activePatients: 10,
    maxPatients: 20,
    date: "2024/03/25",
    time: "11.30 AM",
    isRefundableAppointments: false,
    docFee: 1900,
  },
  {
    doctor: "Dr Sarah Williams",
    clinic: "Elder Care Clinic",
    activePatients: 22,
    maxPatients: 25,
    date: "2024/03/26",
    time: "3.30 PM",
    isRefundableAppointments: true,
    docFee: 2100,
  },
  {
    doctor: "Dr David Lee",
    clinic: "Hope Hospital",
    activePatients: 17,
    maxPatients: 20,
    date: "2024/03/27",
    time: "9.00 AM",
    isRefundableAppointments: true,
    docFee: 2300,
  },
  {
    doctor: "Dr Emily Anderson",
    clinic: "Green Meadows Clinic",
    activePatients: 20,
    maxPatients: 30,
    date: "2024/03/28",
    time: "4.00 PM",
    isRefundableAppointments: false,
    docFee: 2000,
  },
  {
    doctor: "Dr James Brown",
    clinic: "First Aid Clinic",
    activePatients: 13,
    maxPatients: 15,
    date: "2024/03/29",
    time: "1.30 PM",
    isRefundableAppointments: true,
    docFee: 2400,
  },
  {
    doctor: "Dr Samantha Taylor",
    clinic: "Bright Health Clinic",
    activePatients: 19,
    maxPatients: 25,
    date: "2024/03/30",
    time: "10.30 AM",
    isRefundableAppointments: false,
    docFee: 1950,
  },
  {
    doctor: "Dr Benjamin Martinez",
    clinic: "Sunrise Wellness Center",
    activePatients: 16,
    maxPatients: 20,
    date: "2024/03/31",
    time: "3.00 PM",
    isRefundableAppointments: true,
    docFee: 2250,
  },
  {
    doctor: "Dr Olivia Clark",
    clinic: "Silver Health Clinic",
    activePatients: 14,
    maxPatients: 18,
    date: "2024/04/01",
    time: "11.00 AM",
    isRefundableAppointments: true,
    docFee: 2150,
  },
];
