import Title from "../../../Components/Title";
import { useEffect, useState } from "react";
import MyDatePicker from "../../../Components/MyDatePicker";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
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
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { AppointmentDetailsModal } from "../../../Components/AppointmentDetailsModal";
import { motion } from "framer-motion";
import Button from "../../../Components/Button/Button";
import axios from "axios";
import { useAuth } from "../../../Contexts/AuthContext";
import { useAlert } from "../../../Contexts/AlertContext";
import config from "../../../config";
import Loader from "../../../Components/Loader/Loader";

const columns = [
  { id: "patient", label: "Patient", minWidth: 170 },
  { id: "doctor", label: "Doctor", minWidth: 170 },
  { id: "date", label: "Date", minWidth: 100 },
  {
    id: "time",
    label: "Time",
    minWidth: 170,
  },
  {
    id: "actions",
    label: "",
    minWidth: 100,
  },
];

function AppointmentHistory() {
  const { user } = useAuth();
  const { showAlert } = useAlert();

  const [date, setDate] = useState("");
  const [doctor, setDoctor] = useState("");
  const [time, setTime] = useState("");
  const [patientName, setPatientName] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] =
    useState(appointments);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${config.baseURL}/appointment/get/clinic/past/${user.id}`)
      .then((res) => {
        setAppointments(res.data.data);
      })
      .catch((err) => {
        showAlert("error", "Error loading appointments.");
        console.log("Error getting appointments. Error:" + err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user.id]);

  useEffect(() => {
    const filtered = appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.session.date)
        .toISOString()
        .split("T")[0];
      return (
        (date === "" || appointmentDate === date) &&
        (doctor === "" ||
          appointment.session.doctor.fname +
            " " +
            appointment.session.doctor.lname ===
            doctor) &&
        (time === "" || appointment.session.timeFrom === time) &&
        (patientName === "" ||
          appointment.patientName
            .toLowerCase()
            .includes(patientName.toLowerCase()))
      );
    });
    setFilteredAppointments(filtered);
    setPage(0);
  }, [date, doctor, appointments, time, patientName]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onClearClick = () => {
    setPatientName("");
    setDate("");
    setDoctor("");
    setTime("");
  };

  function convertTimeFormat(time) {
    let [hours, minutes] = time.split(":").map(Number);
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
      <Title>Appointments history</Title>
      <motion.div
        className="shadow bg-white rounded-5 p-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="d-flex align-items-center">
          <OutlinedInput
            value={patientName}
            onChange={(e) => {
              setPatientName(e.target.value);
            }}
            variant="outlined"
            placeholder={"Patient's name"}
            size="small"
            style={{ borderRadius: "20px", marginRight: "10px" }}
          />
          <MyDatePicker
            selectedDate={date}
            handleDateChange={(date) => setDate(date)}
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
                  appointments.map(
                    (x) => x.session.doctor.fname + " " + x.session.doctor.lname
                  )
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
          <FormControl style={{ width: "15%", marginRight: "20px" }}>
            <InputLabel id="doctor" size="small">
              Session time
            </InputLabel>
            <Select
              size="small"
              labelId="doctor"
              id="demo-simple-select"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              label="Session time"
              sx={{
                borderRadius: "20px",
              }}
            >
              {Array.from(new Set(appointments.map((x) => x.session.timeFrom)))
                .sort()
                .map((time) => (
                  <MenuItem key={time} value={time}>
                    {convertTimeFormat(time)}
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
              {filteredAppointments
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      key={row.appointment_id}
                      hover
                      sx={row.isCancelled && { backgroundColor: "#ffe3e3" }}
                    >
                      <TableCell>{row.patientName}</TableCell>
                      <TableCell>
                        {row.session.doctor.fname} {row.session.doctor.lname}
                      </TableCell>
                      <TableCell>{row.session.date}</TableCell>
                      <TableCell>
                        {convertTimeFormat(row.session.timeFrom)}
                      </TableCell>
                      <TableCell align="right">
                        <div className="d-flex justify-content-end">
                          <MyModal
                            icon={<RemoveRedEyeOutlinedIcon fontSize="small" />}
                          >
                            <AppointmentDetailsModal appointment={row} />
                          </MyModal>
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
          count={filteredAppointments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </motion.div>
    </div>
  );
}

export default AppointmentHistory;
