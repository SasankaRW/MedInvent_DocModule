import React from "react";
import "./DoctorList.css";
import Container from "../../../../Components/MyComponents/Container";
import Paper from "@mui/material/Paper";
import DoctorsTable from "./DoctorsTable";

export default function AllDoctors() {
  return (
    <Paper elevation={5} sx={{ borderRadius: "10px" }}>
      <Container title="All Doctors">
        <DoctorsTable />
      </Container>
    </Paper>
  );
}
