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
import { SessionDetailsModal } from "../../../Components/SessionDetailsModal";
import { motion } from "framer-motion";

import { useState } from "react";

const doctors = [
  "Dr. Emily Watson",
  "Dr. Michael Brown",
  "Dr. Sophia Johnson",
  "Dr. Ethan Smith",
];

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

function SessionHistory() {
  const [date, setDate] = useState("");
  const [doctor, setDoctor] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div>
      <Title>Session history</Title>
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
            maxDate={new Date().toISOString().split("T")[0]}
          />
          <FormControl fullWidth>
            <InputLabel id="doctor" size="small">
              Select doctor
            </InputLabel>
            <Select
              fullWidth
              size="small"
              labelId="doctor"
              id="demo-simple-select"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              label="Select doctor"
              className="w-25"
              sx={{
                borderRadius: "20px",
              }}
            >
              {doctors.map((x) => (
                <MenuItem key={x} value={x}>
                  {x}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
              {sessions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow key={row.doctor} hover>
                      <TableCell>{row.doctor}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.time}</TableCell>
                      <TableCell>
                        {row.activePatients}/{row.maxPatients}
                      </TableCell>
                      <TableCell align="right">
                        <MyModal
                          icon={<RemoveRedEyeOutlinedIcon fontSize="small" />}
                        >
                          <SessionDetailsModal session={row} />
                        </MyModal>
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

export default SessionHistory;

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
];
