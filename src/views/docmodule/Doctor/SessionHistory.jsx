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
import { motion } from "framer-motion";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { SessionDetailsModal } from "../../../Components/SessionDetailsModal";

import { useEffect, useState } from "react";
import Button from "../../../Components/Button/Button";

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
  const [filteredSessions, setFilteredSessions] = useState(sessions);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const filtered = sessions.filter((session) => {
      const sessionDate = new Date(session.date).toISOString().split("T")[0];
      return (
        (date === "" || sessionDate === date) &&
        (clinic === "" || session.clinic === clinic)
      );
    });
    setFilteredSessions(filtered);
    setPage(0);
  }, [date, clinic]);

  //function to handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //function to handle how many rows should be displayed per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onClearClick = () => {
    setDate("");
    setClinic("");
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
        <div className="d-flex align-items-center">
          <MyDatePicker
            selectedDate={date}
            handleDateChange={(e) => setDate(e.target.value)}
            maxDate={new Date().toISOString().split("T")[0]}
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
              {Array.from(new Set(sessions.map((x) => x.clinic)))
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
      </motion.div>
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
    doctor: "Dr Stephen Strange",
    clinic: "Medicare Clinic",
    activePatients: 12,
    maxPatients: 20,
    date: "2024/03/22",
    time: "8.00 PM",
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
    clinic: "Central Family Practice",
    activePatients: 10,
    maxPatients: 20,
    date: "2024/03/25",
    time: "11.30 AM",
    isRefundableAppointments: false,
    docFee: 1900,
  },
];
