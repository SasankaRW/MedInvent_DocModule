import Title from "../../../Components/MyComponents/Title";
import MyDatePicker from "../../../Components/MyComponents/MyDatePicker";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import MyModal from "../../../Components/MyComponents/MyModal";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { SessionDetailsModal } from "../../../Components/SessionDetailsModal";

import { useState } from "react";

//colums of the table
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

function SessionHistory() {

  //state management using useState hook
  const [date, setDate] = useState("");
  const [clinic, setClinic] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //function to handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //function to handle how many rows should be displayed per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div>
      <Title>Session history</Title>
      <div className="shadow bg-white rounded-5 p-4">
        <div className="d-flex align-items-center">
          <MyDatePicker
            selectedDate={date}
            handleDateChange={(e) => setDate(e.target.value)}
            maxDate={new Date().toISOString().split("T")[0]}
          />
          <FormControl fullWidth>
            <InputLabel id="clinic" size="small">
              Select Clinic
            </InputLabel>
            <Select
              fullWidth
              size="small"
              labelId="clinic"
              id="demo-simple-select"
              value={clinic}
              onChange={(e) => setClinic(e.target.value)}
              label="Select clinic"
              className="w-25"
              sx={{
                borderRadius: "20px",
              }}
            >
              {clinics.map((x) => (
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
                      <TableCell>{row.clinic}</TableCell>
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
      </div>
    </div>
  );
}

export default SessionHistory;


//dummy data for sessions
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

//dummy data for clinics
const clinics = [
  "HealthyCare Clinic",
  "City General Hospital",
  "Sunrise Medical Center",
  "Metro Health Clinic",
  "Central Family Practice",
];
