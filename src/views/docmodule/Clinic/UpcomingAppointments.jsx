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
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { AppointmentDetailsModal } from "../../../Components/AppointmentDetailsModal";
import { motion } from "framer-motion";
import Button from "../../../Components/Button/Button";

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

function UpcomingAppointments() {
  const [date, setDate] = useState("");
  const [doctor, setDoctor] = useState("");
  const [time, setTime] = useState("");
  const [filteredAppointments, setFilteredAppointments] =
    useState(appointments);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    let filtered = appointments;

    if (date) {
      filtered = filtered.filter((appointment) => appointment.date === date);
    }
    if (doctor) {
      filtered = filtered.filter(
        (appointment) => appointment.doctor === doctor
      );
    }
    if (time) {
      filtered = filtered.filter((appointment) => appointment.time === time);
    }

    setFilteredAppointments(filtered);
  }, [date, doctor, time]);

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
    setTime("");
  };

  return (
    <div>
      <Title>Upcoming appointments</Title>
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
              {Array.from(new Set(appointments.map((x) => x.doctor)))
                .sort()
                .map((doctor) => (
                  <MenuItem key={doctor} value={doctor}>
                    {doctor}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl style={{ width: "20%", marginRight: "20px" }}>
            <InputLabel id="doctor" size="small">
              Select Session time
            </InputLabel>
            <Select
              size="small"
              labelId="doctor"
              id="demo-simple-select"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              label="Select Session time"
              sx={{
                borderRadius: "20px",
              }}
            >
              {Array.from(new Set(appointments.map((x) => x.time)))
                .sort()
                .map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
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
                    //change this to appointment id
                    <TableRow
                      key={`${row.patient}-${row.date}-${row.time}`}
                      hover
                    >
                      <TableCell>{row.patient}</TableCell>
                      <TableCell>{row.doctor}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.time}</TableCell>
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
          count={appointments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </motion.div>
    </div>
  );
}

export default UpcomingAppointments;

const appointments = [
  {
    patient: "John Doe",
    doctor: "Dr Stephen Strange",
    clinic: "Medicare Clinic",
    date: "2024/03/21",
    time: "7.30 PM",
    appointmentNo: 12,
    mobileNo: "0771234567",
    email: "abcd@gmail.com",
    area: "moratuwa",
    nic: "123456779V",
  },
  {
    patient: "Jane Smith",
    doctor: "Dr. Jane Foster",
    clinic: "Healing Hands Clinic",
    date: "2024/03/22",
    time: "9:00 AM",
    appointmentNo: 13,
    mobileNo: "0777654321",
    email: "jane.smith@example.com",
    area: "Colombo",
    nic: "987654321V",
  },
  {
    patient: "David Brown",
    doctor: "Dr. Bruce Banner",
    clinic: "Green Health Center",
    date: "2024/03/23",
    time: "3:00 PM",
    appointmentNo: 14,
    mobileNo: "0712345678",
    email: null,
    area: "Kandy",
    nic: "456789123V",
  },
  {
    patient: "Emily Johnson",
    doctor: "Dr. Tony Stark",
    clinic: "IronCare Clinic",
    date: "2024/03/24",
    time: "10:30 AM",
    appointmentNo: 15,
    mobileNo: "0777777777",
    email: "emilyj@example.com",
    area: "Galle",
    nic: "147258369V",
  },
  {
    patient: "Michael Wilson",
    doctor: "Dr. Peter Parker",
    clinic: "Web Health Center",
    date: "2024/03/25",
    time: "1:00 PM",
    appointmentNo: 16,
    mobileNo: "0765432109",
    email: "michael.wilson@example.com",
    area: "Negombo",
    nic: "369852147V",
  },
  {
    patient: "Sarah Davis",
    doctor: "Dr. Tony Stark",
    clinic: "IronCare Clinic",
    date: "2024-03-24",
    time: "2:45 PM",
    appointmentNo: 17,
    mobileNo: "0701234567",
    email: "sarah.davis@example.com",
    area: "Colombo",
    nic: "258147369V",
  },
  {
    patient: "Mark Thompson",
    doctor: "Dr. Tony Stark",
    clinic: "IronCare Clinic",
    date: "2024-03-26",
    time: "9:15 AM",
    appointmentNo: 18,
    mobileNo: "0719876543",
    email: "mark.thompson@example.com",
    area: "Jaffna",
    nic: "963852741V",
  },
];
