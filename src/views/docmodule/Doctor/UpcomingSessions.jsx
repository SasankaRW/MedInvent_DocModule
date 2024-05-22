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
import { motion } from "framer-motion";
import MyModal from "../../../Components/MyModal";

import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { SessionDetailsModal } from "../../../Components/SessionDetailsModal";
import CancelSessionModal from "../../../Components/CancelSessionModal";
import Button from "../../../Components/Button/Button";

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
    date: "2024-06-21",
    time: "7.30 PM",
    isRefundableAppointments: true,
    docFee: 2000,
  },
  {
    doctor: "Dr Stephen Strange",
    clinic: "Medicare Clinic",
    activePatients: 12,
    maxPatients: 20,
    date: "2024-06-22",
    time: "7.30 PM",
    isRefundableAppointments: true,
    docFee: 2000,
  },
  {
    doctor: "Dr Stephen Strange",
    clinic: "Healthy Life Clinic",
    activePatients: 15,
    maxPatients: 25,
    date: "2024-06-21",
    time: "10.00 AM",
    isRefundableAppointments: false,
    docFee: 1800,
  },
  {
    doctor: "Dr Stephen Strange",
    clinic: "Family Wellness Center",
    activePatients: 18,
    maxPatients: 30,
    date: "2024-06-21",
    time: "2.00 PM",
    isRefundableAppointments: true,
    docFee: 2200,
  },
  {
    doctor: "Dr Stephen Strange",
    clinic: "Sunset Healthcare",
    activePatients: 10,
    maxPatients: 20,
    date: "2024-06-21",
    time: "11.30 AM",
    isRefundableAppointments: false,
    docFee: 1900,
  },
  {
    doctor: "Dr Stephen Strange",
    clinic: "Elder Care Clinic",
    activePatients: 22,
    maxPatients: 25,
    date: "2024-03-26",
    time: "3.30 PM",
    isRefundableAppointments: true,
    docFee: 2100,
  },
  {
    doctor: "Dr Stephen Strange",
    clinic: "Hope Hospital",
    activePatients: 17,
    maxPatients: 20,
    date: "2024-03-27",
    time: "9.00 AM",
    isRefundableAppointments: true,
    docFee: 2300,
  },
  {
    doctor: "Dr Stephen Strange",
    clinic: "Green Meadows Clinic",
    activePatients: 20,
    maxPatients: 30,
    date: "2024-03-28",
    time: "4.00 PM",
    isRefundableAppointments: false,
    docFee: 2000,
  },
  {
    doctor: "Dr Stephen Strange",
    clinic: "First Aid Clinic",
    activePatients: 13,
    maxPatients: 15,
    date: "2024-03-29",
    time: "1.30 PM",
    isRefundableAppointments: true,
    docFee: 2400,
  },
  {
    doctor: "Dr Stephen Strange",
    clinic: "Bright Health Clinic",
    activePatients: 19,
    maxPatients: 25,
    date: "2024-03-30",
    time: "10.30 AM",
    isRefundableAppointments: false,
    docFee: 1950,
  },
  {
    doctor: "Dr Stephen Strange",
    clinic: "Sunrise Wellness Center",
    activePatients: 16,
    maxPatients: 20,
    date: "2024-03-31",
    time: "3.00 PM",
    isRefundableAppointments: true,
    docFee: 2250,
  },
  {
    doctor: "Dr Stephen Strange",
    clinic: "Silver Health Clinic",
    activePatients: 14,
    maxPatients: 18,
    date: "2024-04-01",
    time: "11.00 AM",
    isRefundableAppointments: true,
    docFee: 2150,
  },
];
